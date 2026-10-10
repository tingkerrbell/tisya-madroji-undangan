
// lib/validation.ts

export type Attendance = "hadir" | "tidak_hadir";

export type RsvpInput = {
  name: string;
  attendance: Attendance;
  guest_count: number;
  message: string | null;
};

type ParseResult =
  | { ok: true; data: RsvpInput }
  | { ok: false; error: string };

/** Membersihkan teks dan membatasi panjang input. */
export function cleanText(
  value: unknown,
  max: number,
  multiline = false,
): string {
  if (typeof value !== "string") return "";

  let text = value
    .normalize("NFC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "");

  if (multiline) {
    text = text
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n");
  } else {
    text = text.replace(/\s+/g, " ");
  }

  return text.trim().slice(0, max);
}

/** Validasi input RSVP di sisi server. */
export function parseRsvp(body: unknown): ParseResult {
  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return { ok: false, error: "Data tidak valid." };
  }

  const raw = body as Record<string, unknown>;

  const name = cleanText(raw.name, 80);

  if (!name) {
    return { ok: false, error: "Nama wajib diisi." };
  }

  if (
    raw.attendance !== "hadir" &&
    raw.attendance !== "tidak_hadir"
  ) {
    return { ok: false, error: "Pilih kehadiran Anda." };
  }

  const attendance: Attendance = raw.attendance;

  let guestCount = 1;

  if (attendance === "hadir") {
    // Harus berupa angka asli, bukan string hasil konversi.
    if (
      typeof raw.guest_count !== "number" ||
      !Number.isSafeInteger(raw.guest_count) ||
      raw.guest_count < 1 ||
      raw.guest_count > 10
    ) {
      return {
        ok: false,
        error: "Jumlah tamu harus antara 1 sampai 10.",
      };
    }

    guestCount = raw.guest_count;
  }

  const message = cleanText(raw.message, 500, true) || null;

  return {
    ok: true,
    data: {
      name,
      attendance,
      guest_count: guestCount,
      message,
    },
  };
}
