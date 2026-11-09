// 팀원 수정용 파일: 과목, 단원, 문제
// 글자만 바꾸면 됨. 따옴표, 쉼표, 괄호는 지우지 말 것.
// answer = 정답 보기 번호 (첫 번째 보기가 0). 화면에서는 보기 순서가 섞여서 나옴.
// lang = 읽어줄 목소리 ('en' 영어, 'ko' 한국어)
// 단원 문제가 5개보다 많으면 풀 때마다 5개를 골라 냄 → 문제를 많이 넣을수록 매번 달라짐
// 수정 후 `node --test` 실행해서 통과하는지 확인.
const CONTENT = {
  // 캐릭터 그림 파일이 없을 때 대신 보여줄 이모지
  petEmoji: { egg: '🥚', baby: '🐣', child: '🐥', adult: '🐔' },

  // 매일 건강 체크 질문 (id는 바꾸지 말 것). yes/no = 대답 후 캐릭터가 하는 말
  health: [
    { id: 'meal', pic: '🍚', ask: '오늘 식사는 챙겨 드셨어요?', yes: '잘하셨어요! 저도 같이 냠냠 먹었어요.', no: '한 끼라도 꼭 챙겨 드세요. 저도 배고파요.' },
    { id: 'med', pic: '💊', ask: '드셔야 할 약은 챙겨 드셨어요?', yes: '잘하셨어요! 약 꼬박꼬박 최고예요.', no: '잊지 말고 꼭 챙겨 드세요.' },
    { id: 'water', pic: '💧', ask: '물은 자주 드셨어요?', yes: '좋아요! 저도 꿀꺽꿀꺽 마셨어요.', no: '지금 물 한 잔 드시면 어때요?' },
    { id: 'walk', pic: '🚶', ask: '오늘 조금이라도 걸으셨어요?', yes: '와! 저도 같이 신나게 뛰었어요.', no: '잠깐이라도 같이 걸어요!' },
    { id: 'sleep', pic: '😴', ask: '어젯밤 잘 주무셨어요?', yes: '다행이에요! 저도 푹 잤어요.', no: '오늘은 일찍 푹 쉬세요.' },
  ],
  moodAsk: '오늘 기분은 어떠세요?',

  subjects: [
    // ---- 두뇌 운동: 단원 순서 = 쉬움 → 보통 → 어려움 ----
    {
      id: 'ko', name: '낱말', icon: '📖',
      units: [
        {
          id: 'ko1', title: '쉬움 · 낱말과 띄어쓰기',
          friend: { pic: '🐼', name: '또박 판다', desc: '글씨를 또박또박 바르게 쓰는 판다예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '"가을 하늘이 높아요"를 바르게 띄어 쓴 것은?', lang: 'ko', choices: [{ pic: '✏️', label: '가을 하늘이 높아요' }, { pic: '✏️', label: '가을하늘이 높아요' }, { pic: '✏️', label: '가을 하늘이높아요' }], answer: 0 },
            { say: '빨갛고 동그란 과일, 바르게 쓴 낱말은?', lang: 'ko', choices: [{ pic: '🍎', label: '사가' }, { pic: '🍎', label: '사과' }, { pic: '🍎', label: '샤과' }], answer: 1 },
            { say: '우리가 매일 먹는 밥, 바르게 쓴 낱말은?', lang: 'ko', choices: [{ pic: '🍚', label: '밮' }, { pic: '🍚', label: '밯' }, { pic: '🍚', label: '밥' }], answer: 2 },
            { say: '친구에게 하는 말로 알맞은 것은? 같이 놀아서 ○○○!', lang: 'ko', choices: [{ pic: '😊', label: '좋았어' }, { pic: '😊', label: '좋았서' }, { pic: '😊', label: '조았어' }], answer: 0 },
            { say: '그림일기에 날씨를 써요. 해가 쨍쨍한 날은?', lang: 'ko', choices: [{ pic: '🌧️', label: '비' }, { pic: '☀️', label: '맑음' }, { pic: '❄️', label: '눈' }], answer: 1 },
            { say: "키가 크고 잎이 많은 것, 바르게 쓴 낱말은?", lang: "ko", choices: [{ pic: "🌳", label: "나무" }, { pic: "🌳", label: "나므" }, { pic: "🌳", label: "너무" }], answer: 0 },
            { say: "우리가 공부하러 가는 곳, 바르게 쓴 낱말은?", lang: "ko", choices: [{ pic: "🏫", label: "학교" }, { pic: "🏫", label: "핚교" }, { pic: "🏫", label: "학꾜" }], answer: 0 },
            { say: "멍멍 짖는 동물, 바르게 쓴 낱말은?", lang: "ko", choices: [{ pic: "🐶", label: "강아지" }, { pic: "🐶", label: "강아치" }, { pic: "🐶", label: "깡아지" }], answer: 0 },
            { say: "파도가 치는 넓은 물, 바르게 쓴 낱말은?", lang: "ko", choices: [{ pic: "🌊", label: "바다" }, { pic: "🌊", label: "바따" }, { pic: "🌊", label: "버다" }], answer: 0 },
            { say: "바르게 띄어 쓴 문장은?", lang: "ko", choices: [{ pic: "✏️", label: "엄마가 웃어요" }, { pic: "✏️", label: "엄마가웃어요" }, { pic: "✏️", label: "엄 마가 웃어요" }], answer: 0 },
          ],
        },
        {
          id: 'ko2', title: '보통 · 받침과 문장',
          friend: { pic: '🐨', name: '받침 코알라', desc: '어려운 받침도 척척 아는 코알라예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '바르게 쓴 문장은?', lang: 'ko', choices: [{ pic: '✏️', label: '줄넘기를 했습니다' }, { pic: '✏️', label: '줄럼기를 했습니다' }, { pic: '✏️', label: '줄넘기를 햇습니다' }], answer: 0 },
            { say: '책을 소리 내어 봐요. 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '📚', label: '책을 일거요' }, { pic: '📚', label: '책을 읽어요' }, { pic: '📚', label: '책을 익어요' }], answer: 1 },
            { say: '의자에 몸을 붙여 쉬어요. 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '🪑', label: '안자요' }, { pic: '🪑', label: '않아요' }, { pic: '🪑', label: '앉아요' }], answer: 2 },
            { say: '빈칸에 알맞은 말은? 나는 겨울이 좋아요. 왜냐하면 눈사람을 만들 수 있기 ○○○○.', lang: 'ko', choices: [{ pic: '⛄', label: '때문이에요' }, { pic: '⛄', label: '그래서요' }, { pic: '⛄', label: '하지만요' }], answer: 0 },
            { say: '겨울에 처음 내리는 눈, 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '❄️', label: '첫는' }, { pic: '❄️', label: '천눈' }, { pic: '❄️', label: '첫눈' }], answer: 2 },
            { say: "방을 청소했어요. 바르게 쓴 것은?", lang: "ko", choices: [{ pic: "🧹", label: "깨끗해요" }, { pic: "🧹", label: "깨끄태요" }, { pic: "🧹", label: "깨끗헤요" }], answer: 0 },
            { say: "꼬끼오 우는 동물, 바르게 쓴 것은?", lang: "ko", choices: [{ pic: "🐔", label: "닭" }, { pic: "🐔", label: "닥" }, { pic: "🐔", label: "달" }], answer: 0 },
            { say: "구름 없는 하늘, 바르게 쓴 것은?", lang: "ko", choices: [{ pic: "☀️", label: "맑은 하늘" }, { pic: "☀️", label: "말근 하늘" }, { pic: "☀️", label: "막은 하늘" }], answer: 0 },
            { say: "큰 운동장, 바르게 쓴 것은?", lang: "ko", choices: [{ pic: "🏟️", label: "넓은 운동장" }, { pic: "🏟️", label: "널븐 운동장" }, { pic: "🏟️", label: "넙은 운동장" }], answer: 0 },
            { say: "물음표(?)가 어울리는 문장은?", lang: "ko", choices: [{ pic: "❓", label: "너 어디 가니" }, { pic: "❓", label: "나는 학교에 가요" }, { pic: "❓", label: "와, 정말 멋지다" }], answer: 0 },
          ],
        },
        {
          id: 'ko3', title: '어려움 · 중심 문장 찾기',
          friend: { pic: '🦒', name: '쏙쏙 기린', desc: '긴 목으로 글의 중심을 쏙쏙 찾는 기린이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '중심 문장을 찾아요. 개미는 서로 도우며 살아요. 먹이를 찾으면 친구들에게 알려 줘요. 무거운 먹이는 여럿이 함께 옮겨요.', lang: 'ko', choices: [{ pic: '🐜', label: '개미는 서로 도우며 살아요.' }, { pic: '🐜', label: '먹이를 찾으면 친구들에게 알려 줘요.' }, { pic: '🐜', label: '무거운 먹이는 여럿이 함께 옮겨요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 물을 아껴 써야 해요. 이를 닦을 때 컵을 쓰면 물을 아낄 수 있어요. 샤워 시간을 줄이는 것도 좋은 방법이에요.', lang: 'ko', choices: [{ pic: '💧', label: '물을 아껴 써야 해요.' }, { pic: '💧', label: '이를 닦을 때 컵을 쓰면 물을 아낄 수 있어요.' }, { pic: '💧', label: '샤워 시간을 줄이는 것도 좋은 방법이에요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 아침을 먹으면 머리가 잘 돌아가요. 몸에 힘도 생겨요. 그래서 아침밥은 꼭 먹는 것이 좋아요.', lang: 'ko', choices: [{ pic: '🍳', label: '아침을 먹으면 머리가 잘 돌아가요.' }, { pic: '🍳', label: '몸에 힘도 생겨요.' }, { pic: '🍳', label: '그래서 아침밥은 꼭 먹는 것이 좋아요.' }], answer: 2 },
            { say: '중심 문장을 찾아요. 가을에는 볼거리가 많아요. 나뭇잎이 빨갛게 물들어요. 들판에는 벼가 노랗게 익어요.', lang: 'ko', choices: [{ pic: '🍁', label: '가을에는 볼거리가 많아요.' }, { pic: '🍁', label: '나뭇잎이 빨갛게 물들어요.' }, { pic: '🍁', label: '들판에는 벼가 노랗게 익어요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 줄넘기를 하면 다리가 튼튼해져요. 땀이 나서 몸도 상쾌해요. 줄넘기는 우리 몸에 좋은 운동이에요.', lang: 'ko', choices: [{ pic: '🏃', label: '줄넘기를 하면 다리가 튼튼해져요.' }, { pic: '🏃', label: '땀이 나서 몸도 상쾌해요.' }, { pic: '🏃', label: '줄넘기는 우리 몸에 좋은 운동이에요.' }], answer: 2 },
            { say: "중심 문장을 찾아요. 책을 읽으면 좋은 점이 많아요. 새로운 낱말을 알게 돼요. 상상력도 쑥쑥 자라요.", lang: "ko", choices: [{ pic: "📚", label: "책을 읽으면 좋은 점이 많아요." }, { pic: "📚", label: "새로운 낱말을 알게 돼요." }, { pic: "📚", label: "상상력도 쑥쑥 자라요." }], answer: 0 },
            { say: "중심 문장을 찾아요. 강아지는 냄새를 잘 맡아요. 사람보다 코가 훨씬 예민해요. 그래서 사라진 물건도 잘 찾아요.", lang: "ko", choices: [{ pic: "🐶", label: "강아지는 냄새를 잘 맡아요." }, { pic: "🐶", label: "사람보다 코가 훨씬 예민해요." }, { pic: "🐶", label: "그래서 사라진 물건도 잘 찾아요." }], answer: 0 },
            { say: "중심 문장을 찾아요. 밥을 먹기 전에 손을 씻어요. 놀이터에서 놀고 와서도 씻어요. 손을 자주 씻으면 감기를 막을 수 있어요.", lang: "ko", choices: [{ pic: "🧼", label: "손을 자주 씻으면 감기를 막을 수 있어요." }, { pic: "🧼", label: "밥을 먹기 전에 손을 씻어요." }, { pic: "🧼", label: "놀이터에서 놀고 와서도 씻어요." }], answer: 0 },
            { say: "중심 문장을 찾아요. 우리 반 친구들은 모두 달라요. 키가 큰 친구도 있고 작은 친구도 있어요. 좋아하는 놀이도 저마다 달라요.", lang: "ko", choices: [{ pic: "🧒", label: "우리 반 친구들은 모두 달라요." }, { pic: "🧒", label: "키가 큰 친구도 있고 작은 친구도 있어요." }, { pic: "🧒", label: "좋아하는 놀이도 저마다 달라요." }], answer: 0 },
            { say: "중심 문장을 찾아요. 식물은 햇빛이 꼭 필요해요. 햇빛을 받아야 잎이 초록색으로 자라요. 햇빛이 없으면 시들어 버려요.", lang: "ko", choices: [{ pic: "🌱", label: "식물은 햇빛이 꼭 필요해요." }, { pic: "🌱", label: "햇빛을 받아야 잎이 초록색으로 자라요." }, { pic: "🌱", label: "햇빛이 없으면 시들어 버려요." }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'math', name: '셈하기', icon: '🔢',
      units: [
        {
          id: 'math1', title: '쉬움 · 덧셈과 뺄셈',
          gen: 'add', // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: '🐹', name: '셈셈 햄스터', desc: '해바라기씨를 세다가 셈 박사가 된 햄스터예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '23 더하기 14는 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '36' }, { pic: '✏️', label: '37' }, { pic: '✏️', label: '47' }], answer: 1 },
            { say: '58 빼기 25는 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '33' }, { pic: '✏️', label: '43' }, { pic: '✏️', label: '32' }], answer: 0 },
            { say: '사탕이 12개 있어요. 친구가 7개를 더 줬어요. 모두 몇 개일까요?', lang: 'ko', choices: [{ pic: '🍬', label: '18개' }, { pic: '🍬', label: '20개' }, { pic: '🍬', label: '19개' }], answer: 2 },
            { say: '40 더하기 30은 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '70' }, { pic: '✏️', label: '60' }, { pic: '✏️', label: '7' }], answer: 0 },
            { say: '공이 9개 있었는데 4개를 친구에게 줬어요. 몇 개 남았을까요?', lang: 'ko', choices: [{ pic: '⚽', label: '13개' }, { pic: '⚽', label: '5개' }, { pic: '⚽', label: '4개' }], answer: 1 },
          ],
        },
        {
          id: 'math2', title: '보통 · 구구단과 길이',
          gen: 'mul', // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: '🐙', name: '구구 문어', desc: '다리 8개로 구구단을 외우는 문어예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '7 곱하기 8은 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '54' }, { pic: '✏️', label: '48' }, { pic: '✏️', label: '56' }], answer: 2 },
            { say: '접시 6개에 사과를 4개씩 담았어요. 사과는 모두 몇 개일까요?', lang: 'ko', choices: [{ pic: '🍎', label: '24개' }, { pic: '🍎', label: '10개' }, { pic: '🍎', label: '20개' }], answer: 0 },
            { say: '15센티미터 연필 옆에 4센티미터 지우개를 이어 놓았어요. 모두 몇 센티미터일까요?', lang: 'ko', choices: [{ pic: '📏', label: '11cm' }, { pic: '📏', label: '19cm' }, { pic: '📏', label: '20cm' }], answer: 1 },
            { say: '3 곱하기 9는 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '27' }, { pic: '✏️', label: '24' }, { pic: '✏️', label: '36' }], answer: 0 },
            { say: '1미터는 몇 센티미터일까요?', lang: 'ko', choices: [{ pic: '📏', label: '10cm' }, { pic: '📏', label: '1000cm' }, { pic: '📏', label: '100cm' }], answer: 2 },
          ],
        },
        {
          id: 'math3', title: '어려움 · 나눗셈과 분수',
          gen: 'div', // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: '🐳', name: '나눔 고래', desc: '무엇이든 똑같이 나눠 주는 마음 착한 고래예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '24 나누기 6은 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '6' }, { pic: '✏️', label: '4' }, { pic: '✏️', label: '3' }], answer: 1 },
            { say: '사탕 18개를 친구 3명이 똑같이 나눠요. 한 명이 몇 개씩 먹을까요?', lang: 'ko', choices: [{ pic: '🍬', label: '6개' }, { pic: '🍬', label: '5개' }, { pic: '🍬', label: '9개' }], answer: 0 },
            { say: '피자를 똑같이 8조각으로 나눠서 3조각을 먹었어요. 피자 한 판의 얼마를 먹었을까요?', lang: 'ko', choices: [{ pic: '🍕', label: '3분의 8' }, { pic: '🍕', label: '5분의 3' }, { pic: '🍕', label: '8분의 3' }], answer: 2 },
            { say: '12 나누기 4는 얼마일까요?', lang: 'ko', choices: [{ pic: '✏️', label: '3' }, { pic: '✏️', label: '4' }, { pic: '✏️', label: '8' }], answer: 0 },
            { say: '케이크를 똑같이 2조각으로 나눈 것 중 1조각은 얼마일까요?', lang: 'ko', choices: [{ pic: '🍰', label: '1분의 2' }, { pic: '🍰', label: '2분의 1' }, { pic: '🍰', label: '2분의 2' }], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'sci', name: '생활 상식', icon: '🔬',
      units: [
        {
          id: 'sci1', title: '쉬움 · 가을과 겨울',
          friend: { pic: '🦔', name: '도토리 고슴도치', desc: '가을이면 도토리를 모으는 부지런한 고슴도치예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '가을에 숲에서 찾을 수 있는 열매는?', lang: 'ko', choices: [{ pic: '🌰', label: '도토리' }, { pic: '🍉', label: '수박' }, { pic: '🍓', label: '딸기' }], answer: 0 },
            { say: '추운 겨울에 손에 끼는 것은?', lang: 'ko', choices: [{ pic: '🕶️', label: '선글라스' }, { pic: '🧤', label: '장갑' }, { pic: '🩱', label: '수영복' }], answer: 1 },
            { say: '가을이 되면 나뭇잎은 어떤 색으로 변할까요?', lang: 'ko', choices: [{ pic: '🔵', label: '파란색' }, { pic: '🟣', label: '보라색' }, { pic: '🍁', label: '빨간색, 노란색' }], answer: 2 },
            { say: '하얀 눈이 펑펑 내리는 계절은?', lang: 'ko', choices: [{ pic: '⛄', label: '겨울' }, { pic: '🏖️', label: '여름' }, { pic: '🌸', label: '봄' }], answer: 0 },
            { say: '나뭇잎이 우수수 떨어지는 계절은?', lang: 'ko', choices: [{ pic: '🌸', label: '봄' }, { pic: '🍂', label: '가을' }, { pic: '☀️', label: '여름' }], answer: 1 },
            { say: "가을 들판에서 노랗게 익는 곡식은?", lang: "ko", choices: [{ pic: "🌾", label: "벼" }, { pic: "🍉", label: "수박" }, { pic: "🍓", label: "딸기" }], answer: 0 },
            { say: "겨울에 할 수 있는 놀이는?", lang: "ko", choices: [{ pic: "⛄", label: "눈사람 만들기" }, { pic: "🏖️", label: "바다 수영" }, { pic: "🌸", label: "벚꽃 구경" }], answer: 0 },
            { say: "추운 겨울에 입는 옷은?", lang: "ko", choices: [{ pic: "🧥", label: "두꺼운 외투" }, { pic: "👕", label: "반팔 티셔츠" }, { pic: "🩱", label: "수영복" }], answer: 0 },
            { say: "빨갛고 노랗게 물든 나뭇잎을 무엇이라고 할까요?", lang: "ko", choices: [{ pic: "🍁", label: "단풍" }, { pic: "🌸", label: "꽃잎" }, { pic: "🌵", label: "선인장" }], answer: 0 },
            { say: "가을 밤송이 안에 들어 있는 열매는?", lang: "ko", choices: [{ pic: "🌰", label: "밤" }, { pic: "🍌", label: "바나나" }, { pic: "🍍", label: "파인애플" }], answer: 0 },
          ],
        },
        {
          id: 'sci2', title: '보통 · 겨울잠과 따뜻하게',
          friend: { pic: '🐿️', name: '겨울잠 다람쥐', desc: '겨울 내내 쿨쿨 자고 봄에 깨어나는 다람쥐예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '겨울잠을 자는 동물은? 하나만 골라요.', lang: 'ko', choices: [{ pic: '🐶', label: '강아지' }, { pic: '🐔', label: '닭' }, { pic: '🐻', label: '곰' }], answer: 2 },
            { say: '이 중에서 겨울잠을 자는 동물은?', lang: 'ko', choices: [{ pic: '🐸', label: '개구리' }, { pic: '🐱', label: '고양이' }, { pic: '🐮', label: '소' }], answer: 0 },
            { say: '겨울에 몸을 따뜻하게 하는 방법은?', lang: 'ko', choices: [{ pic: '🪟', label: '창문을 활짝 열어요' }, { pic: '🧣', label: '목도리를 둘러요' }, { pic: '🧊', label: '얼음을 먹어요' }], answer: 1 },
            { say: '겨울잠을 자는 동물들은 왜 겨울에 잠을 잘까요?', lang: 'ko', choices: [{ pic: '❄️', label: '춥고 먹이가 없어서' }, { pic: '🎮', label: '놀기 싫어서' }, { pic: '🌞', label: '너무 더워서' }], answer: 0 },
            { say: '겨울이 지나고 다람쥐가 잠에서 깨어나는 계절은?', lang: 'ko', choices: [{ pic: '🍂', label: '가을' }, { pic: '⛄', label: '겨울' }, { pic: '🌸', label: '봄' }], answer: 2 },
            { say: "이 중에서 겨울잠을 자는 동물은?", lang: "ko", choices: [{ pic: "🐍", label: "뱀" }, { pic: "🐶", label: "강아지" }, { pic: "🐔", label: "닭" }], answer: 0 },
            { say: "고슴도치, 소, 말 중에서 겨울잠을 자는 동물은?", lang: "ko", choices: [{ pic: "🦔", label: "고슴도치" }, { pic: "🐮", label: "소" }, { pic: "🐴", label: "말" }], answer: 0 },
            { say: "겨울잠을 자기 전에 동물들은 무엇을 할까요?", lang: "ko", choices: [{ pic: "🍖", label: "먹이를 많이 먹어 둬요" }, { pic: "✂️", label: "털을 다 깎아요" }, { pic: "🏊", label: "수영을 해요" }], answer: 0 },
            { say: "추운 날 집 안에서 따뜻하게 지내는 방법은?", lang: "ko", choices: [{ pic: "🧦", label: "내복과 양말을 신어요" }, { pic: "🧊", label: "찬물로 씻어요" }, { pic: "🪟", label: "창문을 열어 둬요" }], answer: 0 },
            { say: "겨울에 감기에 걸리지 않으려면?", lang: "ko", choices: [{ pic: "🧼", label: "손을 깨끗이 씻어요" }, { pic: "🍦", label: "아이스크림만 먹어요" }, { pic: "🩳", label: "반바지만 입어요" }], answer: 0 },
          ],
        },
        {
          id: 'sci3', title: '어려움 · 과학 상식',
          friend: { pic: '🐬', name: '궁금 돌고래', desc: '왜 그럴까? 늘 궁금한 게 많은 돌고래예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '물을 아주 차가운 냉동실에 넣어 두면 무엇으로 변할까요?', lang: 'ko', choices: [{ pic: '💨', label: '수증기' }, { pic: '🧊', label: '얼음' }, { pic: '🏖️', label: '모래' }], answer: 1 },
            { say: '식물이 자라는 데 필요하지 않은 것은?', lang: 'ko', choices: [{ pic: '☀️', label: '햇빛' }, { pic: '💧', label: '물' }, { pic: '🍬', label: '사탕' }], answer: 2 },
            { say: '자석에 붙는 것은?', lang: 'ko', choices: [{ pic: '📎', label: '철 클립' }, { pic: '🧽', label: '스펀지' }, { pic: '🥢', label: '나무젓가락' }], answer: 0 },
            { say: '물을 끓이면 위로 피어오르는 것은?', lang: 'ko', choices: [{ pic: '🧊', label: '얼음' }, { pic: '♨️', label: '수증기' }, { pic: '🪨', label: '돌' }], answer: 1 },
            { say: '우리 몸에서 소리를 듣는 곳은?', lang: 'ko', choices: [{ pic: '👂', label: '귀' }, { pic: '👃', label: '코' }, { pic: '👄', label: '입' }], answer: 0 },
            { say: "아침에 해가 떠오르는 쪽은?", lang: "ko", choices: [{ pic: "🌅", label: "동쪽" }, { pic: "🌇", label: "서쪽" }, { pic: "🧭", label: "북쪽" }], answer: 0 },
            { say: "물에 둥둥 뜨는 것은?", lang: "ko", choices: [{ pic: "🪵", label: "나무 조각" }, { pic: "🪨", label: "돌멩이" }, { pic: "🔩", label: "쇠못" }], answer: 0 },
            { say: "무지개는 몇 가지 색일까요?", lang: "ko", choices: [{ pic: "🌈", label: "7가지" }, { pic: "🌈", label: "3가지" }, { pic: "🌈", label: "10가지" }], answer: 0 },
            { say: "우리 몸에서 맛을 느끼는 곳은?", lang: "ko", choices: [{ pic: "👅", label: "혀" }, { pic: "👂", label: "귀" }, { pic: "👁️", label: "눈" }], answer: 0 },
            { say: "그림자가 생기려면 무엇이 필요할까요?", lang: "ko", choices: [{ pic: "💡", label: "빛" }, { pic: "🔊", label: "소리" }, { pic: "👃", label: "냄새" }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'shape', name: '도형·공간', icon: '🔷',
      units: [
        {
          id: 'shape1', title: '쉬움 · 여러 가지 모양',
          friend: { pic: '🦀', name: '세모 꽃게', desc: '집게발로 세모, 네모, 동그라미를 척척 만드는 꽃게예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '세모 모양은 어느 것일까요?', lang: 'ko', choices: [{ pic: '🔺', label: '세모' }, { pic: '🟦', label: '네모' }, { pic: '⚪', label: '동그라미' }], answer: 0 },
            { say: '데굴데굴 잘 굴러가는 것은?', lang: 'ko', choices: [{ pic: '🎲', label: '주사위' }, { pic: '⚽', label: '공' }, { pic: '📦', label: '상자' }], answer: 1 },
            { say: '네모 모양 물건은?', lang: 'ko', choices: [{ pic: '🍩', label: '도넛' }, { pic: '🍕', label: '피자 한 조각' }, { pic: '📺', label: '텔레비전' }], answer: 2 },
            { say: '다음에 올 모양은? 동그라미, 세모, 동그라미, 세모, 그다음은?', lang: 'ko', choices: [{ pic: '⚪', label: '동그라미' }, { pic: '🔺', label: '세모' }, { pic: '🟦', label: '네모' }], answer: 0 },
            { say: '뾰족한 곳이 하나도 없는 모양은?', lang: 'ko', choices: [{ pic: '🔺', label: '세모' }, { pic: '⚪', label: '동그라미' }, { pic: '🟦', label: '네모' }], answer: 1 },
            { say: "동그라미 모양 물건은?", lang: "ko", choices: [{ pic: "🍩", label: "도넛" }, { pic: "📺", label: "텔레비전" }, { pic: "📐", label: "삼각자" }], answer: 0 },
            { say: "세모 모양 물건은?", lang: "ko", choices: [{ pic: "📐", label: "삼각자" }, { pic: "⚽", label: "공" }, { pic: "📕", label: "책" }], answer: 0 },
            { say: "차곡차곡 높이 쌓기 좋은 것은?", lang: "ko", choices: [{ pic: "📦", label: "상자" }, { pic: "⚽", label: "공" }, { pic: "🥚", label: "달걀" }], answer: 0 },
            { say: "다음에 올 모양은? 네모, 네모, 동그라미, 네모, 네모, 그다음은?", lang: "ko", choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🟦", label: "네모" }, { pic: "🔺", label: "세모" }], answer: 0 },
            { say: "뾰족한 곳이 3개인 모양은?", lang: "ko", choices: [{ pic: "🔺", label: "세모" }, { pic: "🟦", label: "네모" }, { pic: "⚪", label: "동그라미" }], answer: 0 },
          ],
        },
        {
          id: 'shape2', title: '보통 · 변과 꼭짓점, 규칙',
          friend: { pic: '🐝', name: '육각 꿀벌', desc: '변이 6개인 육각형 집을 짓는 꿀벌이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '삼각형의 변은 몇 개일까요?', lang: 'ko', choices: [{ pic: '🔺', label: '4개' }, { pic: '🔺', label: '3개' }, { pic: '🔺', label: '5개' }], answer: 1 },
            { say: '사각형의 꼭짓점은 몇 개일까요?', lang: 'ko', choices: [{ pic: '🟦', label: '4개' }, { pic: '🟦', label: '3개' }, { pic: '🟦', label: '6개' }], answer: 0 },
            { say: '꿀벌 집처럼 변이 6개인 도형의 이름은?', lang: 'ko', choices: [{ pic: '⬠', label: '오각형' }, { pic: '⬜', label: '사각형' }, { pic: '⬡', label: '육각형' }], answer: 2 },
            { say: '규칙을 찾아요. 빨강, 파랑, 파랑, 빨강, 파랑, 파랑, 그다음은?', lang: 'ko', choices: [{ pic: '🔴', label: '빨강' }, { pic: '🔵', label: '파랑' }, { pic: '🟡', label: '노랑' }], answer: 0 },
            { say: '네모난 색종이를 뾰족한 곳끼리 맞춰 반으로 접으면 어떤 모양이 될까요?', lang: 'ko', choices: [{ pic: '🟦', label: '네모' }, { pic: '🔺', label: '세모' }, { pic: '⚪', label: '동그라미' }], answer: 1 },
            { say: "변이 5개인 도형의 이름은?", lang: "ko", choices: [{ pic: "✏️", label: "오각형" }, { pic: "✏️", label: "사각형" }, { pic: "✏️", label: "육각형" }], answer: 0 },
            { say: "원(동그라미)의 꼭짓점은 몇 개일까요?", lang: "ko", choices: [{ pic: "⚪", label: "0개" }, { pic: "⚪", label: "1개" }, { pic: "⚪", label: "4개" }], answer: 0 },
            { say: "삼각형 2개를 긴 변끼리 붙이면 어떤 모양이 될까요?", lang: "ko", choices: [{ pic: "🟦", label: "사각형" }, { pic: "⚪", label: "원" }, { pic: "⭐", label: "별" }], answer: 0 },
            { say: "수 규칙을 찾아요. 1, 3, 5, 7, 그다음은?", lang: "ko", choices: [{ pic: "🔢", label: "9" }, { pic: "🔢", label: "8" }, { pic: "🔢", label: "10" }], answer: 0 },
            { say: "사각형의 변은 몇 개일까요?", lang: "ko", choices: [{ pic: "🟦", label: "4개" }, { pic: "🟦", label: "3개" }, { pic: "🟦", label: "5개" }], answer: 0 },
          ],
        },
        {
          id: 'shape3', title: '어려움 · 직접 돌리고 뒤집기',
          gen: 'puzzle', // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: '🦎', name: '빙글 카멜레온', desc: '머릿속에서 모양을 빙글빙글 돌려 보는 카멜레온이에요.' }, // 마스터하면 만나는 도감 친구
          // type: 'puzzle' = 직접 움직이는 문제. shape는 logic.js의 SHAPES(L, flag, F), rot는 0/90/180/270, flip은 좌우 뒤집기
          questions: [
            { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: 'L', start: { rot: 0, flip: false }, goal: { rot: 90, flip: false } },
            { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: 'flag', start: { rot: 0, flip: false }, goal: { rot: 180, flip: false } },
            { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: 'L', start: { rot: 0, flip: false }, goal: { rot: 0, flip: true } },
            { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: 'F', start: { rot: 0, flip: false }, goal: { rot: 270, flip: false } },
            { type: 'puzzle', say: '그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.', lang: 'ko', shape: 'F', start: { rot: 0, flip: false }, goal: { rot: 90, flip: true } },
          ],
        },
      ],
    },
  ],
};

if (typeof module !== 'undefined') module.exports = CONTENT;
