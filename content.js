// 팀원 수정용 파일: 과목, 단원, 문제
// 글자만 바꾸면 됨. 따옴표, 쉼표, 괄호는 지우지 말 것.
// answer = 정답 보기 번호 (첫 번째 보기가 0). 화면에서는 보기 순서가 섞여서 나옴.
// lang = 읽어줄 목소리 ('en' 영어, 'ko' 한국어)
// 단원 문제가 5개보다 많으면 풀 때마다 5개를 골라 냄 → 문제를 많이 넣을수록 매번 달라짐
// 수정 후 `node --test` 실행해서 통과하는지 확인.
const CONTENT = {
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
            { say: "속담을 완성해 보세요. 가랑비에 ○ 젖는 줄 모른다.", lang: 'ko', choices: [{ pic: "🌧️", label: "옷" }, { pic: "🌧️", label: "신" }, { pic: "🌧️", label: "발" }], answer: 0 },
            { say: "속담을 완성해 보세요. 말 한마디로 ○ 냥 빚도 갚는다.", lang: 'ko', choices: [{ pic: "💬", label: "천" }, { pic: "💬", label: "한" }, { pic: "💬", label: "열" }], answer: 0 },
            { say: "속담을 완성해 보세요. 고래 싸움에 ○○ 등 터진다.", lang: 'ko', choices: [{ pic: "🐋", label: "새우" }, { pic: "🐋", label: "상어" }, { pic: "🐋", label: "문어" }], answer: 0 },
            { say: "속담을 완성해 보세요. 아니 땐 굴뚝에 ○○ 날까.", lang: 'ko', choices: [{ pic: "🏠", label: "연기" }, { pic: "🏠", label: "바람" }, { pic: "🏠", label: "소리" }], answer: 0 },
            { say: "속담을 완성해 보세요. 우물 안 ○○○.", lang: 'ko', choices: [{ pic: "🐸", label: "개구리" }, { pic: "🐸", label: "두꺼비" }, { pic: "🐸", label: "물고기" }], answer: 0 },
            { say: "속담을 완성해 보세요. 누워서 ○ 먹기.", lang: 'ko', choices: [{ pic: "🛌", label: "떡" }, { pic: "🛌", label: "밥" }, { pic: "🛌", label: "죽" }], answer: 0 },
            { say: "속담을 완성해 보세요. 가재는 ○ 편이다.", lang: 'ko', choices: [{ pic: "🦀", label: "게" }, { pic: "🦀", label: "새우" }, { pic: "🦀", label: "소라" }], answer: 0 },
            { say: "속담을 완성해 보세요. 사공이 많으면 배가 ○으로 간다.", lang: 'ko', choices: [{ pic: "⛵", label: "산" }, { pic: "⛵", label: "강" }, { pic: "⛵", label: "들" }], answer: 0 },
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
            { say: "\"맑다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌤️", label: "흐리다" }, { pic: "🌤️", label: "밝다" }, { pic: "🌤️", label: "곱다" }], answer: 0 },
            { say: "\"깊다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌊", label: "얕다" }, { pic: "🌊", label: "넓다" }, { pic: "🌊", label: "짧다" }], answer: 0 },
            { say: "\"이기다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🏆", label: "지다" }, { pic: "🏆", label: "놀다" }, { pic: "🏆", label: "쉬다" }], answer: 0 },
            { say: "\"얻다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🎁", label: "잃다" }, { pic: "🎁", label: "닦다" }, { pic: "🎁", label: "쓰다" }], answer: 0 },
            { say: "\"부지런하다\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🐜", label: "게으르다" }, { pic: "🐜", label: "튼튼하다" }, { pic: "🐜", label: "착하다" }], answer: 0 },
            { say: "\"만남\"의 반대말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🤝", label: "헤어짐" }, { pic: "🤝", label: "기다림" }, { pic: "🤝", label: "약속" }], answer: 0 },
            { say: "\"튼튼하다\"와 뜻이 비슷한 말은 무엇일까요?", lang: 'ko', choices: [{ pic: "💪", label: "건강하다" }, { pic: "💪", label: "약하다" }, { pic: "💪", label: "느리다" }], answer: 0 },
            { say: "\"고요하다\"와 뜻이 비슷한 말은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌙", label: "조용하다" }, { pic: "🌙", label: "시끄럽다" }, { pic: "🌙", label: "어지럽다" }], answer: 0 },
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
            { say: "순자 씨는 아침 7시에 일어나 30분 동안 걸었어요. 그리고 8시에 아침을 먹었어요. 순자 씨가 걸은 시간은 얼마일까요?", lang: 'ko', choices: [{ pic: "🚶", label: "30분" }, { pic: "🚶", label: "7분" }, { pic: "🚶", label: "8분" }], answer: 0 },
            { say: "감기에 걸린 할아버지는 병원에서 약을 받아 하루 세 번 드세요. 하루에 약을 몇 번 드실까요?", lang: 'ko', choices: [{ pic: "💊", label: "세 번" }, { pic: "💊", label: "한 번" }, { pic: "💊", label: "두 번" }], answer: 0 },
            { say: "봄에 영수 씨는 마당에 상추를 심었어요. 한 달 뒤 상추를 따서 이웃과 나누었어요. 영수 씨가 심은 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🥬", label: "상추" }, { pic: "🥬", label: "고추" }, { pic: "🥬", label: "배추" }], answer: 0 },
            { say: "비가 와서 시장에 가지 않고 집에서 책을 읽었어요. 오늘 하루를 보낸 곳은 어디일까요?", lang: 'ko', choices: [{ pic: "📖", label: "집" }, { pic: "📖", label: "시장" }, { pic: "📖", label: "공원" }], answer: 0 },
            { say: "보건소 안내문에 \"매주 화요일 혈압 무료 측정\"이라고 쓰여 있어요. 혈압을 재는 데 드는 돈은 얼마일까요?", lang: 'ko', choices: [{ pic: "🩺", label: "무료" }, { pic: "🩺", label: "천 원" }, { pic: "🩺", label: "만 원" }], answer: 0 },
            { say: "지하철 경로 우대는 만 65세 이상이 받을 수 있어요. 만 70세 어르신은 받을 수 있을까요?", lang: 'ko', choices: [{ pic: "🚇", label: "받을 수 있어요" }, { pic: "🚇", label: "받을 수 없어요" }, { pic: "🚇", label: "알 수 없어요" }], answer: 0 },
            { say: "딸은 김치를, 아들은 과일을, 손자는 꽃을 들고 왔어요. 과일을 들고 온 사람은 누구일까요?", lang: 'ko', choices: [{ pic: "🍎", label: "아들" }, { pic: "🍎", label: "딸" }, { pic: "🍎", label: "손자" }], answer: 0 },
            { say: "노래 교실은 2층에, 바둑 교실은 3층에, 식당은 1층에 있어요. 바둑 교실은 몇 층일까요?", lang: 'ko', choices: [{ pic: "🏢", label: "3층" }, { pic: "🏢", label: "2층" }, { pic: "🏢", label: "1층" }], answer: 0 },
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
          id: "sci1", title: "쉬움 · 절기와 명절",
          friend: { pic: "🦔", name: "도토리 고슴도치", desc: "철마다 먹을거리를 챙기는 부지런한 고슴도치예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "설날 아침에 어른께 드리는 인사를 무엇이라고 할까요?", lang: 'ko', choices: [{ pic: "🎎", label: "세배" }, { pic: "🎎", label: "성묘" }, { pic: "🎎", label: "차례" }], answer: 0 },
            { say: "추석은 음력으로 며칠일까요?", lang: 'ko', choices: [{ pic: "🌕", label: "8월 15일" }, { pic: "🌕", label: "1월 15일" }, { pic: "🌕", label: "5월 5일" }], answer: 0 },
            { say: "한 해 중 낮이 가장 짧은 날은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌑", label: "동지" }, { pic: "🌑", label: "하지" }, { pic: "🌑", label: "춘분" }], answer: 0 },
            { say: "단오에 창포물에 머리를 감는 풍습이 있어요. 단오는 음력 며칠일까요?", lang: 'ko', choices: [{ pic: "🌿", label: "5월 5일" }, { pic: "🌿", label: "3월 3일" }, { pic: "🌿", label: "7월 7일" }], answer: 0 },
            { say: "음력 1월 15일은 무슨 날일까요?", lang: 'ko', choices: [{ pic: "🌕", label: "정월 대보름" }, { pic: "🌕", label: "한식" }, { pic: "🌕", label: "칠석" }], answer: 0 },
            { say: "입춘은 어느 계절이 시작되는 날일까요?", lang: 'ko', choices: [{ pic: "🌱", label: "봄" }, { pic: "🌱", label: "여름" }, { pic: "🌱", label: "가을" }], answer: 0 },
            { say: "음력 7월 7일 칠석에 하늘에서 만난다는 두 사람은 누구일까요?", lang: 'ko', choices: [{ pic: "✨", label: "견우와 직녀" }, { pic: "✨", label: "흥부와 놀부" }, { pic: "✨", label: "콩쥐와 팥쥐" }], answer: 0 },
            { say: "정월 대보름 아침에 귀가 밝아지라고 마시는 술은 무엇일까요?", lang: 'ko', choices: [{ pic: "🍶", label: "귀밝이술" }, { pic: "🍶", label: "동동주" }, { pic: "🍶", label: "과하주" }], answer: 0 },
            { say: "음력 12월의 마지막 날 밤을 무엇이라고 할까요?", lang: 'ko', choices: [{ pic: "🌃", label: "섣달그믐" }, { pic: "🌃", label: "동지" }, { pic: "🌃", label: "입춘" }], answer: 0 },
            { say: "고희(古稀)는 흔히 몇 살을 이르는 말일까요?", lang: 'ko', choices: [{ pic: "🎂", label: "일흔 살" }, { pic: "🎂", label: "예순 살" }, { pic: "🎂", label: "여든 살" }], answer: 0 },
            { say: "설날은 음력으로 며칠일까요?", lang: 'ko', choices: [{ pic: "🎍", label: "1월 1일" }, { pic: "🎍", label: "1월 15일" }, { pic: "🎍", label: "8월 15일" }], answer: 0 },
            { say: "추석의 다른 이름은 무엇일까요?", lang: 'ko', choices: [{ pic: "🌕", label: "한가위" }, { pic: "🌕", label: "단오" }, { pic: "🌕", label: "동지" }], answer: 0 },
            { say: "추석 아침에 조상께 지내는 제사를 무엇이라고 할까요?", lang: 'ko', choices: [{ pic: "🍎", label: "차례" }, { pic: "🍎", label: "세배" }, { pic: "🍎", label: "고사" }], answer: 0 },
            { say: "한식에는 주로 무엇을 하는 풍습이 있을까요?", lang: 'ko', choices: [{ pic: "🌿", label: "성묘" }, { pic: "🌿", label: "김장" }, { pic: "🌿", label: "모내기" }], answer: 0 },
            { say: "하지는 어떤 날일까요?", lang: 'ko', choices: [{ pic: "☀️", label: "낮이 가장 긴 날" }, { pic: "☀️", label: "낮이 가장 짧은 날" }, { pic: "☀️", label: "밤낮이 같은 날" }], answer: 0 },
            { say: "춘분과 추분에는 무엇이 거의 같아질까요?", lang: 'ko', choices: [{ pic: "⚖️", label: "낮과 밤의 길이" }, { pic: "⚖️", label: "기온과 습도" }, { pic: "⚖️", label: "비와 눈의 양" }], answer: 0 },
            { say: "삼복 가운데 가장 먼저 오는 날은 무엇일까요?", lang: 'ko', choices: [{ pic: "🍗", label: "초복" }, { pic: "🍗", label: "중복" }, { pic: "🍗", label: "말복" }], answer: 0 },
            { say: "겨울 김치를 땅에 묻어 두는 큰 항아리를 무엇이라고 할까요?", lang: 'ko', choices: [{ pic: "🏺", label: "김칫독" }, { pic: "🏺", label: "쌀독" }, { pic: "🏺", label: "물동이" }], answer: 0 },
          ],
        },
        {
          id: "sci2", title: "보통 · 건강 상식",
          friend: { pic: "🐿️", name: "튼튼 다람쥐", desc: "매일 부지런히 움직여서 튼튼한 다람쥐예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "혈압약을 먹는 중에 몸이 괜찮아졌어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "💊", label: "의사와 상의하기 전에는 끊지 않아요" }, { pic: "💊", label: "괜찮으니 바로 끊어요" }, { pic: "💊", label: "양을 절반으로 줄여요" }], answer: 0 },
            { say: "누웠다가 일어날 때 어지럽지 않으려면 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🛏️", label: "잠시 앉았다가 천천히 일어나요" }, { pic: "🛏️", label: "벌떡 일어나요" }, { pic: "🛏️", label: "눈을 감고 바로 걸어요" }], answer: 0 },
            { say: "물은 어떻게 마시는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "💧", label: "나눠서 조금씩 자주 마셔요" }, { pic: "💧", label: "아침에 한꺼번에 마셔요" }, { pic: "💧", label: "목마를 때만 마셔요" }], answer: 0 },
            { say: "집 안에서 넘어져 다치지 않으려면 가장 먼저 무엇을 치울까요?", lang: 'ko', choices: [{ pic: "🏠", label: "바닥의 전선과 걸리는 물건" }, { pic: "🏠", label: "냉장고" }, { pic: "🏠", label: "옷장" }], answer: 0 },
            { say: "갑자기 얼굴 한쪽이 처지고 말이 어눌해져요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚑", label: "바로 119를 불러요" }, { pic: "🚑", label: "자고 일어나서 지켜봐요" }, { pic: "🚑", label: "내일 병원에 가요" }], answer: 0 },
            { say: "약 먹는 것을 잊지 않으려면 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🗓️", label: "요일별 약통에 담아 두어요" }, { pic: "🗓️", label: "기억만 믿어요" }, { pic: "🗓️", label: "아플 때만 먹어요" }], answer: 0 },
            { say: "무더운 여름날 야외 활동은 언제 하는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "☀️", label: "이른 아침이나 해 질 무렵" }, { pic: "☀️", label: "한낮" }, { pic: "☀️", label: "정오부터 오후 세 시" }], answer: 0 },
            { say: "걷기 운동은 어떻게 하는 것이 몸에 좋을까요?", lang: 'ko', choices: [{ pic: "🚶", label: "하루 30분쯤 꾸준히" }, { pic: "🚶", label: "일주일에 한 번 몰아서" }, { pic: "🚶", label: "숨이 끊어질 때까지" }], answer: 0 },
            { say: "독감 예방접종은 보통 언제 맞는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "💉", label: "가을, 유행하기 전" }, { pic: "💉", label: "한여름" }, { pic: "💉", label: "늦은 봄" }], answer: 0 },
            { say: "짜게 먹는 습관은 어떤 병의 위험을 높일까요?", lang: 'ko', choices: [{ pic: "🧂", label: "고혈압" }, { pic: "🧂", label: "난청" }, { pic: "🧂", label: "충치" }], answer: 0 },
            { say: "아침 식사는 어떻게 하는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "🍚", label: "거르지 않고 가볍게라도 먹어요" }, { pic: "🍚", label: "거르고 점심에 몰아 먹어요" }, { pic: "🍚", label: "커피만 마셔요" }], answer: 0 },
            { say: "머리를 쓰는 활동으로 알맞은 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🧩", label: "책 읽기와 퍼즐" }, { pic: "🧩", label: "하루 종일 누워 있기" }, { pic: "🧩", label: "말을 하지 않기" }], answer: 0 },
            { say: "넘어진 뒤 엉덩이가 심하게 아파요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚑", label: "억지로 일어나지 말고 119나 가족에게 연락해요" }, { pic: "🚑", label: "바로 일어나 걸어 봐요" }, { pic: "🚑", label: "파스만 붙이고 참아요" }], answer: 0 },
            { say: "목욕할 때 물 온도는 어떻게 하는 것이 좋을까요?", lang: 'ko', choices: [{ pic: "🛁", label: "너무 뜨겁지 않은 따뜻한 물" }, { pic: "🛁", label: "아주 뜨거운 물" }, { pic: "🛁", label: "찬물" }], answer: 0 },
            { say: "햇볕이 강한 날 외출할 때 챙기면 좋은 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "👒", label: "챙이 넓은 모자" }, { pic: "👒", label: "두꺼운 털장갑" }, { pic: "👒", label: "털목도리" }], answer: 0 },
            { say: "뼈 건강에 도움이 되는 음식은 무엇일까요?", lang: 'ko', choices: [{ pic: "🥛", label: "우유와 멸치" }, { pic: "🥛", label: "라면과 과자" }, { pic: "🥛", label: "탄산음료" }], answer: 0 },
            { say: "감기에 걸렸을 때 주변 사람을 위해 어떻게 할까요?", lang: 'ko', choices: [{ pic: "😷", label: "마스크를 쓰고 손을 자주 씻어요" }, { pic: "😷", label: "악수하며 인사해요" }, { pic: "😷", label: "입을 가리지 않고 기침해요" }], answer: 0 },
            { say: "글씨가 잘 안 보이기 시작했어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "👓", label: "안과에서 시력 검사를 받아요" }, { pic: "👓", label: "남의 안경을 빌려 써요" }, { pic: "👓", label: "그냥 참고 지내요" }], answer: 0 },
          ],
        },
        {
          id: "sci3", title: "어려움 · 안전과 사기 예방",
          friend: { pic: "🐬", name: "꼼꼼 돌고래", desc: "수상한 전화는 꼭 다시 확인하는 꼼꼼한 돌고래예요." }, // 마스터하면 만나는 도감 친구
          questions: [
            { say: "모르는 번호로 \"엄마, 폰이 고장 나서 문자해. 돈 좀 보내 줘\"라는 문자가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📱", label: "자녀에게 직접 전화해 확인해요" }, { pic: "📱", label: "바로 돈을 보내요" }, { pic: "📱", label: "문자 속 주소를 눌러요" }], answer: 0 },
            { say: "\"경찰입니다. 통장이 범죄에 쓰였으니 돈을 옮기세요\"라는 전화가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📵", label: "끊고 112나 가족에게 확인해요" }, { pic: "📵", label: "시키는 대로 돈을 옮겨요" }, { pic: "📵", label: "비밀번호를 알려 줘요" }], answer: 0 },
            { say: "\"택배 주소 확인\"이라며 인터넷 주소가 담긴 문자가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📦", label: "누르지 않고 지워요" }, { pic: "📦", label: "바로 눌러 봐요" }, { pic: "📦", label: "주민번호를 적어 보내요" }], answer: 0 },
            { say: "은행 직원이라며 전화로 문자 인증번호를 불러 달라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🏦", label: "절대 알려 주지 않아요" }, { pic: "🏦", label: "천천히 불러 줘요" }, { pic: "🏦", label: "문자로 사진을 찍어 보내요" }], answer: 0 },
            { say: "전화에 속아 돈을 보내 버렸어요. 가장 먼저 무엇을 할까요?", lang: 'ko', choices: [{ pic: "🚨", label: "바로 112나 은행에 신고해 지급정지를 요청해요" }, { pic: "🚨", label: "며칠 기다려 봐요" }, { pic: "🚨", label: "상대에게 다시 전화해 돌려 달라고 해요" }], answer: 0 },
            { say: "집 안에서 가스 냄새가 나요. 가장 먼저 무엇을 할까요?", lang: 'ko', choices: [{ pic: "🪟", label: "창문을 열고 밸브를 잠가요" }, { pic: "🪟", label: "불을 켜서 확인해요" }, { pic: "🪟", label: "전등 스위치를 켜요" }], answer: 0 },
            { say: "불이 나서 연기가 가득해요. 어떻게 대피할까요?", lang: 'ko', choices: [{ pic: "🔥", label: "젖은 수건으로 입을 막고 낮은 자세로 나가요" }, { pic: "🔥", label: "엘리베이터를 타요" }, { pic: "🔥", label: "허리를 펴고 연기 속을 뛰어가요" }], answer: 0 },
            { say: "집에 찾아온 방문 판매원이 건강식품을 공짜로 준다며 계약서를 내밀어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📄", label: "서명하지 않고 가족과 상의해요" }, { pic: "📄", label: "바로 서명해요" }, { pic: "📄", label: "신분증을 복사해 줘요" }], answer: 0 },
            { say: "외출할 때 가스와 전기는 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🔒", label: "가스 밸브를 잠그고 확인해요" }, { pic: "🔒", label: "가스불을 켜 둬요" }, { pic: "🔒", label: "확인하지 않아요" }], answer: 0 },
            { say: "\"싸게 대출해 준다\"며 먼저 수수료를 보내라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚫", label: "거절하고 가족과 상의해요" }, { pic: "🚫", label: "수수료를 보내요" }, { pic: "🚫", label: "신분증 사진을 보내요" }], answer: 0 },
            { say: "메신저로 친구가 갑자기 돈을 빌려 달라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "💬", label: "친구에게 직접 전화해 확인해요" }, { pic: "💬", label: "바로 돈을 보내요" }, { pic: "💬", label: "내 계좌 비밀번호를 알려 줘요" }], answer: 0 },
            { say: "상담원이라며 휴대폰에 앱을 깔라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "📲", label: "깔지 않고 전화를 끊어요" }, { pic: "📲", label: "시키는 대로 깔아요" }, { pic: "📲", label: "화면을 보여 줘요" }], answer: 0 },
            { say: "\"건강보험료를 돌려준다\"며 주소를 누르라는 문자가 왔어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "✉️", label: "누르지 않고 공단에 직접 확인해요" }, { pic: "✉️", label: "바로 눌러요" }, { pic: "✉️", label: "통장 번호를 보내요" }], answer: 0 },
            { say: "공짜 여행을 시켜 준다며 버스에 타라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚌", label: "타지 않고 가족과 상의해요" }, { pic: "🚌", label: "바로 타요" }, { pic: "🚌", label: "집 주소를 알려 줘요" }], answer: 0 },
            { say: "점검원이라며 현관문을 열어 달라고 해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🚪", label: "관리실에 먼저 확인하고 열어요" }, { pic: "🚪", label: "바로 열어 줘요" }, { pic: "🚪", label: "돈을 먼저 줘요" }], answer: 0 },
            { say: "통장 비밀번호로 알맞은 것은 무엇일까요?", lang: 'ko', choices: [{ pic: "🔢", label: "생일이나 전화번호가 아닌 숫자" }, { pic: "🔢", label: "내 생일" }, { pic: "🔢", label: "1234" }], answer: 0 },
            { say: "카드를 잃어버렸어요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "💳", label: "바로 카드사에 분실 신고를 해요" }, { pic: "💳", label: "며칠 기다려 봐요" }, { pic: "💳", label: "찾을 때까지 그냥 둬요" }], answer: 0 },
            { say: "인터넷에서 \"오늘만 90% 할인\"이라며 결제를 재촉해요. 어떻게 할까요?", lang: 'ko', choices: [{ pic: "🛒", label: "의심하고 가족에게 먼저 물어봐요" }, { pic: "🛒", label: "바로 결제해요" }, { pic: "🛒", label: "카드 번호를 모두 적어 보내요" }], answer: 0 },
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
            { say: "규칙을 찾아보세요. (동그라미, 세모) (동그라미, 세모) 그다음에 올 모양은 무엇일까요?", lang: 'ko', choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🔺", label: "세모" }, { pic: "🟦", label: "네모" }], answer: 0 },
            { say: "규칙을 찾아보세요. (네모, 네모, 동그라미) (네모, 네모, ?) 물음표에 올 모양은 무엇일까요?", lang: 'ko', choices: [{ pic: "⚪", label: "동그라미" }, { pic: "🟦", label: "네모" }, { pic: "🔺", label: "세모" }], answer: 0 },
            { say: "규칙을 찾아보세요. (빨강, 파랑, 파랑) (빨강, 파랑, 파랑) 그다음에 올 색은 무엇일까요?", lang: 'ko', choices: [{ pic: "🔴", label: "빨강" }, { pic: "🔵", label: "파랑" }, { pic: "🟡", label: "노랑" }], answer: 0 },
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
