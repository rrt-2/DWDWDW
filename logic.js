// 순수 학습 로직 (화면 코드 없음 → node로 테스트)
const MASTER_NEED = 4; // 마스터 기준: 첫 시도 정답 수

// 피셔-예이츠 섞기. 원본은 그대로 두고 새 배열 반환
function shuffle(arr, rand = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- 도형 퍼즐: 손으로 돌리고 뒤집어서 그림자에 맞추기 ----
// 도형 = 0~100 칸 안의 꼭짓점 목록 (돌리거나 뒤집으면 모양이 달라 보이게 대칭 없는 모양만)
const SHAPES = {
  L: '25,10 50,10 50,65 80,65 80,90 25,90',
  flag: '20,10 80,30 34,48 34,90 20,90',
  F: '35,10 85,10 85,30 55,30 55,45 75,45 75,62 55,62 55,90 35,90',
};

// 방향 = { rot: 0|90|180|270 (시계 방향), flip: 좌우 뒤집힘 }. 그릴 때는 뒤집기 먼저, 그다음 회전
function turn(o) {
  return { rot: (o.rot + 90) % 360, flip: o.flip };
}

// 화면 기준 좌우 뒤집기 = 회전 방향이 반대가 되고 뒤집힘이 바뀜
function mirror(o) {
  return { rot: (360 - o.rot) % 360, flip: !o.flip };
}

function sameOrient(a, b) {
  return a.rot % 360 === b.rot % 360 && a.flip === b.flip;
}

// 어떤 목표든 돌리기 3번 + 뒤집기 1번이면 됨 → 4번 안에 맞추면 첫 시도 정답으로 침
function puzzleFirstTry(moves) {
  return moves <= 4;
}

// ---- 자동 생성 문제: 풀 때마다 숫자·모양이 바뀜 ----
const QUIZ_SIZE = 5; // 한 판 문제 수

// 숫자 뒤 조사: 끝자리를 읽었을 때 받침이 있으면(영·일·삼·육·칠·팔, 십·백) '은', 없으면 '는'
function eunNeun(n) {
  return '013678'.includes(String(n).slice(-1)) ? '은' : '는';
}

function randInt(lo, hi, rand) {
  return lo + Math.floor(rand() * (hi - lo + 1));
}

// 숫자 정답 + 오답 후보 → 보기 3개 문제 (음수·중복 오답은 버림)
function numberQuestion(say, ans, wrongs, rand, unit = '') {
  const picks = shuffle([...new Set(wrongs)].filter((w) => w >= (unit ? 1 : 0) && w !== ans), rand).slice(0, 2);
  const choices = [ans, ...picks].map((n) => ({ pic: unit === '원' ? '💰' : '✏️', label: n + unit }));
  return { say, lang: 'ko', choices, answer: 0 };
}

const pick = (arr, rand) => arr[randInt(0, arr.length - 1, rand)];

const GENERATORS = {
  // 100 이하 덧셈·뺄셈, 또는 만 원 내고 거스름돈 받기
  add(rand) {
    const r = rand();
    if (r < 0.34) {
      const price = randInt(2, 19, rand) * 500;
      const thing = pick(['두부 한 모를', '달걀 한 판을', '양말 한 켤레를', '호박 한 개를', '우유 한 통을'], rand);
      const ans = 10000 - price;
      return numberQuestion(`${price}원짜리 ${thing} 사고 만 원을 냈어요. 거스름돈은 얼마일까요?`, ans, [ans + 500, ans - 500, ans + 1000, ans - 1000], rand, '원');
    }
    if (r < 0.67) {
      const a = randInt(10, 60, rand);
      const b = randInt(1, Math.min(39, 99 - a), rand);
      return numberQuestion(`${a} 더하기 ${b}${eunNeun(b)} 얼마일까요?`, a + b, [a + b + 1, a + b - 1, a + b + 10, a + b - 10], rand);
    }
    const a = randInt(20, 99, rand);
    const b = randInt(1, a - 1, rand);
    return numberQuestion(`${a} 빼기 ${b}${eunNeun(b)} 얼마일까요?`, a - b, [a - b + 1, a - b - 1, a - b + 10, a + b], rand);
  },
  // 2학년: 구구단 (2~9단)
  mul(rand) {
    if (rand() < 0.5) {
      const price = randInt(1, 9, rand) * 100;
      const n = randInt(2, 9, rand);
      const thing = pick(['귤을', '붕어빵을', '호떡을', '사탕을', '풀빵을'], rand);
      return numberQuestion(`한 개에 ${price}원인 ${thing} ${n}개 사면 모두 얼마일까요?`, price * n, [price * (n + 1), price * (n - 1), price * n + 100], rand, '원');
    }
    const a = randInt(2, 9, rand);
    const b = randInt(2, 9, rand);
    return numberQuestion(`${a} 곱하기 ${b}${eunNeun(b)} 얼마일까요?`, a * b, [a * (b + 1), a * (b - 1), (a + 1) * b, a * b + 1], rand);
  },
  // 3학년: 나누어떨어지는 나눗셈
  div(rand) {
    if (rand() < 0.5) {
      const people = randInt(2, 6, rand);
      const each = randInt(2, 8, rand);
      const thing = pick(['떡', '귤', '밤', '곶감'], rand);
      return numberQuestion(`${thing} ${people * each}개를 ${people}명이 똑같이 나누면 한 사람이 몇 개씩일까요?`, each, [each + 1, each - 1, each + 2], rand, '개');
    }
    const b = randInt(2, 9, rand);
    const q = randInt(2, 9, rand);
    return numberQuestion(`${b * q} 나누기 ${b}${eunNeun(b)} 얼마일까요?`, q, [q + 1, q - 1, b, q + 2], rand);
  },
  // 3학년 도형: 모양과 목표 방향을 무작위로
  puzzle(rand) {
    const names = Object.keys(SHAPES);
    const start = { rot: 0, flip: false };
    let goal = start;
    while (sameOrient(goal, start)) goal = { rot: randInt(0, 3, rand) * 90, flip: rand() < 0.5 };
    return { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: names[randInt(0, names.length - 1, rand)], start, goal };
  },
};

// 고정 문제 + 생성 문제를 섞어 5개 뽑고, 보기 순서를 섞어 정답 번호를 새 순서에 맞춤 (퍼즐은 보기가 없어서 그대로)
// seen = 최근에 푼 고정 문제 글 목록. 안 푼 문제를 먼저 내고, 모자라면 푼 문제로 채움
function prepareQuiz(unit, rand = Math.random, seen = []) {
  const made = unit.gen ? Array.from({ length: QUIZ_SIZE }, () => GENERATORS[unit.gen](rand)) : [];
  const fresh = unit.questions.filter((q) => !seen.includes(q.say));
  const stale = unit.questions.filter((q) => seen.includes(q.say));
  return [...shuffle([...fresh, ...made], rand), ...shuffle(stale, rand)].slice(0, QUIZ_SIZE).map((q) => {
    if (q.type === 'puzzle') return q;
    const order = shuffle([...q.choices.keys()], rand);
    return { ...q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) };
  });
}

