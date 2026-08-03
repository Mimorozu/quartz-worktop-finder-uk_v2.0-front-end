export type CityDefinition = {
  slug: string;
  name: string;
  // Official UK postcode area codes (the letters-only prefix, e.g. "B" for
  // Birmingham, "BS" for Bristol) that fall within this city's coverage.
  areaCodes: string[];
};

export const CITIES: CityDefinition[] = [
  { slug: "birmingham", name: "Birmingham", areaCodes: ["B"] },
  { slug: "bristol", name: "Bristol", areaCodes: ["BS"] },
  { slug: "oxford", name: "Oxford", areaCodes: ["OX"] },
  { slug: "london", name: "London", areaCodes: ["E", "EC", "N", "NW", "SE", "SW", "W", "WC"] },
  { slug: "manchester", name: "Manchester", areaCodes: ["M"] },
  { slug: "sheffield", name: "Sheffield", areaCodes: ["S"] },
  { slug: "plymouth", name: "Plymouth", areaCodes: ["PL"] },
  { slug: "newton-abbot", name: "Newton Abbot", areaCodes: ["TQ"] },
  { slug: "southampton", name: "Southampton", areaCodes: ["SO"] },
  { slug: "portsmouth", name: "Portsmouth", areaCodes: ["PO"] },
  { slug: "reading", name: "Reading", areaCodes: ["RG"] },
  { slug: "cardiff", name: "Cardiff", areaCodes: ["CF"] },
  { slug: "swansea", name: "Swansea", areaCodes: ["SA"] },
];

export function getCityBySlug(slug: string): CityDefinition | undefined {
  return CITIES.find((city) => city.slug === slug);
}

// Matches a postcode outward code (e.g. "B45") against a city's UK postcode
// area codes (e.g. "B"). A plain string prefix isn't enough — "B" as a prefix
// would also match "BS12" (Bristol), so the character after the area code
// must be a digit for it to be a genuine match.
export function postcodeAreaMatchesCity(postcodeArea: string, areaCodes: string[]): boolean {
  return areaCodes.some((code) => {
    if (!postcodeArea.startsWith(code)) return false;
    const nextChar = postcodeArea[code.length];
    return nextChar >= "0" && nextChar <= "9";
  });
}
