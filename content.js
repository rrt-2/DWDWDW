// 팀원 수정용 파일: 과목, 단원, 문제
// 글자만 바꾸면 됨. 따옴표, 쉼표, 괄호는 지우지 말 것.
// answer = 정답 보기 번호 (첫 번째 보기가 0). 화면에서는 보기 순서가 섞여서 나옴.
// lang = 읽어줄 목소리 ('en' 영어, 'ko' 한국어)
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
  ],
};

if (typeof module !== 'undefined') module.exports = CONTENT;