// 이번 판 문제를 seen에 더함. 고정 문제를 한 바퀴 다 풀었으면 이번 판만 남기고 새로 시작
function nextSeen(unit, qs, seen = []) {
  const own = qs.map((q) => q.say).filter((say) => unit.questions.some((x) => x.say === say));
  const all = [...new Set([...seen, ...own])];
  return all.length >= unit.questions.length ? own : all;
}

function mastered(firstTry) {
  return firstTry >= MASTER_NEED;
}

function starCount(records) {
  return Object.values(records).filter((r) => r.star).length;
}

// 0 = 알, 3분의 1 미만 = 아기, 전부 미만 = 어린이, 전부 = 어른
function stageOf(stars, total) {
  if (stars === 0) return 'egg';
  if (stars >= total) return 'adult';
  if (stars >= total / 3) return 'child';
  return 'baby';
}

// 첫 단원은 항상 열림, 나머지는 앞 단원 별이 있어야 열림
function isUnlocked(subject, unitIndex, records) {
  if (unitIndex === 0) return true;
  const prev = records[subject.units[unitIndex - 1].id];
  return !!(prev && prev.star);
}

// 단원 결과 반영한 새 기록 반환 (별은 한 번 얻으면 유지)
function recordResult(records, unitId, firstTry) {
  const prev = records[unitId] || { star: false, best: 0, attempts: 0 };
  return {
    ...records,
    [unitId]: {
      star: prev.star || mastered(firstTry),
      best: Math.max(prev.best, firstTry),
      attempts: prev.attempts + 1,
    },
  };
}

// ---- 어르신 건강 체크 ----
// 하루 기록 = { answers: { meal, med, water, walk, sleep: true/false }, mood: 'good'|'ok'|'bad' }
const HEALTH_LABEL = { meal: '식사', med: '약', water: '물', walk: '걷기', sleep: '잠' };
const MOOD_LABEL = { good: '좋음', ok: '보통', bad: '나쁨' };

// 날짜 → 'YYYY-MM-DD' (내 컴퓨터 시간 기준)
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + n));
}

// 하루 점수: '네' 비율 + 기분 보정 (좋음 +0.2, 나쁨 -0.2)
function dayScore(day) {
  const ids = Object.keys(HEALTH_LABEL);
  const yes = ids.filter((id) => day.answers[id]).length / ids.length;
  return yes + (day.mood === 'good' ? 0.2 : day.mood === 'bad' ? -0.2 : 0);
}

