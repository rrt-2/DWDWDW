// 화면 흐름, 읽어주기, 저장
const $ = (id) => document.getElementById(id);
const KEY = 'study-tamagotchi';
const STAGE_NAME = { egg: '알', baby: '아기', child: '어린이', adult: '어른' };
const TOTAL_UNITS = CONTENT.subjects.reduce((n, s) => n + s.units.length, 0);

// 이름 뒤 조사: 받침 있으면 a, 없으면 b (한글 아니면 'a(b)')
function josa(name, a, b) {
  const c = name.charCodeAt(name.length - 1) - 0xac00;
  if (c < 0 || c > 11171) return `${name}${a}(${b})`;
  return name + (c % 28 ? a : b);
}
const iga = (name) => josa(name, '이', '가');

let state = null; // { name, records }
let quiz = null; // { subject, unit, qs, i, tries, firstTry }

function show(id) {
  for (const s of ['egg', 'home', 'units', 'quiz', 'result', 'records', 'book']) $(s).hidden = s !== id;
  if (window.speechSynthesis) speechSynthesis.cancel();
}

// ---- 읽어주기 ----
const canSpeak = 'speechSynthesis' in window;
function speak(text, lang) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'en' ? 'en-US' : 'ko-KR';
  u.rate = 0.85;
  speechSynthesis.speak(u);
}
$('replay').hidden = !canSpeak;

// ---- 저장 ----
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* 저장소 막힌 환경: 저장 없이 진행 */ }
}
function loadSaved() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}

// ---- 캐릭터 ----
function stage() {
  return stageOf(starCount(state.records), TOTAL_UNITS);
}

// 그림 파일이 없으면 이모지로 대체
function setPet(st, mood) {
  const img = $('pet-img');
  const emoji = $('pet-emoji');
  emoji.textContent = CONTENT.petEmoji[st];
  img.onload = () => { img.hidden = false; emoji.hidden = true; };
  img.onerror = () => { img.hidden = true; emoji.hidden = false; };
  img.src = `assets/pet/${st}_${mood}.png`;
}

// 이 단원의 도감 친구를 모았나 (= 단원 마스터)
function has(unit) {
  const r = state.records[unit.id];
  return !!(r && r.star);
}

// ---- 홈 ----
function renderHome() {
  const stars = starCount(state.records);
  const st = stage();
  $('home-title').textContent = `${state.name} (${STAGE_NAME[st]})`;
  $('home-stars').textContent = `📖 ${stars} / ${TOTAL_UNITS}`;
  setPet(st, 'idle');
  $('pet-talk').textContent = st === 'egg' ? '알 속에서 꿈틀꿈틀… 공부해서 도감 친구를 모아 줘!'
    : st === 'adult' ? '덕분에 다 자랐어! 고마워!'
    : '오늘은 뭐 배울까?';
  const box = $('subjects');
  box.innerHTML = '';
  for (const s of CONTENT.subjects) {
    const pics = s.units.map((u) => (has(u) ? u.friend.pic : '❔')).join('');
    const b = document.createElement('button');
    b.innerHTML = `<span class="icon">${s.icon}</span><span>${s.name}</span><span>${pics}</span>`;
    b.onclick = () => openSubject(s);
    box.appendChild(b);
  }
  show('home');
}

// ---- 단원 목록 ----
function openSubject(s) {
  $('units-title').textContent = `${s.icon} ${s.name}`;
  const list = $('unit-list');
  list.innerHTML = '';
  s.units.forEach((u, i) => {
    const open = isUnlocked(s, i, state.records);
    const b = document.createElement('button');
    b.textContent = `${open ? '' : '🔒 '}${i + 1}단원 · ${u.title} ${has(u) ? u.friend.pic : ''}`;
    b.disabled = !open;
    b.onclick = () => startQuiz(s, u);
    list.appendChild(b);
  });
  show('units');
}

