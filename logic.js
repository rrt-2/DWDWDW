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

// 문제 순서와 보기 순서를 섞고, 정답 번호를 새 순서에 맞춤
function prepareQuiz(unit, rand = Math.random) {
  return shuffle(unit.questions, rand).map((q) => {
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

// 별 0 = 알, 1~3 = 아기, 4~8 = 어린이, 전부 = 어른
function stageOf(stars, total) {
  if (stars === 0) return 'egg';
  if (stars >= total) return 'adult';
  if (stars >= 4) return 'child';
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
  module.exports = { MASTER_NEED, shuffle, prepareQuiz, mastered, starCount, stageOf, isUnlocked, recordResult };
}
