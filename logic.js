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

// 문제 순서와 보기 순서를 섞고, 정답 번호를 새 순서에 맞춤 (퍼즐 문제는 보기가 없어서 그대로)
function prepareQuiz(unit, rand = Math.random) {
  return shuffle(unit.questions, rand).map((q) => {
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
  module.exports = { MASTER_NEED, shuffle, prepareQuiz, mastered, starCount, stageOf, isUnlocked, recordResult, SHAPES, turn, mirror, sameOrient, puzzleFirstTry };
}