// ---- 문제 풀기 ----
function startQuiz(subject, unit) {
  quiz = { subject, unit, qs: prepareQuiz(unit), i: 0, tries: 0, firstTry: 0 };
  show('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.qs[quiz.i];
  quiz.tries = 0;
  $('quiz-progress').textContent = `${quiz.unit.title} ${quiz.i + 1} / ${quiz.qs.length}`;
  $('question').textContent = q.say;
  $('feedback').textContent = '';
  const box = $('choices');
  box.innerHTML = '';
  box.className = 'choices';
  speak(q.say, q.lang);
  if (q.type === 'puzzle') return renderPuzzle(q);
  q.choices.forEach((c, i) => {
    const b = document.createElement('button');
    b.innerHTML = `<span class="pic">${c.pic}</span><span>${c.label}</span>`;
    b.onclick = () => choose(i, b);
    box.appendChild(b);
  });
}

// ---- 도형 퍼즐: 회색 그림자에 맞게 직접 돌리고 뒤집기 ----
function renderPuzzle(q) {
  quiz.orient = { ...q.start };
  quiz.spin = q.start.rot; // 애니메이션용 누적 각도 (270→360으로 자연스럽게 돌게)
  quiz.moves = 0;
  const box = $('choices');
  box.className = 'puzzle';
  // 그림자(아래) → 조각 → 그림자 점선 테두리(위, 조각에 가려지지 않게)
  const pts = SHAPES[q.shape];
  box.innerHTML = `<svg viewBox="-10 -10 120 120"><polygon class="shadow" points="${pts}"/><polygon class="piece" points="${pts}"/><polygon class="outline" points="${pts}"/></svg>
    <div class="row"><button id="pz-turn">🔄 돌리기</button><button id="pz-flip">↔️ 뒤집기</button></div>`;
  box.querySelectorAll('.shadow, .outline').forEach((el) => setOrient(el, q.goal.rot, q.goal.flip));
  setOrient(box.querySelector('.piece'), quiz.spin, quiz.orient.flip);
  $('pz-turn').onclick = () => movePiece(turn(quiz.orient), quiz.spin + 90);
  $('pz-flip').onclick = () => movePiece(mirror(quiz.orient), -quiz.spin);
}

// 그릴 때는 뒤집기 먼저, 그다음 회전 (logic.js의 방향 규칙과 같음)
function setOrient(el, deg, flip) {
  el.style.transform = `rotate(${deg}deg) scaleX(${flip ? -1 : 1})`;
}

function movePiece(o, spin) {
  quiz.orient = o;
  quiz.spin = spin;
  quiz.moves++;
  setOrient(document.querySelector('#choices .piece'), spin, o.flip);
  if (!sameOrient(o, quiz.qs[quiz.i].goal)) return;
  if (puzzleFirstTry(quiz.moves)) quiz.firstTry++;
  document.querySelectorAll('#choices button').forEach((b) => { b.disabled = true; });
  $('feedback').textContent = '딩동댕! 딱 맞았어요! 🎉';
  speak('딩동댕!', 'ko');
  setTimeout(nextQuestion, 1500);
}

function choose(i, btn) {
  const q = quiz.qs[quiz.i];
  const buttons = [...$('choices').children];
  if (i === q.answer) {
    if (quiz.tries === 0) quiz.firstTry++;
    btn.classList.add('right');
    buttons.forEach((b) => { b.disabled = true; });
    $('feedback').textContent = '딩동댕! 🎉';
    speak('딩동댕!', 'ko');
    setTimeout(nextQuestion, 1200);
    return;
  }
  quiz.tries++;
  btn.classList.add('wrong');
  btn.disabled = true;
  if (quiz.tries < 2) {
    $('feedback').textContent = '다시 해볼까? 🤔';
    speak('다시 해볼까?', 'ko');
  } else {
    // 두 번 틀리면 정답 보여주고 넘어감
    buttons.forEach((b) => { b.disabled = true; });
    buttons[q.answer].classList.add('right');
    $('feedback').textContent = `정답은 "${q.choices[q.answer].label}"이에요!`;
    speak(`정답은 ${q.choices[q.answer].label}`, q.lang);
    setTimeout(nextQuestion, 2200);
  }
}

function nextQuestion() {
  quiz.i++;
  if (quiz.i < quiz.qs.length) renderQuestion();
  else finishQuiz();
}

function finishQuiz() {
  const before = stage();
  const hadStar = !!(state.records[quiz.unit.id] && state.records[quiz.unit.id].star);
  state.records = recordResult(state.records, quiz.unit.id, quiz.firstTry);
  save();
  const after = stage();
  const won = mastered(quiz.firstTry);
  const lines = [`${quiz.qs.length}문제 중 ${quiz.firstTry}개를 한 번에 맞혔어요!`];
  const f = quiz.unit.friend;
  const newFriend = won && !hadStar;
  if (newFriend) lines.push(`새 친구 ${josa(f.name, '을', '를')} 만났어요! 도감에 등록했어요.`);
  else if (!won) lines.push(`${MASTER_NEED}개 이상 맞히면 새 친구를 만날 수 있어요. 거의 다 왔어! 다시 도전!`);
  $('result-friend').hidden = !newFriend;
  if (newFriend) $('result-friend').replaceChildren(...friendCard(quiz.subject, quiz.unit, true).childNodes);
  if (after !== before) lines.push(after === 'adult' ? `🎉 ${iga(state.name)} 어른이 되었어요! 모든 단원 마스터!` : `${iga(state.name)} ${STAGE_NAME[after]}로 자랐어요!`);
  $('result-pet').textContent = CONTENT.petEmoji[after];
  $('result-title').textContent = won ? '참 잘했어요!' : '잘했어요!';
  $('result-text').textContent = lines.join(' ');
  show('result');
  speak(lines.join(' '), 'ko');
}

// ---- 도감 ----
function friendCard(subject, unit, got) {
  const d = document.createElement('div');
  d.className = got ? 'card' : 'card locked';
  const f = unit.friend;
  d.innerHTML = got
    ? `<span class="pic">${f.pic}</span><b></b><span></span><small></small>`
    : '<span class="pic">❓</span><b>???</b><small></small>';
  // 팀원이 쓴 글자는 textContent로 넣음
  if (got) {
    d.querySelector('b').textContent = f.name;
    d.querySelector('span:not(.pic)').textContent = f.desc;
  }
  d.querySelector('small').textContent = got ? `${subject.name} · ${unit.title}` : `${subject.name} · ${unit.title} 마스터하면 만나요`;
  return d;
}

function renderBook() {
  const grid = $('book-grid');
  grid.innerHTML = '';
  for (const s of CONTENT.subjects) for (const u of s.units) grid.appendChild(friendCard(s, u, has(u)));
  $('book-title').textContent = `📖 도감 ${starCount(state.records)} / ${TOTAL_UNITS}`;
  show('book');
}

// ---- 기록 보기 ----
function renderRecords() {
  const rows = $('record-rows');
  rows.innerHTML = '';
  for (const s of CONTENT.subjects) {
    for (const u of s.units) {
      const r = state.records[u.id];
      const tr = document.createElement('tr');
      for (const v of [s.name, u.title, has(u) ? u.friend.pic : '-', r ? `${r.best} / ${QUIZ_SIZE}` : '-', r ? `${r.attempts}번` : '-']) {
        const td = document.createElement('td');
        td.textContent = v;
        tr.appendChild(td);
      }
      rows.appendChild(tr);
    }
  }
  show('records');
}

// ---- 버튼 연결 ----
$('hatch').onclick = () => {
  state = { name: $('pet-name').value.trim() || '뭉치', records: {} };
  save();
  renderHome();
};
document.querySelectorAll('.back').forEach((b) => { b.onclick = renderHome; });
$('result-home').onclick = renderHome;
$('replay').onclick = () => { const q = quiz.qs[quiz.i]; speak(q.say, q.lang); };
$('open-records').onclick = renderRecords;
$('open-book').onclick = renderBook;
$('reset').onclick = () => {
  if (!confirm('기록을 모두 지우고 처음부터 할까요?')) return;
  try { localStorage.removeItem(KEY); } catch { /* 무시 */ }
  state = null;
  $('pet-name').value = '';
  show('egg');
};

state = loadSaved();
if (state && state.records) renderHome();
else show('egg');
