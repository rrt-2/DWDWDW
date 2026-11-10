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

  // ---- 두뇌 운동 (어르신 생활형): 단원 순서 = 쉬움 → 보통 → 어려움 ----
  subjects: [
    {
      id: "ko", name: "낱말", icon: "📖",
      units: [
        {
          id: "ko1", title: "쉬움 · 속담 완성하기",
          friend: { pic: "🐼", name: "또박 판다", desc: "속담을 또박또박 줄줄 외는 판다예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "속담을 완성해 보세요. 가는 말이 고와야 ○○ ○○ 곱다.", lang: 'ko', choices: [{ pic: "💬", label: "오는 말이" }, { pic: "💬", label: "가는 길이" }, { pic: "💬", label: "하는 일이" }], answer: 0 },
            { say: "속담을 완성해 보세요. 낮말은 새가 듣고 밤말은 ○가 듣는다.", lang: 'ko', choices: [{ pic: "🌙", label: "쥐" }, { pic: "🌙", label: "개" }, { pic: "🌙", label: "소" }], answer: 0 },
            { say: "속담을 완성해 보세요. 소 잃고 ○○○ 고친다.", lang: 'ko', choices: [{ pic: "🐂", label: "외양간" }, { pic: "🐂", label: "대문" }, { pic: "🐂", label: "우물" }], answer: 0 },
            { say: "속담을 완성해 보세요. 원숭이도 ○○에서 떨어진다.", lang: 'ko', choices: [{ pic: "🐒", label: "나무" }, { pic: "🐒", label: "지붕" }, { pic: "🐒", label: "바위" }], answer: 0 },
            { say: "속담을 완성해 보세요. 티끌 모아 ○○.", lang: 'ko', choices: [{ pic: "⛰️", label: "태산" }, { pic: "⛰️", label: "강물" }, { pic: "⛰️", label: "모래" }], answer: 0 },
            { say: "속담을 완성해 보세요. 백지장도 ○○○ 낫다.", lang: 'ko', choices: [{ pic: "📄", label: "맞들면" }, { pic: "📄", label: "찢으면" }, { pic: "📄", label: "접으면" }], answer: 0 },
            { say: "속담을 완성해 보세요. 세 살 버릇 ○○까지 간다.", lang: 'ko', choices: [{ pic: "👶", label: "여든" }, { pic: "👶", label: "열 살" }, { pic: "👶", label: "스물" }], answer: 0 },
            { say: "속담을 완성해 보세요. 돌다리도 ○○○ 보고 건너라.", lang: 'ko', choices: [{ pic: "🌉", label: "두들겨" }, { pic: "🌉", label: "뛰어" }, { pic: "🌉", label: "세어" }], answer: 0 },
            { say: "속담을 완성해 보세요. 등잔 밑이 ○○○.", lang: 'ko', choices: [{ pic: "🪔", label: "어둡다" }, { pic: "🪔", label: "밝다" }, { pic: "🪔", label: "뜨겁다" }], answer: 0 },
            { say: "속담을 완성해 보세요. 호랑이도 제 말 하면 ○○.", lang: 'ko', choices: [{ pic: "🐯", label: "온다" }, { pic: "🐯", label: "간다" }, { pic: "🐯", label: "운다" }], answer: 0 },
          ],
        },
        {
          id: "ko2", title: "보통 · 반대말과 비슷한 말",
          friend: { pic: "🐨", name: "낱말 코알라", desc: "반대말도 비슷한 말도 척척 아는 코알라예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "\"높다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "⛰️", label: "낮다" }, { pic: "⛰️", label: "넓다" }, { pic: "⛰️", label: "길다" }], answer: 0 },
            { say: "\"덥다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "☀️", label: "춥다" }, { pic: "☀️", label: "맵다" }, { pic: "☀️", label: "밝다" }], answer: 0 },
            { say: "\"무겁다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🧳", label: "가볍다" }, { pic: "🧳", label: "두껍다" }, { pic: "🧳", label: "단단하다" }], answer: 0 },
            { say: "\"넓다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🏞️", label: "좁다" }, { pic: "🏞️", label: "짧다" }, { pic: "🏞️", label: "얕다" }], answer: 0 },
            { say: "\"기쁘다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "😊", label: "슬프다" }, { pic: "😊", label: "즐겁다" }, { pic: "😊", label: "반갑다" }], answer: 0 },
            { say: "\"시작\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🏁", label: "끝" }, { pic: "🏁", label: "처음" }, { pic: "🏁", label: "중간" }], answer: 0 },
            { say: "\"빠르다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🐢", label: "느리다" }, { pic: "🐢", label: "바쁘다" }, { pic: "🐢", label: "급하다" }], answer: 0 },
            { say: "\"걱정\"과 뜻이 비슷한 말은 무엇일까요?", lang: 'ko', choices: [{ pic: "💭", label: "근심" }, { pic: "💭", label: "기쁨" }, { pic: "💭", label: "자랑" }], answer: 0 },
            { say: "\"아름답다\"와 뜻이 비슷한 말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌸", label: "곱다" }, { pic: "🌸", label: "밉다" }, { pic: "🌸", label: "낡다" }], answer: 0 },
            { say: "\"기쁘다\"와 뜻이 비슷한 말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🎉", label: "즐겁다" }, { pic: "🎉", label: "서럽다" }, { pic: "🎉", label: "무섭다" }], answer: 0 },
          ],
        },
        {
          id: "ko3", title: "어려움 · 짧은 글 읽고 답하기",
          friend: { pic: "🦒", name: "쏙쏙 기린", desc: "글의 내용을 쏙쏙 기억하는 기린이에요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "영희 씨는 시장에서 사과 3개와 배 2개를 샀어요. 영희 씨가 산 배는 몇 개일까요?", lang: 'ko', choices: [{ pic: "🍐", label: "2개" }, { pic: "🍐", label: "3개" }, { pic: "🍐", label: "5개" }], answer: 0 },
            { say: "철수 씨는 아침에 약을 먹고, 점심에 산책을 하고, 저녁에 전화를 했어요. 점심에 한 일은 무엇일까요?", lang: 'ko', choices: [{ pic: "🚶", label: "산책" }, { pic: "🚶", label: "약 먹기" }, { pic: "🚶", label: "전화" }], answer: 0 },
            { say: "버스는 9시에 출발하고, 기차는 10시에 출발해요. 먼저 출발하는 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🚌", label: "버스" }, { pic: "🚌", label: "기차" }, { pic: "🚌", label: "같이 출발해요" }], answer: 0 },
            { say: "월요일에는 병원, 수요일에는 복지관, 금요일에는 시장에 가요. 복지관에 가는 날은 언제일까요?", lang: 'ko', choices: [{ pic: "📅", label: "수요일" }, { pic: "📅", label: "월요일" }, { pic: "📅", label: "금요일" }], answer: 0 },
            { say: "빨간 우산은 현관에, 파란 우산은 차 안에 있어요. 현관에 있는 우산은 무슨 색일까요?", lang: 'ko', choices: [{ pic: "☂️", label: "빨간색" }, { pic: "☂️", label: "파란색" }, { pic: "☂️", label: "노란색" }], answer: 0 },
            { say: "손자는 일곱 살이고 손녀는 다섯 살이에요. 누가 더 나이가 많을까요?", lang: 'ko', choices: [{ pic: "👦", label: "손자" }, { pic: "👦", label: "손녀" }, { pic: "👦", label: "나이가 같아요" }], answer: 0 },
            { say: "오늘 저녁 반찬은 된장찌개, 김치, 계란말이예요. 반찬에 없는 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🍲", label: "불고기" }, { pic: "🍲", label: "김치" }, { pic: "🍲", label: "계란말이" }], answer: 0 },
            { say: "약국은 은행 옆에 있고, 은행은 우체국 옆에 있어요. 약국 바로 옆에 있는 곳은 어디일까요?", lang: 'ko', choices: [{ pic: "💊", label: "은행" }, { pic: "💊", label: "우체국" }, { pic: "💊", label: "시장" }], answer: 0 },
            { say: "아들은 토요일에 오고, 딸은 일요일에 온다고 했어요. 토요일에 오는 사람은 누구일까요?", lang: 'ko', choices: [{ pic: "🏠", label: "아들" }, { pic: "🏠", label: "딸" }, { pic: "🏠", label: "손자" }], answer: 0 },
            { say: "오전에는 비가 오고 오후에는 날이 갠다고 해요. 우산이 필요한 때는 언제일까요?", lang: 'ko', choices: [{ pic: "🌧️", label: "오전" }, { pic: "🌧️", label: "오후" }, { pic: "🌧️", label: "밤" }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: "math", name: "셈하기", icon: "🔢",
      units: [
        {
          id: "math1", title: "쉬움 · 덧셈과 뺄셈",
          gen: "add", // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: "🐹", name: "셈셈 햄스터", desc: "해바라기씨를 세다가 셈 박사가 된 햄스터예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "천 원짜리 물건을 사고 오천 원을 냈어요. 거스름돈은 얼마일까요?", lang: 'ko', choices: [{ pic: "💰", label: "4,000원" }, { pic: "💰", label: "3,000원" }, { pic: "💰", label: "5,000원" }], answer: 0 },
            { say: "사과 3,000원어치와 두부 2,000원어치를 샀어요. 모두 얼마일까요?", lang: 'ko', choices: [{ pic: "🛒", label: "5,000원" }, { pic: "🛒", label: "6,000원" }, { pic: "🛒", label: "4,000원" }], answer: 0 },
            { say: "약이 30알 있었는데 7알을 먹었어요. 몇 알 남았을까요?", lang: 'ko', choices: [{ pic: "💊", label: "23알" }, { pic: "💊", label: "27알" }, { pic: "💊", label: "37알" }], answer: 0 },
            { say: "만 원을 들고 나가서 6,000원을 썼어요. 얼마가 남았을까요?", lang: 'ko', choices: [{ pic: "💰", label: "4,000원" }, { pic: "💰", label: "6,000원" }, { pic: "💰", label: "3,000원" }], answer: 0 },
            { say: "아침 8시에 약을 먹었어요. 6시간 뒤는 몇 시일까요?", lang: 'ko', choices: [{ pic: "⏰", label: "오후 2시" }, { pic: "⏰", label: "오후 4시" }, { pic: "⏰", label: "낮 12시" }], answer: 0 },
          ],
        },
        {
          id: "math2", title: "보통 · 곱셈과 장보기",
          gen: "mul", // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: "🐙", name: "구구 문어", desc: "다리 8개로 구구단을 외우는 문어예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "약을 하루에 3번 먹어요. 일주일 동안 몇 번 먹을까요?", lang: 'ko', choices: [{ pic: "💊", label: "21번" }, { pic: "💊", label: "10번" }, { pic: "💊", label: "24번" }], answer: 0 },
            { say: "귤이 한 봉지에 4개씩 들어 있어요. 5봉지면 모두 몇 개일까요?", lang: 'ko', choices: [{ pic: "🍊", label: "20개" }, { pic: "🍊", label: "9개" }, { pic: "🍊", label: "25개" }], answer: 0 },
            { say: "호떡이 한 개에 1,000원이에요. 6개를 사면 얼마일까요?", lang: 'ko', choices: [{ pic: "🥞", label: "6,000원" }, { pic: "🥞", label: "5,000원" }, { pic: "🥞", label: "7,000원" }], answer: 0 },
            { say: "한 줄에 6명씩 4줄로 섰어요. 모두 몇 명일까요?", lang: 'ko', choices: [{ pic: "🧍", label: "24명" }, { pic: "🧍", label: "10명" }, { pic: "🧍", label: "20명" }], answer: 0 },
            { say: "매일 30분씩 걸어요. 일주일이면 모두 몇 분일까요?", lang: 'ko', choices: [{ pic: "🚶", label: "210분" }, { pic: "🚶", label: "180분" }, { pic: "🚶", label: "300분" }], answer: 0 },
          ],
        },
        {
          id: "math3", title: "어려움 · 나눗셈과 나누기",
          gen: "div", // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: "🐳", name: "나눔 고래", desc: "무엇이든 똑같이 나눠 주는 마음 넉넉한 고래예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "밥값 12,000원을 세 사람이 똑같이 나눠 내요. 한 사람이 얼마씩 낼까요?", lang: 'ko', choices: [{ pic: "🍚", label: "4,000원" }, { pic: "🍚", label: "3,000원" }, { pic: "🍚", label: "6,000원" }], answer: 0 },
            { say: "약이 28알 있어요. 하루에 2알씩 먹으면 며칠 동안 먹을 수 있을까요?", lang: 'ko', choices: [{ pic: "💊", label: "14일" }, { pic: "💊", label: "7일" }, { pic: "💊", label: "26일" }], answer: 0 },
            { say: "떡 20개를 접시 5개에 똑같이 나눠 담아요. 한 접시에 몇 개씩일까요?", lang: 'ko', choices: [{ pic: "🍡", label: "4개" }, { pic: "🍡", label: "5개" }, { pic: "🍡", label: "15개" }], answer: 0 },
            { say: "피자를 똑같이 8조각으로 나눠 3조각을 먹었어요. 한 판의 얼마를 먹었을까요?", lang: 'ko', choices: [{ pic: "🍕", label: "8분의 3" }, { pic: "🍕", label: "3분의 8" }, { pic: "🍕", label: "5분의 3" }], answer: 0 },
            { say: "한 시간의 절반은 몇 분일까요?", lang: 'ko', choices: [{ pic: "⏰", label: "30분" }, { pic: "⏰", label: "50분" }, { pic: "⏰", label: "15분" }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: "sci", name: "생활 상식", icon: "🏡",
      units: [
        {
          id: "sci1", title: "쉬움 · 계절과 명절",
          friend: { pic: "🦔", name: "도토리 고슴도치", desc: "철마다 먹을거리를 챙기는 부지런한 고슴도치예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "설날 아침에 먹는 음식은 무엇일까요?", lang: 'ko', choices: [{ pic: "🍲", label: "떡국" }, { pic: "🥟", label: "송편" }, { pic: "🥣", label: "팥죽" }], answer: 0 },
            { say: "추석에 빚어 먹는 떡은 무엇일까요?", lang: 'ko', choices: [{ pic: "🥟", label: "송편" }, { pic: "🍲", label: "떡국" }, { pic: "🍡", label: "경단" }], answer: 0 },
            { say: "동짓날에 쑤어 먹는 음식은 무엇일까요?", lang: 'ko', choices: [{ pic: "🥣", label: "팥죽" }, { pic: "🍜", label: "냉면" }, { pic: "🍉", label: "수박화채" }], answer: 0 },
            { say: "김장은 주로 언제 할까요?", lang: 'ko', choices: [{ pic: "🥬", label: "늦가을에서 초겨울" }, { pic: "🌸", label: "봄" }, { pic: "☀️", label: "한여름" }], answer: 0 },
            { say: "복날에 많이 먹는 음식은 무엇일까요?", lang: 'ko', choices: [{ pic: "🍗", label: "삼계탕" }, { pic: "🥣", label: "팥죽" }, { pic: "🍲", label: "떡국" }], answer: 0 },
            { say: "정월 대보름에 깨물어 먹는 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🥜", label: "부럼(호두, 땅콩)" }, { pic: "🍉", label: "수박" }, { pic: "🍧", label: "빙수" }], answer: 0 },
            { say: "벼를 거두는 계절은 언제일까요?", lang: 'ko', choices: [{ pic: "🌾", label: "가을" }, { pic: "🌸", label: "봄" }, { pic: "⛄", label: "겨울" }], answer: 0 },
            { say: "개나리와 진달래가 피는 계절은 언제일까요?", lang: 'ko', choices: [{ pic: "🌸", label: "봄" }, { pic: "🍂", label: "가을" }, { pic: "⛄", label: "겨울" }], answer: 0 },
            { say: "한 해의 마지막 달은 몇 월일까요?", lang: 'ko', choices: [{ pic: "📅", label: "12월" }, { pic: "📅", label: "1월" }, { pic: "📅", label: "10월" }], answer: 0 },
            { say: "나뭇잎이 붉게 물드는 것을 무엇이라고 할까요?", lang: 'ko', choices: [{ pic: "🍁", label: "단풍" }, { pic: "🌸", label: "꽃샘" }, { pic: "❄️", label: "서리" }], answer: 0 },
          ],
        },
        {
          id: "sci2", title: "보통 · 건강한 하루",
          friend: { pic: "🐿️", name: "튼튼 다람쥐", desc: "매일 부지런히 움직여서 튼튼한 다람쥐예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "욕실 바닥이 미끄러워요. 넘어지지 않으려면 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🛁", label: "미끄럼 방지 매트를 깔아요" }, { pic: "🏃", label: "빨리 걸어요" }, { pic: "🧦", label: "양말을 신고 들어가요" }], answer: 0 },
            { say: "무더운 여름날에는 어떻게 하는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "💧", label: "물을 자주 마셔요" }, { pic: "🌞", label: "한낮에 밭일을 해요" }, { pic: "🧥", label: "두꺼운 옷을 입어요" }], answer: 0 },
            { say: "약은 어떻게 먹는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "⏰", label: "정해진 때에 정해진 만큼" }, { pic: "💊", label: "생각날 때 한꺼번에" }, { pic: "🤝", label: "이웃 약을 나눠 먹어요" }], answer: 0 },
            { say: "밖에 나갔다 돌아오면 가장 먼저 무엇을 할까요?", lang: 'ko', choices: [{ pic: "🧼", label: "손을 씻어요" }, { pic: "🍪", label: "간식을 먹어요" }, { pic: "📺", label: "텔레비전을 켜요" }], answer: 0 },
            { say: "갑자기 가슴이 아프고 숨이 차요. 어디에 전화할까요?", lang: 'ko', choices: [{ pic: "🚑", label: "119" }, { pic: "📞", label: "114" }, { pic: "🏦", label: "은행" }], answer: 0 },
            { say: "밤에 화장실에 갈 때는 어떻게 할까요?", lang: 'ko', choices: [{ pic: "💡", label: "불을 켜고 천천히 가요" }, { pic: "🌑", label: "불을 끄고 서둘러 가요" }, { pic: "🏃", label: "뛰어가요" }], answer: 0 },
            { say: "추운 겨울에 외출할 때는 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🧣", label: "모자와 목도리로 따뜻하게" }, { pic: "👕", label: "얇게 입어요" }, { pic: "🩴", label: "슬리퍼를 신어요" }], answer: 0 },
            { say: "오래 앉아 있었어요. 무엇을 하면 좋을까요?", lang: 'ko', choices: [{ pic: "🤸", label: "일어나서 몸을 풀어요" }, { pic: "🛋️", label: "계속 앉아 있어요" }, { pic: "😴", label: "그대로 잠들어요" }], answer: 0 },
            { say: "병원에 갈 때 챙기면 좋은 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "📋", label: "먹고 있는 약 목록" }, { pic: "🧸", label: "장난감" }, { pic: "🎤", label: "마이크" }], answer: 0 },
            { say: "잠을 잘 자려면 자기 전에 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🌙", label: "불을 어둡게 하고 편히 쉬어요" }, { pic: "☕", label: "커피를 많이 마셔요" }, { pic: "📱", label: "휴대폰을 오래 봐요" }], answer: 0 },
          ],
        },
        {
          id: "sci3", title: "어려움 · 안전과 사기 예방",
          friend: { pic: "🐬", name: "꼼꼼 돌고래", desc: "수상한 전화는 꼭 다시 확인하는 꼼꼼한 돌고래예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "모르는 번호로 \"엄마, 나 폰 고장 났어. 돈 좀 보내 줘\"라는 문자가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📞", label: "자녀에게 직접 전화해 확인해요" }, { pic: "💸", label: "바로 돈을 보내요" }, { pic: "🔗", label: "문자 속 주소를 눌러요" }], answer: 0 },
            { say: "\"경찰입니다. 통장이 범죄에 쓰였으니 돈을 옮기세요\"라는 전화가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📵", label: "끊고 112나 가족에게 확인해요" }, { pic: "💸", label: "시키는 대로 돈을 옮겨요" }, { pic: "🔢", label: "비밀번호를 알려 줘요" }], answer: 0 },
            { say: "\"택배 주소 확인\"이라며 인터넷 주소가 담긴 문자가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚫", label: "누르지 않고 지워요" }, { pic: "🔗", label: "바로 눌러 봐요" }, { pic: "📝", label: "주민번호를 적어 보내요" }], answer: 0 },
            { say: "전화로 통장 비밀번호를 물어봐요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🤐", label: "절대 알려 주지 않아요" }, { pic: "🔢", label: "천천히 불러 줘요" }, { pic: "✉️", label: "문자로 보내 줘요" }], answer: 0 },
            { say: "사기를 당한 것 같아요. 어디에 신고할까요?", lang: 'ko', choices: [{ pic: "👮", label: "112" }, { pic: "📞", label: "114" }, { pic: "🍗", label: "치킨집" }], answer: 0 },
            { say: "집 안에서 가스 냄새가 나요. 가장 먼저 무엇을 할까요?", lang: 'ko', choices: [{ pic: "🪟", label: "창문을 열고 밸브를 잠가요" }, { pic: "🔥", label: "불을 켜서 확인해요" }, { pic: "💡", label: "전등 스위치를 켜요" }], answer: 0 },
            { say: "불이 났어요. 어디에 전화할까요?", lang: 'ko', choices: [{ pic: "🚒", label: "119" }, { pic: "👮", label: "112" }, { pic: "📞", label: "114" }], answer: 0 },
            { say: "낯선 사람이 공짜 선물을 준다며 따라오라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🙅", label: "따라가지 않아요" }, { pic: "🚶", label: "따라가요" }, { pic: "🏠", label: "집 주소를 알려 줘요" }], answer: 0 },
            { say: "외출할 때 가스와 전기는 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🔒", label: "가스 밸브를 잠그고 확인해요" }, { pic: "🔥", label: "가스불을 켜 둬요" }, { pic: "🤷", label: "확인하지 않아요" }], answer: 0 },
            { say: "\"싸게 대출해 준다\"며 먼저 수수료를 보내라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚫", label: "거절하고 가족과 상의해요" }, { pic: "💸", label: "수수료를 보내요" }, { pic: "🪪", label: "신분증 사진을 보내요" }], answer: 0 },
          ],
        },
      ],
    },
    {
      id: "shape", name: "도형·공간", icon: "🔷",
      units: [
        {
          id: "shape1", title: "쉬움 · 모양과 규칙",
          friend: { pic: "🦀", name: "세모 꽃게", desc: "집게발로 세모, 네모, 동그라미를 척척 만드는 꽃게예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "동전과 같은 모양은 어느 것일까요?", lang: 'ko', choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🔺", label: "세모" }, { pic: "🟦", label: "네모" }], answer: 0 },
            { say: "방문과 같은 모양은 어느 것일까요?", lang: 'ko', choices: [{ pic: "🟦", label: "네모" }, { pic: "⚪", label: "동그라미" }, { pic: "🔺", label: "세모" }], answer: 0 },
            { say: "삼각김밥과 같은 모양은 어느 것일까요?", lang: 'ko', choices: [{ pic: "🔺", label: "세모" }, { pic: "🟦", label: "네모" }, { pic: "⚪", label: "동그라미" }], answer: 0 },
            { say: "잘 굴러가는 물건은 어느 것일까요?", lang: 'ko', choices: [{ pic: "⚽", label: "공" }, { pic: "📦", label: "상자" }, { pic: "📕", label: "책" }], answer: 0 },
            { say: "규칙을 찾아보세요. 동그라미, 세모, 동그라미, 세모, 그다음은 무엇일까요?", lang: 'ko', choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🔺", label: "세모" }, { pic: "🟦", label: "네모" }], answer: 0 },
            { say: "규칙을 찾아보세요. 네모, 네모, 동그라미, 네모, 네모, 그다음은 무엇일까요?", lang: 'ko', choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🟦", label: "네모" }, { pic: "🔺", label: "세모" }], answer: 0 },
            { say: "규칙을 찾아보세요. 빨강, 파랑, 파랑, 빨강, 파랑, 파랑, 그다음은 무엇일까요?", lang: 'ko', choices: [{ pic: "🔴", label: "빨강" }, { pic: "🔵", label: "파랑" }, { pic: "🟡", label: "노랑" }], answer: 0 },
            { say: "규칙을 찾아보세요. 2, 4, 6, 8, 그다음 수는 무엇일까요?", lang: 'ko', choices: [{ pic: "🔢", label: "10" }, { pic: "🔢", label: "9" }, { pic: "🔢", label: "12" }], answer: 0 },
            { say: "네모의 뾰족한 모서리는 몇 개일까요?", lang: 'ko', choices: [{ pic: "🟦", label: "4개" }, { pic: "🟦", label: "3개" }, { pic: "🟦", label: "5개" }], answer: 0 },
            { say: "주사위의 면은 모두 몇 개일까요?", lang: 'ko', choices: [{ pic: "🎲", label: "6개" }, { pic: "🎲", label: "4개" }, { pic: "🎲", label: "8개" }], answer: 0 },
          ],
        },
        {
          id: "shape2", title: "보통 · 방향과 시계",
          friend: { pic: "🐝", name: "길잡이 꿀벌", desc: "동서남북 어디서든 집을 찾아오는 꿀벌이에요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "시계의 짧은 바늘이 3, 긴 바늘이 12를 가리켜요. 몇 시일까요?", lang: 'ko', choices: [{ pic: "🕒", label: "3시" }, { pic: "🕒", label: "12시" }, { pic: "🕒", label: "9시" }], answer: 0 },
            { say: "지금은 3시예요. 2시간 뒤는 몇 시일까요?", lang: 'ko', choices: [{ pic: "🕔", label: "5시" }, { pic: "🕔", label: "1시" }, { pic: "🕔", label: "6시" }], answer: 0 },
            { say: "시계의 긴 바늘이 6을 가리키면 몇 분일까요?", lang: 'ko', choices: [{ pic: "🕧", label: "30분" }, { pic: "🕧", label: "6분" }, { pic: "🕧", label: "60분" }], answer: 0 },
            { say: "지금은 9시 30분이에요. 30분 뒤는 몇 시일까요?", lang: 'ko', choices: [{ pic: "🕙", label: "10시" }, { pic: "🕙", label: "9시" }, { pic: "🕙", label: "11시" }], answer: 0 },
            { say: "한 시간은 몇 분일까요?", lang: 'ko', choices: [{ pic: "⏰", label: "60분" }, { pic: "⏰", label: "100분" }, { pic: "⏰", label: "30분" }], answer: 0 },
            { say: "북쪽을 보고 서서 오른쪽으로 돌면 어느 쪽을 보게 될까요?", lang: 'ko', choices: [{ pic: "➡️", label: "동쪽" }, { pic: "⬅️", label: "서쪽" }, { pic: "⬇️", label: "남쪽" }], answer: 0 },
            { say: "해가 지는 쪽은 어느 쪽일까요?", lang: 'ko', choices: [{ pic: "🌇", label: "서쪽" }, { pic: "🌅", label: "동쪽" }, { pic: "🧭", label: "북쪽" }], answer: 0 },
            { say: "지도에서 위쪽은 보통 어느 방향일까요?", lang: 'ko', choices: [{ pic: "⬆️", label: "북쪽" }, { pic: "⬇️", label: "남쪽" }, { pic: "➡️", label: "동쪽" }], answer: 0 },
            { say: "마주 보고 선 사람이 오른손을 들었어요. 내가 보기에는 어느 쪽 손이 올라갔을까요?", lang: 'ko', choices: [{ pic: "⬅️", label: "왼쪽" }, { pic: "➡️", label: "오른쪽" }, { pic: "🙌", label: "양쪽 다" }], answer: 0 },
            { say: "위쪽을 가리키는 화살표를 반 바퀴 돌리면 어느 쪽을 가리킬까요?", lang: 'ko', choices: [{ pic: "⬇️", label: "아래쪽" }, { pic: "➡️", label: "오른쪽" }, { pic: "⬆️", label: "위쪽" }], answer: 0 },
          ],
        },
        {
          id: "shape3", title: "어려움 · 직접 돌리고 뒤집기",
          gen: "puzzle", // 풀 때마다 새 문제를 만들어 아래 고정 문제와 섞음 (logic.js의 GENERATORS)
          friend: { pic: "🦎", name: "빙글 카멜레온", desc: "머릿속에서 모양을 빙글빙글 돌려 보는 카멜레온이에요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { type: 'puzzle', say: "그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.", lang: 'ko', shape: "L", start: { rot: 0, flip: false }, goal: { rot: 90, flip: false } },
            { type: 'puzzle', say: "그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.", lang: 'ko', shape: "flag", start: { rot: 0, flip: false }, goal: { rot: 180, flip: false } },
            { type: 'puzzle', say: "그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.", lang: 'ko', shape: "L", start: { rot: 0, flip: false }, goal: { rot: 0, flip: true } },
            { type: 'puzzle', say: "그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.", lang: 'ko', shape: "F", start: { rot: 0, flip: false }, goal: { rot: 270, flip: false } },
            { type: 'puzzle', say: "그림자에 꼭 맞게 돌리기와 뒤집기 버튼으로 모양을 움직여 보세요.", lang: 'ko', shape: "F", start: { rot: 0, flip: false }, goal: { rot: 90, flip: true } },
          ],
        },
      ],
    },
  ],
};

if (typeof module !== 'undefined') module.exports = CONTENT;
