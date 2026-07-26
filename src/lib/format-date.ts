// Mirrors the original PHP `date('jS F Y')` format, e.g. "26th July 2026".
export function formatOrdinalDate(date: Date): string {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = date.toLocaleString("en-GB", { month: "long" });
  return `${day}${suffix} ${month} ${date.getFullYear()}`;
}
