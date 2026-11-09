// 팀원 수정용 파일: 과목, 단원, 문제
// 글자만 바꾸면 됨. 따옴표, 쉼표, 괄호는 지우지 말 것.
// answer = 정답 보기 번호 (첫 번째 보기가 0). 화면에서는 보기 순서가 섞여서 나옴.
// lang = 읽어줄 목소리 ('en' 영어, 'ko' 한국어)
// 단원 문제가 5개보다 많으면 풀 때마다 5개를 골라 냄 → 문제를 많이 넣을수록 매번 달라짐
// 수정 후 `node --test` 실행해서 통과하는지 확인.
const CONTENT = {
  // 캐릭터 그림 파일이 없을 때 대신 보여줄 이모지
  petEmoji: { egg: '🥚', baby: '🐣', child: '🐥', adult: '🐔' },

  subjects: [
    {
      id: 'en', name: '영어', icon: '🔤',
      units: [
        {
          id: 'en1', title: '동물',
          friend: { pic: '🦊', name: '꼬리별 여우', desc: '영어로 동물 이름을 척척 말하는 여우예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: 'Which one is a cat?', lang: 'en', choices: [{ pic: '🐶', label: 'dog' }, { pic: '🐱', label: 'cat' }, { pic: '🐰', label: 'rabbit' }], answer: 1 },
            { say: 'Which one is a dog?', lang: 'en', choices: [{ pic: '🐷', label: 'pig' }, { pic: '🐶', label: 'dog' }, { pic: '🐮', label: 'cow' }], answer: 1 },
            { say: 'Which one is a rabbit?', lang: 'en', choices: [{ pic: '🐰', label: 'rabbit' }, { pic: '🐻', label: 'bear' }, { pic: '🐸', label: 'frog' }], answer: 0 },
            { say: 'Which one is a bird?', lang: 'en', choices: [{ pic: '🐟', label: 'fish' }, { pic: '🐦', label: 'bird' }, { pic: '🐱', label: 'cat' }], answer: 1 },
            { say: 'Which one is a fish?', lang: 'en', choices: [{ pic: '🐟', label: 'fish' }, { pic: '🐵', label: 'monkey' }, { pic: '🐶', label: 'dog' }], answer: 0 },
          ],
        },
        {
          id: 'en2', title: '색깔',
          friend: { pic: '🦜', name: '무지개 앵무', desc: '알록달록 색깔 이름을 노래하는 앵무새예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: 'Which one is red?', lang: 'en', choices: [{ pic: '🔴', label: 'red' }, { pic: '🔵', label: 'blue' }, { pic: '🟡', label: 'yellow' }], answer: 0 },
            { say: 'Which one is blue?', lang: 'en', choices: [{ pic: '🟢', label: 'green' }, { pic: '🔵', label: 'blue' }, { pic: '🔴', label: 'red' }], answer: 1 },
            { say: 'Which one is yellow?', lang: 'en', choices: [{ pic: '🟣', label: 'purple' }, { pic: '🔴', label: 'red' }, { pic: '🟡', label: 'yellow' }], answer: 2 },
            { say: 'Which one is green?', lang: 'en', choices: [{ pic: '🟢', label: 'green' }, { pic: '🟠', label: 'orange' }, { pic: '🔵', label: 'blue' }], answer: 0 },
            { say: 'Which one is black?', lang: 'en', choices: [{ pic: '⚪', label: 'white' }, { pic: '⚫', label: 'black' }, { pic: '🟡', label: 'yellow' }], answer: 1 },
          ],
        },
        {
          id: 'en3', title: '과일',
          friend: { pic: '🐒', name: '바나나 원숭이', desc: '과일이라면 뭐든 좋아하는 원숭이예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: 'Which one is an apple?', lang: 'en', choices: [{ pic: '🍎', label: 'apple' }, { pic: '🍌', label: 'banana' }, { pic: '🍇', label: 'grapes' }], answer: 0 },
            { say: 'Which one is a banana?', lang: 'en', choices: [{ pic: '🍓', label: 'strawberry' }, { pic: '🍌', label: 'banana' }, { pic: '🍊', label: 'orange' }], answer: 1 },
            { say: 'Which one is grapes?', lang: 'en', choices: [{ pic: '🍉', label: 'watermelon' }, { pic: '🍎', label: 'apple' }, { pic: '🍇', label: 'grapes' }], answer: 2 },
            { say: 'Which one is a strawberry?', lang: 'en', choices: [{ pic: '🍓', label: 'strawberry' }, { pic: '🍑', label: 'peach' }, { pic: '🍌', label: 'banana' }], answer: 0 },
            { say: 'Which one is a watermelon?', lang: 'en', choices: [{ pic: '🍊', label: 'orange' }, { pic: '🍉', label: 'watermelon' }, { pic: '🍎', label: 'apple' }], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'life', name: '바른 생활', icon: '🌱',
      units: [
        {
          id: 'life1', title: '인사',
          friend: { pic: '🐧', name: '꾸벅 펭귄', desc: '만날 때마다 꾸벅 인사하는 펭귄이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '아침에 선생님을 만났어요. 뭐라고 할까요?', lang: 'ko', choices: [{ pic: '🙇', label: '안녕하세요!' }, { pic: '🙈', label: '모른 척해요' }, { pic: '😝', label: '메롱' }], answer: 0 },
            { say: '친구가 선물을 줬어요. 뭐라고 할까요?', lang: 'ko', choices: [{ pic: '😒', label: '이거 싫어' }, { pic: '🙏', label: '고마워!' }, { pic: '🤐', label: '아무 말 안 해요' }], answer: 1 },
            { say: '실수로 친구 발을 밟았어요. 뭐라고 할까요?', lang: 'ko', choices: [{ pic: '😛', label: '웃어요' }, { pic: '🏃', label: '도망가요' }, { pic: '🙇', label: '미안해!' }], answer: 2 },
            { say: '학교에서 집에 왔어요. 부모님께 뭐라고 할까요?', lang: 'ko', choices: [{ pic: '👋', label: '다녀왔습니다!' }, { pic: '📺', label: '바로 TV를 켜요' }, { pic: '🚪', label: '문을 쾅 닫아요' }], answer: 0 },
            { say: '밥 먹기 전에 뭐라고 할까요?', lang: 'ko', choices: [{ pic: '😴', label: '졸려요' }, { pic: '🍚', label: '잘 먹겠습니다!' }, { pic: '🙅', label: '안 먹어요' }], answer: 1 },
          ],
        },
        {
          id: 'life2', title: '양보와 배려',
          friend: { pic: '🐻', name: '포근 곰', desc: '친구가 슬프면 꼭 안아 주는 곰이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '친구가 넘어졌어요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🚶', label: '그냥 지나가요' }, { pic: '🤝', label: '일으켜 줘요' }, { pic: '😂', label: '웃어요' }], answer: 1 },
            { say: '버스에 할머니가 타셨어요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '💺', label: '자리를 양보해요' }, { pic: '📱', label: '게임만 해요' }, { pic: '🙈', label: '못 본 척해요' }], answer: 0 },
            { say: '그네를 타고 싶은 친구가 기다려요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '😤', label: '혼자 계속 타요' }, { pic: '⏱️', label: '차례대로 타요' }, { pic: '👊', label: '친구를 밀어요' }], answer: 1 },
            { say: '친구가 울고 있어요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🤗', label: '괜찮아? 물어봐요' }, { pic: '😝', label: '놀려요' }, { pic: '🙉', label: '모른 척해요' }], answer: 0 },
            { say: '짝꿍이 지우개를 안 가져왔어요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🙅', label: '안 빌려줘요' }, { pic: '🫣', label: '지우개를 숨겨요' }, { pic: '🤝', label: '같이 써요' }], answer: 2 },
          ],
        },
        {
          id: 'life3', title: '정리 정돈',
          friend: { pic: '🦝', name: '반짝 너구리', desc: '방을 반짝반짝 정리하는 너구리예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '다 논 장난감은 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🧸', label: '제자리에 정리해요' }, { pic: '🌪️', label: '바닥에 그냥 둬요' }, { pic: '🛏️', label: '침대 밑에 숨겨요' }], answer: 0 },
            { say: '다 먹은 과자 봉지는 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🌳', label: '길에 버려요' }, { pic: '🗑️', label: '쓰레기통에 버려요' }, { pic: '🛋️', label: '소파 밑에 넣어요' }], answer: 1 },
            { say: '벗은 신발은 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🦶', label: '아무렇게나 벗어 둬요' }, { pic: '🪟', label: '창밖으로 던져요' }, { pic: '👟', label: '가지런히 놓아요' }], answer: 2 },
            { say: '책가방은 언제 챙길까요?', lang: 'ko', choices: [{ pic: '🌙', label: '전날 밤에 미리' }, { pic: '⏰', label: '지각하기 직전에' }, { pic: '🙅', label: '안 챙겨요' }], answer: 0 },
            { say: '다 먹은 밥그릇은 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🛏️', label: '방에 둬요' }, { pic: '🍽️', label: '싱크대에 갖다 놓아요' }, { pic: '🙈', label: '식탁에 그냥 둬요' }], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'town', name: '우리 동네', icon: '🏘️',
      units: [
        {
          id: 'town1', title: '직업',
          friend: { pic: '🦉', name: '척척 부엉이', desc: '동네 사람들의 직업을 다 아는 부엉이예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '아픈 사람을 치료해 주는 사람은 누구일까요?', lang: 'ko', choices: [{ pic: '🧑‍⚕️', label: '의사' }, { pic: '🧑‍🍳', label: '요리사' }, { pic: '🧑‍🚒', label: '소방관' }], answer: 0 },
            { say: '불을 꺼 주는 사람은 누구일까요?', lang: 'ko', choices: [{ pic: '👮', label: '경찰관' }, { pic: '🧑‍🚒', label: '소방관' }, { pic: '🧑‍🌾', label: '농부' }], answer: 1 },
            { say: '맛있는 음식을 만드는 사람은 누구일까요?', lang: 'ko', choices: [{ pic: '🧑‍🏫', label: '선생님' }, { pic: '🧑‍✈️', label: '조종사' }, { pic: '🧑‍🍳', label: '요리사' }], answer: 2 },
            { say: '학교에서 우리를 가르쳐 주시는 분은 누구일까요?', lang: 'ko', choices: [{ pic: '🧑‍🏫', label: '선생님' }, { pic: '🧑‍🔧', label: '정비사' }, { pic: '🧑‍⚕️', label: '의사' }], answer: 0 },
            { say: '비행기를 조종하는 사람은 누구일까요?', lang: 'ko', choices: [{ pic: '🚌', label: '버스 기사' }, { pic: '🧑‍✈️', label: '조종사' }, { pic: '🧑‍🍳', label: '요리사' }], answer: 1 },
          ],
        },
        {
          id: 'town2', title: '공공장소',
          friend: { pic: '🐰', name: '쉿쉿 토끼', desc: '도서관에서는 조용히! 예절 바른 토끼예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '책을 빌릴 수 있는 곳은 어디일까요?', lang: 'ko', choices: [{ pic: '📚', label: '도서관' }, { pic: '🏥', label: '병원' }, { pic: '🚒', label: '소방서' }], answer: 0 },
            { say: '몸이 아플 때 가는 곳은 어디일까요?', lang: 'ko', choices: [{ pic: '🏪', label: '편의점' }, { pic: '🏥', label: '병원' }, { pic: '🎢', label: '놀이공원' }], answer: 1 },
            { say: '도서관에서는 어떻게 할까요?', lang: 'ko', choices: [{ pic: '📢', label: '크게 노래해요' }, { pic: '🏃', label: '뛰어다녀요' }, { pic: '🤫', label: '조용히 해요' }], answer: 2 },
            { say: '편지를 보낼 수 있는 곳은 어디일까요?', lang: 'ko', choices: [{ pic: '📮', label: '우체국' }, { pic: '🏫', label: '학교' }, { pic: '🌳', label: '공원' }], answer: 0 },
            { say: '공원 꽃밭의 꽃은 어떻게 할까요?', lang: 'ko', choices: [{ pic: '✂️', label: '꺾어 가요' }, { pic: '🌸', label: '눈으로만 봐요' }, { pic: '👣', label: '밟고 지나가요' }], answer: 1 },
          ],
        },
        {
          id: 'town3', title: '교통 안전',
          friend: { pic: '🐢', name: '신호등 거북', desc: '초록불이 켜지면 천천히 건너는 거북이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '신호등이 빨간불이에요. 어떻게 할까요?', lang: 'ko', choices: [{ pic: '🛑', label: '멈춰요' }, { pic: '🏃', label: '뛰어서 건너요' }, { pic: '🙈', label: '눈 감고 건너요' }], answer: 0 },
            { say: '초록불이 켜졌어요. 어떻게 건널까요?', lang: 'ko', choices: [{ pic: '📱', label: '휴대폰 보며 건너요' }, { pic: '👀', label: '좌우를 살피고 건너요' }, { pic: '🏃', label: '막 뛰어가요' }], answer: 1 },
            { say: '길을 건널 때는 어디로 건널까요?', lang: 'ko', choices: [{ pic: '🚗', label: '찻길 아무 데나' }, { pic: '🚧', label: '공사장 옆' }, { pic: '🦓', label: '횡단보도' }], answer: 2 },
            { say: '차에 타면 제일 먼저 뭘 할까요?', lang: 'ko', choices: [{ pic: '🔒', label: '안전띠를 매요' }, { pic: '🤸', label: '의자 위에서 뛰어요' }, { pic: '🪟', label: '창밖으로 손을 내밀어요' }], answer: 0 },
            { say: '자전거를 탈 때 꼭 써야 하는 것은?', lang: 'ko', choices: [{ pic: '🕶️', label: '선글라스' }, { pic: '⛑️', label: '헬멧' }, { pic: '🎧', label: '헤드폰' }], answer: 1 },
          ],
        },
      ],
    },
    // ---- 활동지 기반 과목: 단원 순서 = 1학년 → 2학년 → 3학년 ----
    {
      id: 'ko', name: '국어', icon: '📖',
      units: [
        {
          id: 'ko1', title: '1학년 · 낱말과 띄어쓰기',
          friend: { pic: '🐼', name: '또박 판다', desc: '글씨를 또박또박 바르게 쓰는 판다예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '"가을 하늘이 높아요"를 바르게 띄어 쓴 것은?', lang: 'ko', choices: [{ pic: '✏️', label: '가을 하늘이 높아요' }, { pic: '✏️', label: '가을하늘이 높아요' }, { pic: '✏️', label: '가을 하늘이높아요' }], answer: 0 },
            { say: '빨갛고 동그란 과일, 바르게 쓴 낱말은?', lang: 'ko', choices: [{ pic: '🍎', label: '사가' }, { pic: '🍎', label: '사과' }, { pic: '🍎', label: '샤과' }], answer: 1 },
            { say: '우리가 매일 먹는 밥, 바르게 쓴 낱말은?', lang: 'ko', choices: [{ pic: '🍚', label: '밮' }, { pic: '🍚', label: '밯' }, { pic: '🍚', label: '밥' }], answer: 2 },
            { say: '친구에게 하는 말로 알맞은 것은? 같이 놀아서 ○○○!', lang: 'ko', choices: [{ pic: '😊', label: '좋았어' }, { pic: '😊', label: '좋았서' }, { pic: '😊', label: '조았어' }], answer: 0 },
            { say: '그림일기에 날씨를 써요. 해가 쨍쨍한 날은?', lang: 'ko', choices: [{ pic: '🌧️', label: '비' }, { pic: '☀️', label: '맑음' }, { pic: '❄️', label: '눈' }], answer: 1 },
          ],
        },
        {
          id: 'ko2', title: '2학년 · 받침과 문장',
          friend: { pic: '🐨', name: '받침 코알라', desc: '어려운 받침도 척척 아는 코알라예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '바르게 쓴 문장은?', lang: 'ko', choices: [{ pic: '✏️', label: '줄넘기를 했습니다' }, { pic: '✏️', label: '줄럼기를 했습니다' }, { pic: '✏️', label: '줄넘기를 햇습니다' }], answer: 0 },
            { say: '책을 소리 내어 봐요. 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '📚', label: '책을 일거요' }, { pic: '📚', label: '책을 읽어요' }, { pic: '📚', label: '책을 익어요' }], answer: 1 },
            { say: '의자에 몸을 붙여 쉬어요. 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '🪑', label: '안자요' }, { pic: '🪑', label: '않아요' }, { pic: '🪑', label: '앉아요' }], answer: 2 },
            { say: '빈칸에 알맞은 말은? 나는 겨울이 좋아요. 왜냐하면 눈사람을 만들 수 있기 ○○○○.', lang: 'ko', choices: [{ pic: '⛄', label: '때문이에요' }, { pic: '⛄', label: '그래서요' }, { pic: '⛄', label: '하지만요' }], answer: 0 },
            { say: '겨울에 처음 내리는 눈, 바르게 쓴 것은?', lang: 'ko', choices: [{ pic: '❄️', label: '첫는' }, { pic: '❄️', label: '천눈' }, { pic: '❄️', label: '첫눈' }], answer: 2 },
          ],
        },
        {
          id: 'ko3', title: '3학년 · 중심 문장 찾기',
          friend: { pic: '🦒', name: '쏙쏙 기린', desc: '긴 목으로 글의 중심을 쏙쏙 찾는 기린이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '중심 문장을 찾아요. 개미는 서로 도우며 살아요. 먹이를 찾으면 친구들에게 알려 줘요. 무거운 먹이는 여럿이 함께 옮겨요.', lang: 'ko', choices: [{ pic: '🐜', label: '개미는 서로 도우며 살아요.' }, { pic: '🐜', label: '먹이를 찾으면 친구들에게 알려 줘요.' }, { pic: '🐜', label: '무거운 먹이는 여럿이 함께 옮겨요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 물을 아껴 써야 해요. 이를 닦을 때 컵을 쓰면 물을 아낄 수 있어요. 샤워 시간을 줄이는 것도 좋은 방법이에요.', lang: 'ko', choices: [{ pic: '💧', label: '물을 아껴 써야 해요.' }, { pic: '💧', label: '이를 닦을 때 컵을 쓰면 물을 아낄 수 있어요.' }, { pic: '💧', label: '샤워 시간을 줄이는 것도 좋은 방법이에요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 아침을 먹으면 머리가 잘 돌아가요. 몸에 힘도 생겨요. 그래서 아침밥은 꼭 먹는 것이 좋아요.', lang: 'ko', choices: [{ pic: '🍳', label: '아침을 먹으면 머리가 잘 돌아가요.' }, { pic: '🍳', label: '몸에 힘도 생겨요.' }, { pic: '🍳', label: '그래서 아침밥은 꼭 먹는 것이 좋아요.' }], answer: 2 },
            { say: '중심 문장을 찾아요. 가을에는 볼거리가 많아요. 나뭇잎이 빨갛게 물들어요. 들판에는 벼가 노랗게 익어요.', lang: 'ko', choices: [{ pic: '🍁', label: '가을에는 볼거리가 많아요.' }, { pic: '🍁', label: '나뭇잎이 빨갛게 물들어요.' }, { pic: '🍁', label: '들판에는 벼가 노랗게 익어요.' }], answer: 0 },
            { say: '중심 문장을 찾아요. 줄넘기를 하면 다리가 튼튼해져요. 땀이 나서 몸도 상쾌해요. 줄넘기는 우리 몸에 좋은 운동이에요.', lang: 'ko', choices: [{ pic: '🏃', label: '줄넘기를 하면 다리가 튼튼해져요.' }, { pic: '🏃', label: '땀이 나서 몸도 상쾌해요.' }, { pic: '🏃', label: '줄넘기는 우리 몸에 좋은 운동이에요.' }], answer: 2 },
          ],
        },
      ],
    },
    {
      id: 'math', name: '수학', icon: '🔢',
      units: [
        {
          id: 'math1', title: '1학년 · 덧셈과 뺄셈',
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
          id: 'math2', title: '2학년 · 구구단과 길이',
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
          id: 'math3', title: '3학년 · 나눗셈과 분수',
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
      id: 'sci', name: '계절·과학', icon: '🔬',
      units: [
        {
          id: 'sci1', title: '1학년 · 가을과 겨울',
          friend: { pic: '🦔', name: '도토리 고슴도치', desc: '가을이면 도토리를 모으는 부지런한 고슴도치예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '가을에 숲에서 찾을 수 있는 열매는?', lang: 'ko', choices: [{ pic: '🌰', label: '도토리' }, { pic: '🍉', label: '수박' }, { pic: '🍓', label: '딸기' }], answer: 0 },
            { say: '추운 겨울에 손에 끼는 것은?', lang: 'ko', choices: [{ pic: '🕶️', label: '선글라스' }, { pic: '🧤', label: '장갑' }, { pic: '🩱', label: '수영복' }], answer: 1 },
            { say: '가을이 되면 나뭇잎은 어떤 색으로 변할까요?', lang: 'ko', choices: [{ pic: '🔵', label: '파란색' }, { pic: '🟣', label: '보라색' }, { pic: '🍁', label: '빨간색, 노란색' }], answer: 2 },
            { say: '하얀 눈이 펑펑 내리는 계절은?', lang: 'ko', choices: [{ pic: '⛄', label: '겨울' }, { pic: '🏖️', label: '여름' }, { pic: '🌸', label: '봄' }], answer: 0 },
            { say: '나뭇잎이 우수수 떨어지는 계절은?', lang: 'ko', choices: [{ pic: '🌸', label: '봄' }, { pic: '🍂', label: '가을' }, { pic: '☀️', label: '여름' }], answer: 1 },
          ],
        },
        {
          id: 'sci2', title: '2학년 · 겨울잠과 따뜻하게',
          friend: { pic: '🐿️', name: '겨울잠 다람쥐', desc: '겨울 내내 쿨쿨 자고 봄에 깨어나는 다람쥐예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '겨울잠을 자는 동물은? 하나만 골라요.', lang: 'ko', choices: [{ pic: '🐶', label: '강아지' }, { pic: '🐔', label: '닭' }, { pic: '🐻', label: '곰' }], answer: 2 },
            { say: '이 중에서 겨울잠을 자는 동물은?', lang: 'ko', choices: [{ pic: '🐸', label: '개구리' }, { pic: '🐱', label: '고양이' }, { pic: '🐮', label: '소' }], answer: 0 },
            { say: '겨울에 몸을 따뜻하게 하는 방법은?', lang: 'ko', choices: [{ pic: '🪟', label: '창문을 활짝 열어요' }, { pic: '🧣', label: '목도리를 둘러요' }, { pic: '🧊', label: '얼음을 먹어요' }], answer: 1 },
            { say: '겨울잠을 자는 동물들은 왜 겨울에 잠을 잘까요?', lang: 'ko', choices: [{ pic: '❄️', label: '춥고 먹이가 없어서' }, { pic: '🎮', label: '놀기 싫어서' }, { pic: '🌞', label: '너무 더워서' }], answer: 0 },
            { say: '겨울이 지나고 다람쥐가 잠에서 깨어나는 계절은?', lang: 'ko', choices: [{ pic: '🍂', label: '가을' }, { pic: '⛄', label: '겨울' }, { pic: '🌸', label: '봄' }], answer: 2 },
          ],
        },
        {
          id: 'sci3', title: '3학년 · 과학 상식',
          friend: { pic: '🐬', name: '궁금 돌고래', desc: '왜 그럴까? 늘 궁금한 게 많은 돌고래예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '물을 아주 차가운 냉동실에 넣어 두면 무엇으로 변할까요?', lang: 'ko', choices: [{ pic: '💨', label: '수증기' }, { pic: '🧊', label: '얼음' }, { pic: '🏖️', label: '모래' }], answer: 1 },
            { say: '식물이 자라는 데 필요하지 않은 것은?', lang: 'ko', choices: [{ pic: '☀️', label: '햇빛' }, { pic: '💧', label: '물' }, { pic: '🍬', label: '사탕' }], answer: 2 },
            { say: '자석에 붙는 것은?', lang: 'ko', choices: [{ pic: '📎', label: '철 클립' }, { pic: '🧽', label: '스펀지' }, { pic: '🥢', label: '나무젓가락' }], answer: 0 },
            { say: '물을 끓이면 위로 피어오르는 것은?', lang: 'ko', choices: [{ pic: '🧊', label: '얼음' }, { pic: '♨️', label: '수증기' }, { pic: '🪨', label: '돌' }], answer: 1 },
            { say: '우리 몸에서 소리를 듣는 곳은?', lang: 'ko', choices: [{ pic: '👂', label: '귀' }, { pic: '👃', label: '코' }, { pic: '👄', label: '입' }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'shape', name: '도형·공간', icon: '🔷',
      units: [
        {
          id: 'shape1', title: '1학년 · 여러 가지 모양',
          friend: { pic: '🦀', name: '세모 꽃게', desc: '집게발로 세모, 네모, 동그라미를 척척 만드는 꽃게예요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '세모 모양은 어느 것일까요?', lang: 'ko', choices: [{ pic: '🔺', label: '세모' }, { pic: '🟦', label: '네모' }, { pic: '⚪', label: '동그라미' }], answer: 0 },
            { say: '데굴데굴 잘 굴러가는 것은?', lang: 'ko', choices: [{ pic: '🎲', label: '주사위' }, { pic: '⚽', label: '공' }, { pic: '📦', label: '상자' }], answer: 1 },
            { say: '네모 모양 물건은?', lang: 'ko', choices: [{ pic: '🍩', label: '도넛' }, { pic: '🍕', label: '피자 한 조각' }, { pic: '📺', label: '텔레비전' }], answer: 2 },
            { say: '다음에 올 모양은? 동그라미, 세모, 동그라미, 세모, 그다음은?', lang: 'ko', choices: [{ pic: '⚪', label: '동그라미' }, { pic: '🔺', label: '세모' }, { pic: '🟦', label: '네모' }], answer: 0 },
            { say: '뾰족한 곳이 하나도 없는 모양은?', lang: 'ko', choices: [{ pic: '🔺', label: '세모' }, { pic: '⚪', label: '동그라미' }, { pic: '🟦', label: '네모' }], answer: 1 },
          ],
        },
        {
          id: 'shape2', title: '2학년 · 변과 꼭짓점, 규칙',
          friend: { pic: '🐝', name: '육각 꿀벌', desc: '변이 6개인 육각형 집을 짓는 꿀벌이에요.' }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: '삼각형의 변은 몇 개일까요?', lang: 'ko', choices: [{ pic: '🔺', label: '4개' }, { pic: '🔺', label: '3개' }, { pic: '🔺', label: '5개' }], answer: 1 },
            { say: '사각형의 꼭짓점은 몇 개일까요?', lang: 'ko', choices: [{ pic: '🟦', label: '4개' }, { pic: '🟦', label: '3개' }, { pic: '🟦', label: '6개' }], answer: 0 },
            { say: '꿀벌 집처럼 변이 6개인 도형의 이름은?', lang: 'ko', choices: [{ pic: '⬠', label: '오각형' }, { pic: '⬜', label: '사각형' }, { pic: '⬡', label: '육각형' }], answer: 2 },
            { say: '규칙을 찾아요. 빨강, 파랑, 파랑, 빨강, 파랑, 파랑, 그다음은?', lang: 'ko', choices: [{ pic: '🔴', label: '빨강' }, { pic: '🔵', label: '파랑' }, { pic: '🟡', label: '노랑' }], answer: 0 },
            { say: '네모난 색종이를 뾰족한 곳끼리 맞춰 반으로 접으면 어떤 모양이 될까요?', lang: 'ko', choices: [{ pic: '🟦', label: '네모' }, { pic: '🔺', label: '세모' }, { pic: '⚪', label: '동그라미' }], answer: 1 },
          ],
        },
        {
          id: 'shape3', title: '3학년 · 직접 돌리고 뒤집기',
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
