(() => {
  // 10 kód
  const COUPONS = [
    "2ORKX72M9",
    "4N4ORK1KD",
    "7H3V6TORK",
    "37ORKW5YQ",
    "5M7SORKXN",
    "6R2K9ORKL",
    "2ORK3Q8HF",
    "3VORKA288",
    "4D1ORK4ZW",
    "6P6H8ORKS"
  ];

  // Kulcsok a tároláshoz (különböző kampányoknál változtasd meg)
  const STORAGE_KEY = "campaign_coupon_v1";
  const STORAGE_TS_KEY = "campaign_coupon_v1_ts";

  // Opcionális: lejárat (pl. 7 nap). Ha nem kell, állítsd null-ra.
  const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 nap
  // const TTL_MS = null;

  const codeEl = document.getElementById("couponCode");
  const btn = document.getElementById("copyCoupon");
  const msgEl = document.getElementById("couponMsg");
  if (!codeEl) return;

  function isExpired() {
    if (!TTL_MS) return false;
    const ts = Number(localStorage.getItem(STORAGE_TS_KEY) || "0");
    if (!ts) return true;
    return Date.now() - ts > TTL_MS;
  }

  function pickRandom() {
    return COUPONS[Math.floor(Math.random() * COUPONS.length)];
  }

  function getOrCreateCoupon() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && !isExpired()) return saved;

    const picked = pickRandom();
    localStorage.setItem(STORAGE_KEY, picked);
    localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
    return picked;
  }

  const coupon = getOrCreateCoupon();
  codeEl.textContent = coupon;

  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(coupon);
        if (msgEl) msgEl.textContent = `Kimásolva: ${coupon}`;
      } catch {
        if (msgEl) msgEl.textContent = "Nem sikerült automatikusan másolni. Jelöld ki és másold kézzel.";
      }
    });
  }
})();
