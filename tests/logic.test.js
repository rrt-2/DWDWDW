const test = require('node:test');
const assert = require('node:assert');
const { prepareQuiz, mastered, starCount, stageOf, isUnlocked, recordResult } = require('../logic.js');
const CONTENT = require('../content.js');

// 고정 난수: 테스트 결과가 매번 같도록
function seeded(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

test('퀴즈 준비: 문제·보기를 섞어도 정답이 같은 보기를 가리킨다', () => {
  const unit = CONTENT.subjects[0].units[0];
  const quiz = prepareQuiz(unit, seeded(7));
  assert.strictEqual(quiz.length, unit.questions.length);
  for (const q of quiz) {
    const orig = unit.questions.find((o) => o.say === q.say);
    assert.deepStrictEqual(q.choices[q.answer], orig.choices[orig.answer]);
    assert.strictEqual(q.choices.length, orig.choices.length);
  }
  assert.strictEqual(unit.questions[0].answer, CONTENT.subjects[0].units[0].questions[0].answer); // 원본 안 바뀜
});

test('마스터: 첫 시도 정답 4개 이상', () => {
  assert.strictEqual(mastered(3), false);
  assert.strictEqual(mastered(4), true);
  assert.strictEqual(mastered(5), true);
});

test('별 → 성장 단계', () => {
  assert.strictEqual(stageOf(0, 9), 'egg');
  assert.strictEqual(stageOf(1, 9), 'baby');
  assert.strictEqual(stageOf(3, 9), 'baby');
  assert.strictEqual(stageOf(4, 9), 'child');
  assert.strictEqual(stageOf(8, 9), 'child');
  assert.strictEqual(stageOf(9, 9), 'adult');
});

test('단원 잠금: 앞 단원 별이 있어야 열림', () => {
  const sub = CONTENT.subjects[0];
  assert.strictEqual(isUnlocked(sub, 0, {}), true);
  assert.strictEqual(isUnlocked(sub, 1, {}), false);
  assert.strictEqual(isUnlocked(sub, 1, { [sub.units[0].id]: { star: true } }), true);
  assert.strictEqual(isUnlocked(sub, 2, { [sub.units[0].id]: { star: true } }), false);
});

test('기록 갱신: 별은 한 번 얻으면 유지, 최고 점수와 도전 횟수', () => {
  let r = recordResult({}, 'en1', 3);
  assert.deepStrictEqual(r.en1, { star: false, best: 3, attempts: 1 });
  r = recordResult(r, 'en1', 5);
  assert.deepStrictEqual(r.en1, { star: true, best: 5, attempts: 2 });
  r = recordResult(r, 'en1', 2);
  assert.deepStrictEqual(r.en1, { star: true, best: 5, attempts: 3 });
  assert.strictEqual(starCount(r), 1);
});

test('content.js 형식 (팀원 수정 후 깨짐 방지)', () => {
  assert.strictEqual(CONTENT.subjects.length, 3);
  const ids = new Set();
  for (const s of CONTENT.subjects) {
    assert.ok(s.id && s.name && s.icon);
    assert.strictEqual(s.units.length, 3, s.name);
    for (const u of s.units) {
      assert.ok(u.id && u.title);
      assert.ok(u.friend && u.friend.pic && u.friend.name && u.friend.desc, `도감 친구 없음: ${u.title}`);
      assert.ok(!ids.has(u.id), `단원 id 중복: ${u.id}`);
      ids.add(u.id);
      assert.strictEqual(u.questions.length, 5, u.title);
      for (const q of u.questions) {
        assert.ok(q.say, u.title);
        assert.ok(q.lang === 'en' || q.lang === 'ko', q.say);
        assert.ok(q.choices.length >= 2 && q.choices.length <= 4, q.say);
        for (const c of q.choices) assert.ok(c.pic && c.label, q.say);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length, q.say);
      }
    }
  }
  for (const st of ['egg', 'baby', 'child', 'adult']) assert.ok(CONTENT.petEmoji[st]);
});
