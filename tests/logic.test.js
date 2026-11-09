const test = require('node:test');
const assert = require('node:assert');
const { prepareQuiz, mastered, starCount, stageOf, isUnlocked, recordResult, SHAPES, turn, mirror, sameOrient, puzzleFirstTry } = require('../logic.js');
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
  // 3분의 1을 모으면 어린이 (단원 수가 늘어도 비율 유지)
  assert.strictEqual(stageOf(5, 18), 'baby');
  assert.strictEqual(stageOf(6, 18), 'child');
  assert.strictEqual(stageOf(17, 18), 'child');
  assert.strictEqual(stageOf(18, 18), 'adult');
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

// 화면 그리기와 같은 순서: 먼저 좌우 뒤집기(flip), 그다음 rot도 시계 방향 회전 (화면 좌표: y가 아래)
function place([x, y], o) {
  const fx = o.flip ? -x : x;
  const r = (o.rot * Math.PI) / 180;
  return [Math.round(fx * Math.cos(r) - y * Math.sin(r)), Math.round(fx * Math.sin(r) + y * Math.cos(r))];
}

test('퍼즐: 돌리기 4번이면 제자리, 뒤집기 2번이면 제자리', () => {
  let o = { rot: 90, flip: true };
  for (let i = 0; i < 4; i++) o = turn(o);
  assert.ok(sameOrient(o, { rot: 90, flip: true }));
  assert.ok(sameOrient(mirror(mirror({ rot: 270, flip: false })), { rot: 270, flip: false }));
});

test('퍼즐: 상태 계산이 실제 화면 좌우 뒤집기·시계 방향 회전과 같다', () => {
  const p = [3, 1];
  for (const rot of [0, 90, 180, 270]) {
    for (const flip of [false, true]) {
      const o = { rot, flip };
      const [x, y] = place(p, o);
      assert.deepStrictEqual(place(p, mirror(o)), [-x, y], `뒤집기 ${rot} ${flip}`);
      assert.deepStrictEqual(place(p, turn(o)), [-y, x], `돌리기 ${rot} ${flip}`);
    }
  }
});

test('퍼즐: 4번 안에 맞추면 첫 시도 정답', () => {
  assert.strictEqual(puzzleFirstTry(1), true);
  assert.strictEqual(puzzleFirstTry(4), true);
  assert.strictEqual(puzzleFirstTry(5), false);
});

test('퍼즐 문제는 섞을 때 그대로 유지', () => {
  const unit = { questions: [{ type: 'puzzle', say: 'a', shape: 'L', start: { rot: 0, flip: false }, goal: { rot: 90, flip: false } }] };
  assert.deepStrictEqual(prepareQuiz(unit)[0], unit.questions[0]);
});

test('content.js 형식 (팀원 수정 후 깨짐 방지)', () => {
  assert.ok(CONTENT.subjects.length >= 1);
  const subIds = CONTENT.subjects.map((s) => s.id);
  assert.strictEqual(new Set(subIds).size, subIds.length, '과목 id 중복');
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
        if (q.type === 'puzzle') {
          assert.ok(SHAPES[q.shape], `없는 도형: ${q.shape}`);
          for (const o of [q.start, q.goal]) assert.ok([0, 90, 180, 270].includes(o.rot) && typeof o.flip === 'boolean', q.say);
          assert.ok(!sameOrient(q.start, q.goal), `시작과 목표가 같음: ${q.say}`);
          continue;
        }
        assert.ok(q.choices.length >= 2 && q.choices.length <= 4, q.say);
        for (const c of q.choices) assert.ok(c.pic && c.label, q.say);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length, q.say);
      }
    }
  }
  for (const st of ['egg', 'baby', 'child', 'adult']) assert.ok(CONTENT.petEmoji[st]);
});
