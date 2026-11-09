// 화면 흐름, 읽어주기, 저장
const $ = (id) => document.getElementById(id);
const KEY = 'study-tamagotchi';
const STAGE_NAME = { egg: '알', baby: '아기', child: '어린이', adult: '어른' };
const TOTAL_UNITS = CONTENT.subjects.reduce((n, s) => n + s.units.length, 0);

// 이름 뒤 조사: 받침 있으면 '이', 없으면 '가' (한글 아니면 '이(가)')
function iga(name) {
  const c = name.charCodeAt(name.length - 1) - 0xac00;
  if (c < 0 || c > 11171) return `${name}이(가)`;
  return name + (c % 28 ? '이' : '가');
}

let state = null; // { name, records }
let quiz = null; // { subject, unit, qs, i, tries, firstTry }

function show(id) {
  for (const s of ['egg', 'home', 'units', 'quiz', 'result', 'records']) $(s).hidden = s !== id;
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

// ---- 홈 ----
function renderHome() {
  const stars = starCount(state.records);
  const st = stage();
  $('home-title').textContent = `${state.name} (${STAGE_NAME[st]})`;
  $('home-stars').textContent = `⭐ ${stars} / ${TOTAL_UNITS}`;
  setPet(st, 'idle');
  $('pet-talk').textContent = st === 'egg' ? '알 속에서 꿈틀꿈틀… 공부해서 별을 모아 줘!'
    : st === 'adult' ? '덕분에 다 자랐어! 고마워!'
    : '오늘은 뭐 배울까?';
  const box = $('subjects');
  box.innerHTML = '';
  for (const s of CONTENT.subjects) {
    const got = s.units.filter((u) => state.records[u.id] && state.records[u.id].star).length;
    const b = document.createElement('button');
    b.innerHTML = `<span class="icon">${s.icon}</span><span>${s.name}</span><span>${'⭐'.repeat(got)}${'☆'.repeat(s.units.length - got)}</span>`;
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
    const r = state.records[u.id];
    const open = isUnlocked(s, i, state.records);
    const b = document.createElement('button');
    b.textContent = `${open ? '' : '🔒 '}${i + 1}단원 · ${u.title} ${r && r.star ? '⭐' : ''}`;
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
  q.choices.forEach((c, i) => {
    const b = document.createElement('button');
    b.innerHTML = `<span class="pic">${c.pic}</span><span>${c.label}</span>`;
    b.onclick = () => choose(i, b);
    box.appendChild(b);
  });
  speak(q.say, q.lang);
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
  if (won && !hadStar) lines.push('⭐ 별을 받았어요!');
  else if (!won) lines.push(`${MASTER_NEED}개 이상 맞히면 별을 받아요. 거의 다 왔어! 다시 도전!`);
  if (after !== before) lines.push(after === 'adult' ? `🎉 ${iga(state.name)} 어른이 되었어요! 모든 단원 마스터!` : `${iga(state.name)} ${STAGE_NAME[after]}로 자랐어요!`);
  $('result-pet').textContent = CONTENT.petEmoji[after];
  $('result-title').textContent = won ? '참 잘했어요!' : '잘했어요!';
  $('result-text').textContent = lines.join(' ');
  show('result');
  speak(lines.join(' '), 'ko');
}

// ---- 기록 보기 ----
function renderRecords() {
  const rows = $('record-rows');
  rows.innerHTML = '';
  for (const s of CONTENT.subjects) {
    for (const u of s.units) {
      const r = state.records[u.id];
      const tr = document.createElement('tr');
      for (const v of [s.name, u.title, r && r.star ? '⭐' : '-', r ? `${r.best} / ${u.questions.length}` : '-', r ? `${r.attempts}번` : '-']) {
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
