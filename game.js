// 화면 흐름, 읽어주기, 저장
const $ = (id) => document.getElementById(id);
const KEY = 'brain-tamagotchi';
const STAGE_NAME = { egg: '알', baby: '아기', child: '어린이', adult: '어른' };
const TOTAL_UNITS = CONTENT.subjects.reduce((n, s) => n + s.units.length, 0);
const GROWTH_GOAL = 30; // 체크한 날 + 도감 친구가 이만큼 모이면 어른
const MOOD_MARK = { idle: '', happy: '✨', tired: '💤' };
const DEMO = location.search.includes('demo'); // 발표 시연용 '하루 넘기기' 버튼

// 이름 뒤 조사: 받침 있으면 a, 없으면 b (한글 아니면 'a(b)')
function josa(name, a, b) {
  const c = name.charCodeAt(name.length - 1) - 0xac00;
  if (c < 0 || c > 11171) return `${name}${a}(${b})`;
  return name + (c % 28 ? a : b);
}
const iga = (name) => josa(name, '이', '가');

let state = null; // { name(캐릭터), who(어르신 호칭), records, days, dayOffset }
let quiz = null; // { subject, unit, qs, i, tries, firstTry }
let check = null; // 건강 체크 진행: { i, answers }

function show(id) {
  for (const s of ['egg', 'home', 'units', 'quiz', 'result', 'records', 'book', 'check']) $(s).hidden = s !== id;
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
  return stageOf(growthPoints(state.days, state.records), GROWTH_GOAL);
}

// 오늘 날짜 (시연용 하루 넘기기만큼 앞당김)
function today() {
  return dateKey(new Date(Date.now() + (state.dayOffset || 0) * 86400000));
}

// 그림 파일이 없으면 이모지로 대체
function setPet(st, mood, img = $('pet-img'), emoji = $('pet-emoji')) {
  emoji.textContent = CONTENT.petEmoji[st] + (MOOD_MARK[mood] || '');
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
  const st = stage();
  const t = today();
  const mood = petMood(state.days, t);
  const done = !!state.days[t];
  $('home-title').textContent = `${state.name} (${STAGE_NAME[st]})`;
  $('home-stars').textContent = `🌱 ${growthPoints(state.days, state.records)} / ${GROWTH_GOAL}`;
  setPet(st, mood);
  const risk = riskLevel(state.days, t);
  $('pet-talk').textContent = st === 'egg' ? `${state.who}, 오늘 건강 체크를 해 주시면 제가 알에서 나올게요!`
    : risk === 'contact' ? `${state.who}, 오랜만이에요! 보고 싶었어요. 오늘 건강 체크 같이 해요!`
    : !done ? `${state.who}, 오늘 건강 체크 같이 해요!`
    : risk === 'caution' ? `${state.who}, 요즘 걱정돼요. 약 꼭 챙겨 드시고, 힘드시면 꼭 이야기해 주세요.`
    : mood === 'happy' ? `${state.who} 덕분에 저도 기운이 넘쳐요! 두뇌 운동도 해 볼까요?`
    : mood === 'tired' ? '조금 기운이 없어요… 내일은 같이 산책해요!'
    : '오늘도 고마워요! 두뇌 운동 한 판 어떠세요?';
  $('check-start').textContent = done ? '✅ 오늘 건강 체크 완료 (다시 하기)' : '🩺 오늘 건강 체크';
  // 3일 미접속(contact)은 보호자·대시보드용 신호라 본인 화면엔 '주의'만 표시
  $('risk').hidden = risk !== 'caution';
  $('risk').textContent = `${RISK_TEXT.caution} 보호자나 복지관에 연락해 보세요.`;
  $('demo-next').hidden = !DEMO;
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
    b.textContent = `${open ? '' : '🔒 '}${u.title} ${has(u) ? u.friend.pic : ''}`;
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
    // 영어 문제는 단어가 정답 힌트가 되니까 그림만 보여 줌 (정답 알려 줄 때만 단어 사용)
    b.innerHTML = q.lang === 'en' ? `<span class="pic">${c.pic}</span>` : `<span class="pic">${c.pic}</span><span>${c.label}</span>`;
    b.setAttribute('aria-label', c.label);
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
  $('feedback').textContent = '딱 맞았어요! 잘하셨어요! 🎉';
  speak('딱 맞았어요!', 'ko');
  setTimeout(nextQuestion, 1500);
}