// 캐릭터 기분: 최근 3일 평균 점수. 3일 동안 기록이 없으면 기운 없음 (처음 시작이면 보통)
function petMood(days, today) {
  const recent = [0, -1, -2].map((n) => days[addDays(today, n)]).filter(Boolean);
  if (recent.length === 0) return Object.keys(days).length ? 'tired' : 'idle';
  const avg = recent.reduce((s, d) => s + dayScore(d), 0) / recent.length;
  return avg >= 0.8 ? 'happy' : avg >= 0.4 ? 'idle' : 'tired';
}

// 위험 신호 (의학 기준 아님, 연락해 볼 신호): none=기록 없음, contact=3일 이상 체크 없음, caution=마지막 날 '네' 2개 이하·약·기분 이상, ok
function riskLevel(days, today) {
  const keys = Object.keys(days).sort();
  if (keys.length === 0) return 'none';
  const last = keys[keys.length - 1];
  if (last <= addDays(today, -3)) return 'contact';
  const at = (n) => days[addDays(last, n)];
  const noMed = [0, -1].every((n) => at(n) && at(n).answers.med === false);
  const sad = [0, -1, -2].every((n) => at(n) && at(n).mood === 'bad');
  const poor = Object.values(at(0).answers).filter(Boolean).length <= 2; // 마지막 체크에서 '네'가 5개 중 2개 이하
  return noMed || sad || poor ? 'caution' : 'ok';
}

const RISK_TEXT = {
  none: '아직 기록이 없어요.',
  ok: '특별한 이상 신호는 없어요.',
  caution: '⚠ 주의: 최근 체크에서 "아니요"가 많거나, 약을 거르시거나 기분이 안 좋은 날이 이어지고 있어요.',
  contact: '⚠ 3일 넘게 체크가 없어요. 연락해 보세요.',
};

// 보호자에게 보낼 최근 7일 요약 글
function weekSummary(days, name, today) {
  const lines = [`[두뇌건강 다마고치] ${name} 최근 7일 생활 체크`];
  for (let i = 6; i >= 0; i--) {
    const k = addDays(today, -i);
    const d = days[k];
    const items = d
      ? Object.entries(HEALTH_LABEL).map(([id, label]) => `${label}${d.answers[id] ? '○' : '×'}`).join(' ') + ` 기분 ${MOOD_LABEL[d.mood]}`
      : '체크 안 함';
    lines.push(`${k.slice(5).replace('-', '/')} ${items}`);
  }
  lines.push(RISK_TEXT[riskLevel(days, today)]);
  return lines.join('\n');
}

// 성장 점수 = 체크한 날 수 + 도감 친구 수
function growthPoints(days, records) {
  return Object.keys(days).length + starCount(records);
}

// ---- 돌봄 코드: 서버 없이 기록을 돌봄 화면으로 옮기는 글자 묶음 ----
// 하루 = '11010g' (식사·약·물·걷기·잠 1/0 + 기분 첫 글자). 최근 14일만 담음
function packCode(name, days, today) {
  const ids = Object.keys(HEALTH_LABEL);
  const d = {};
  for (let i = 0; i < 14; i++) {
    const k = addDays(today, -i);
    if (days[k]) d[k] = ids.map((id) => (days[k].answers[id] ? 1 : 0)).join('') + days[k].mood[0];
  }
  return 'BT1.' + btoa(encodeURIComponent(JSON.stringify({ n: name, d })));
}

// 글 안에서 돌봄 코드를 찾아 { name, days }로. 형식이 틀리면 null (남이 준 글이라 꼼꼼히 검사)
function unpackCode(text) {
  const m = /BT1\.([A-Za-z0-9+/=]+)/.exec(String(text).replace(/\s/g, ''));
  if (!m) return null;
  try {
    const { n, d } = JSON.parse(decodeURIComponent(atob(m[1])));
    if (typeof n !== 'string' || !n.trim() || !d || typeof d !== 'object') return null;
    const ids = Object.keys(HEALTH_LABEL);
    const moods = { g: 'good', o: 'ok', b: 'bad' };
    const days = {};
    for (const [k, v] of Object.entries(d)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || !/^[01]{5}[gob]$/.test(v)) return null;
      days[k] = { answers: Object.fromEntries(ids.map((id, i) => [id, v[i] === '1'])), mood: moods[v[5]] };
    }
    return { name: n.trim().slice(0, 20), days };
  } catch { return null; }
}

if (typeof module !== 'undefined') {
  module.exports = { MASTER_NEED, shuffle, prepareQuiz, nextSeen, mastered, starCount, stageOf, isUnlocked, recordResult, SHAPES, turn, mirror, sameOrient, puzzleFirstTry, GENERATORS, QUIZ_SIZE,
    HEALTH_LABEL, MOOD_LABEL, RISK_TEXT, dateKey, addDays, petMood, riskLevel, weekSummary, growthPoints, packCode, unpackCode };
}
