# Firebase 실시간 공유 설정

## 1. 프로젝트 만들기 (직접)
1. https://console.firebase.google.com 접속 → 프로젝트 추가 (이름 예: brain-tamagotchi). 애널리틱스는 꺼도 됨.
2. 프로젝트 홈 → 웹 앱 추가(</> 아이콘) → 앱 이름 입력 → 등록. 호스팅 설정은 안 함.
3. 화면에 나오는 `firebaseConfig`의 `apiKey`, `authDomain`, `projectId`, `appId` 4개를 `firebase-config.js`에 넣음.

## 2. 로그인 방법 켜기
빌드 → Authentication → 시작하기 → 로그인 방법:
- **익명** 사용 설정 (어르신 기기용, 이름·전화번호 없이 기기마다 번호 하나)
- **이메일/비밀번호** 사용 설정 (담당자용)
- 사용자 탭 → 사용자 추가 → 담당자 이메일과 비밀번호 만들기

## 3. 데이터베이스 만들기
빌드 → Firestore Database → 데이터베이스 만들기 → 위치 `asia-northeast3 (서울)` → **프로덕션 모드**.

## 4. 보안 규칙 (중요)
Firestore → 규칙 탭에 아래를 붙여 넣고 `담당자@이메일`을 2단계에서 만든 담당자 이메일로 바꾼 뒤 게시.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /seniors/{uid} {
      // 어르신은 자기 기록만 쓰고 지울 수 있음
      allow write: if request.auth != null && request.auth.uid == uid;
      // 읽기는 본인과 담당자만
      allow read: if request.auth != null
        && (request.auth.uid == uid || request.auth.token.email in ['담당자@이메일']);
    }
  }
}
```

## 5. 승인된 도메인
Authentication → 설정 → 승인된 도메인에 `rrt-2.github.io` 추가 (`localhost`는 기본으로 있음).

## 올라가는 정보
- 어르신이 기록 보기 화면에서 "돌봄 기관과 실시간으로 공유하기"를 켰을 때만.
- 호칭(예: 순자 할머니), 최근 14일 건강 체크, 받은 쿠폰. 두뇌 운동 기록은 안 올라감.
- 끄면 서버에서 지움.