function choose(i, btn) {
  const q = quiz.qs[quiz.i];
  const buttons = [...$('choices').children];
  if (i === q.answer) {
    if (quiz.tries === 0) quiz.firstTry++;
    btn.classList.add('right');
    buttons.forEach((b) => { b.disabled = true; });
    $('feedback').textContent = '정답이에요! 🎉';
    speak('정답이에요!', 'ko');
    setTimeout(nextQuestion, 1200);
    return;
  }
  quiz.tries++;
  btn.classList.add('wrong');
  btn.disabled = true;
  if (quiz.tries < 2) {
    $('feedback').textContent = '다시 한번 해 보세요 🤔';
    speak('다시 한번 해 보세요', 'ko');
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
  else if (!won) lines.push(`${MASTER_NEED}개 이상 맞히면 새 친구를 만날 수 있어요. 거의 다 오셨어요! 다시 해 보세요.`);
  $('result-friend').hidden = !newFriend;
  if (newFriend) $('result-friend').replaceChildren(...friendCard(quiz.subject, quiz.unit, true).childNodes);
  if (after !== before) lines.push(after === 'adult' ? `🎉 ${iga(state.name)} 어른이 되었어요! 고마워요!` : `${iga(state.name)} ${STAGE_NAME[after]}로 자랐어요!`);
  $('result-pet').textContent = CONTENT.petEmoji[after];
  $('result-title').textContent = won ? '정말 잘하셨어요!' : '잘하셨어요!';
  $('result-text').textContent = lines.join(' ');
  show('result');
  speak(lines.join(' '), 'ko');
}

// ---- 건강 체크: 질문 5개(네/아니요) + 기분 ----
function startCheck() {
  check = { i: 0, answers: {} };
  show('check');
  renderCheck();
}

function renderCheck() {
  if ($('check').hidden) return; // 중간에 홈으로 나갔으면 멈춤
  const h = CONTENT.health[check.i];
  setPet(stage(), 'idle', $('check-img'), $('check-emoji'));
  $('check-progress').textContent = `${check.i + 1} / ${CONTENT.health.length + 1}`;
  $('check-q').textContent = h ? `${h.pic} ${h.ask}` : CONTENT.moodAsk;
  $('check-reply').textContent = '';
  $('yesno').hidden = !h;
  $('moods').hidden = !!h;
  document.querySelectorAll('#check .answer').forEach((b) => { b.disabled = false; });
  speak(h ? h.ask : CONTENT.moodAsk, 'ko');
}

// 대답에 따라 캐릭터가 같이 밥 먹고, 걷고… 하는 반응
function reply(text, mood) {
  setPet(stage(), mood, $('check-img'), $('check-emoji'));
  $('check-reply').textContent = text;
  speak(text, 'ko');
  document.querySelectorAll('#check .answer').forEach((b) => { b.disabled = true; });
}

function answerHealth(yes) {
  const h = CONTENT.health[check.i];
  check.answers[h.id] = yes;
  reply(yes ? h.yes : h.no, yes ? 'happy' : 'idle');
  check.i++;
  setTimeout(renderCheck, 2400);
}

function answerMood(mood) {
  state.days[today()] = { answers: check.answers, mood };
  save();
  reply(mood === 'bad' ? '마음이 좀 힘드시군요. 제가 옆에 있을게요.' : '오늘도 체크해 주셔서 고마워요!', mood === 'bad' ? 'idle' : 'happy');
  setTimeout(() => { if (!$('check').hidden) renderHome(); }, 2600);
}

// 말로 대답하기 (크롬·엣지에서만 지원. 음성이 브라우저 회사 서버로 전송될 수 있음)
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
$('listen').hidden = !Rec;
$('listen').onclick = () => {
  const r = new Rec();
  r.lang = 'ko-KR';
  $('listen').textContent = '🎤 듣고 있어요…';
  r.onresult = (e) => {
    const said = e.results[0][0].transcript;
    if (!CONTENT.health[check.i]) {
      const m = /나쁘|나빠|별로|안 좋|힘들/.test(said) ? 'bad' : /좋/.test(said) ? 'good' : /보통|그냥|그럭/.test(said) ? 'ok' : null;
      if (m) answerMood(m);
    } else if (/아니|안 |못|않/.test(said)) answerHealth(false);
    else if (/네|응|예|먹었|했|잤|마셨|걸었/.test(said)) answerHealth(true);
  };
  r.onend = () => { $('listen').textContent = '🎤 말로 대답하기'; };
  r.start();
};

// ---- 보호자에게 보내기: 최근 7일 요약 ----
async function shareWeek() {
  const text = weekSummary(state.days, state.who, today());
  if (navigator.share) {
    try { await navigator.share({ text }); } catch { /* 공유 창 닫음 */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    alert('요약을 복사했어요. 카카오톡이나 문자에 붙여 넣어 보내 주세요.');
  } catch {
    prompt('아래 글을 복사해서 보내 주세요.', text);
  }
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
  $('week').textContent = weekSummary(state.days, state.who, today());
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
  state = { name: $('pet-name').value.trim() || '뭉치', who: $('who-name').value.trim() || '어르신', records: {}, days: {}, dayOffset: 0 };
  save();
  renderHome();
};
$('check-start').onclick = startCheck;
$('yes').onclick = () => answerHealth(true);
$('no').onclick = () => answerHealth(false);
document.querySelectorAll('#moods button').forEach((b) => { b.onclick = () => answerMood(b.dataset.mood); });
$('share').onclick = shareWeek;
$('demo-next').onclick = () => {
  state.dayOffset = (state.dayOffset || 0) + 1;
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
  $('who-name').value = '';
  show('egg');
};

state = loadSaved();
if (state && state.days) renderHome();
else show('egg');
