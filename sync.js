// 돌봄 기관 실시간 공유 (Firebase). 설정값이 없거나 인터넷이 없으면 SYNC.ok = false → 기능 숨김
const SYNC = (() => {
  const c = window.FIREBASE_CONFIG;
  if (typeof firebase === 'undefined' || !c || !c.apiKey) return { ok: false };
  firebase.initializeApp(c);
  return { ok: true, auth: firebase.auth(), db: firebase.firestore() };
})();

// 어르신 기기: 익명 로그인 (이름·전화번호 없이 기기마다 번호 하나)
function syncUser() {
  return SYNC.auth.currentUser ? Promise.resolve(SYNC.auth.currentUser) : SYNC.auth.signInAnonymously().then((r) => r.user);
}

// 최근 14일 건강 체크 + 쿠폰만 올림 (두뇌 운동 기록은 안 올림)
function syncPush(st, today) {
  if (!SYNC.ok || !st.share) return Promise.resolve();
  const days = {};
  for (let i = 0; i < 14; i++) {
    const k = addDays(today, -i);
    if (st.days[k]) days[k] = st.days[k];
  }
  return syncUser()
    .then((u) => SYNC.db.collection('seniors').doc(u.uid).set({
      who: st.who, days, coupons: st.coupons || [], updated: firebase.firestore.FieldValue.serverTimestamp(),
    }))
    .catch((e) => console.warn('실시간 공유 실패', e)); // 인터넷이 끊겨도 앱은 그대로 씀
}

// 공유를 끄면 서버에 올린 기록을 지움
function syncDelete() {
  if (!SYNC.ok) return Promise.resolve();
  return syncUser().then((u) => SYNC.db.collection('seniors').doc(u.uid).delete()).catch((e) => console.warn(e));
}
