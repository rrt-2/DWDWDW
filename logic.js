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
function numberQuestion(say, ans, wrongs, rand) {
  const picks = shuffle([...new Set(wrongs)].filter((w) => w >= 0 && w !== ans), rand).slice(0, 2);
  const choices = [ans, ...picks].map((n) => ({ pic: '✏️', label: String(n) }));
  return { say, lang: 'ko', choices, answer: 0 };
}

const GENERATORS = {
  // 1학년: 100 이하 덧셈·뺄셈
  add(rand) {
    if (rand() < 0.5) {
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
    const a = randInt(2, 9, rand);
    const b = randInt(2, 9, rand);
    return numberQuestion(`${a} 곱하기 ${b}${eunNeun(b)} 얼마일까요?`, a * b, [a * (b + 1), a * (b - 1), (a + 1) * b, a * b + 1], rand);
  },
  // 3학년: 나누어떨어지는 나눗셈
  div(rand) {
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
function prepareQuiz(unit, rand = Math.random) {
  const made = unit.gen ? Array.from({ length: QUIZ_SIZE }, () => GENERATORS[unit.gen](rand)) : [];
  return shuffle([...unit.questions, ...made], rand).slice(0, QUIZ_SIZE).map((q) => {
    if (q.type === 'puzzle') return q;
    const order = shuffle([...q.choices.keys()], rand);
    return { ...q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) };
  });
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

if (typeof module !== 'undefined') {
  module.exports = { MASTER_NEED, shuffle, prepareQuiz, mastered, starCount, stageOf, isUnlocked, recordResult, SHAPES, turn, mirror, sameOrient, puzzleFirstTry, GENERATORS, QUIZ_SIZE };
}
