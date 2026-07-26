// Mirrors the original PHP regex: extracts the postcode "area" (outward code)
// from a full postcode, e.g. "GL50 2PR" -> "GL50", "CM1 5TG" -> "CM1".
const POSTCODE_AREA_PATTERN = /^([A-Z]{1,2}\d{1,2}[A-Z]?)/;

export function extractPostcodeArea(input: string): string | null {
  const normalized = input.toUpperCase().trim();
  const match = POSTCODE_AREA_PATTERN.exec(normalized);
  return match ? match[1] : null;
}
