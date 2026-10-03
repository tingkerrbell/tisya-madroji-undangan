// scripts/smoke-test.mjs
// Pakai: npm run smoke   (server harus sedang berjalan)
// Alamat lain: set BASE_URL=https://domain-anda.com && npm run smoke

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SLUG = "tisya-madroji";
const JSON_HEADERS = { "Content-Type": "application/json" };
const FAKE_UUID = "00000000-0000-0000-0000-000000000000";

let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    console.log("  ✓", name);
  } catch (err) {
    failed++;
    console.log("  ✗", name, "→", err.message);
  }
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const call = (path, init = {}) => fetch(BASE + path, { redirect: "manual", ...init });

const postRsvp = (body) =>
  call("/api/rsvp", { method: "POST", headers: JSON_HEADERS, body: JSON.stringify(body) });

console.log(`\nSmoke test → ${BASE}\n`);

await check("Halaman undangan terbuka (200) dan punya og:image", async () => {
  const res = await call(`/${SLUG}`);
  expect(res.status === 200, `status ${res.status}`);
  const html = await res.text();
  expect(html.includes("og:image"), "tag og:image tidak ada");
});

await check("Slug salah menghasilkan 404", async () => {
  const res = await call("/slug-ngawur");
  expect(res.status === 404, `status ${res.status}`);
});

await check("/admin tanpa login diarahkan ke /admin/login", async () => {
  const res = await call("/admin");
  const location = res.headers.get("location") ?? "";
  const body = res.status === 200 ? await res.text() : "";
  expect(
    (res.status >= 300 && res.status < 400 && location.includes("/admin/login")) ||
      body.includes("/admin/login"),
    `status ${res.status}, location "${location}"`,
  );
});

await check("RSVP tanpa nama ditolak (400)", async () => {
  const res = await postRsvp({ name: "", attendance: "hadir", guest_count: 1 });
  expect(res.status === 400, `status ${res.status}`);
});

await check("RSVP dengan kehadiran tidak valid ditolak (400)", async () => {
  const res = await postRsvp({ name: "Tes", attendance: "mungkin", guest_count: 1 });
  expect(res.status === 400, `status ${res.status}`);
});

await check("RSVP dengan jumlah tamu 99 ditolak (400)", async () => {
  const res = await postRsvp({ name: "Tes", attendance: "hadir", guest_count: 99 });
  expect(res.status === 400, `status ${res.status}`);
});

await check("Honeypot (bot) pura-pura sukses tanpa menyimpan (201)", async () => {
  const res = await postRsvp({ name: "Bot", attendance: "hadir", guest_count: 1, website: "http://spam" });
  expect(res.status === 201, `status ${res.status}`);
});

await check("Daftar ucapan hanya membuka data publik", async () => {
  const res = await call("/api/rsvp?page=1");
  expect(res.status === 200, `status ${res.status}`);
  const data = await res.json();
  expect(Array.isArray(data.items), "items bukan array");
  for (const item of data.items) {
    const keys = Object.keys(item).sort().join(",");
    expect(keys === "created_at,id,message,name", `kolom bocor: ${keys}`);
  }
});

await check("Hapus RSVP tanpa login ditolak (401)", async () => {
  const res = await call(`/api/admin/rsvp/${FAKE_UUID}`, { method: "DELETE" });
  expect(res.status === 401, `status ${res.status}`);
});

await check("Login admin dengan password salah ditolak (401)", async () => {
  const res = await call("/api/admin/login", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ password: "password-ngawur-123" }),
  });
  expect(res.status === 401, `status ${res.status}`);
});

await check("Header keamanan terpasang", async () => {
  const res = await call(`/${SLUG}`);
  expect(res.headers.get("x-content-type-options") === "nosniff", "x-content-type-options hilang");
  expect(res.headers.get("x-frame-options") === "DENY", "x-frame-options hilang");
  expect(!res.headers.get("x-powered-by"), "x-powered-by masih tampil");
});

await check("robots.txt melarang /admin", async () => {
  const res = await call("/robots.txt");
  const text = await res.text();
  expect(text.includes("Disallow: /admin"), "aturan /admin tidak ada");
});

console.log(failed === 0 ? "\nSemua tes lulus ✓\n" : `\n${failed} tes gagal ✗\n`);
process.exit(failed === 0 ? 0 : 1);