export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: GuideBlock[];
  faq?: GuideFaq[];
  // Draft guides are noindex and show a visible placeholder banner — flip
  // this off once real content replaces the lorem ipsum.
  draft?: boolean;
};

function p(text: string): GuideBlock {
  return { type: "paragraph", text };
}

function h(text: string): GuideBlock {
  return { type: "heading", text };
}

function list(items: string[]): GuideBlock {
  return { type: "list", items };
}

export const GUIDES: Guide[] = [
  {
    slug: "quartz-vs-granite-worktops",
    title: "Quartz vs Granite Worktops: Which Should You Choose? (UK Guide 2026)",
    category: "Choosing a material",
    excerpt:
      "Quartz and granite overlap heavily on price and both easily outlast a kitchen — the real difference comes down to maintenance, heat tolerance and the look you're after. A full comparison, plus FAQs.",
    content: [
      p(
        "Quartz and granite overlap heavily on price (roughly £250–£500 per square metre installed) and both will outlast your kitchen — the real difference comes down to maintenance, heat tolerance and the look you're after."
      ),
      p(
        "I've been in the industry for over a decade and this is easily the most asked question. Ultimately, it should be looked at on a case by case basis. Both materials have their pros and cons, which I've listed below."
      ),
      p(
        "You have to ask yourself: what do you want from your kitchen? Are you heavy handed with pots and pans, looking for white colours, and want your kitchen to look EXACTLY like the one in the showroom? Then go for quartz."
      ),
      p(
        "Do you want to leave hot pans on your worktop, are you open to some natural variation, and do you like the idea of a million-year-old rock from across the world living in your kitchen? Then look into granite."
      ),
      p(
        "At the end of the day, both will do the job you want them to do and will still look great in 30 years' time. I tell all my clients not to get caught up in whether they should get natural or engineered. Just go for what you think will look best."
      ),
      p("Here's the detailed comparison, point by point."),

      h("What's the difference between quartz and granite?"),
      p(
        "Granite is 100% natural stone. It's cut from a quarry in blocks and sliced like a loaf of bread. Slabs from the same block tend to be the same with slight variations. However, a different block might make you question if it's the same material."
      ),
      p(
        "Quartz is an engineered stone: around 90–93% ground natural quartz mixed with resins and pigments, then formed into slabs. Because it's manufactured, the colour and pattern are consistent and controllable — what you see in the showroom is what arrives in your kitchen."
      ),
      p(
        "That one difference — natural vs engineered — drives almost everything else in this comparison."
      ),

      h("Cost"),
      p(
        "It's impossible to say which is going to cost more or less without picking the specific stones you want and talking to your fabricator. All the colours have their own price tag, so it's not as black and white as one is cheaper than the other... but what I can say is the best looking quartz are usually cheaper than the best looking granites."
      ),
      p(
        "Quartz pricing is more predictable with a tighter range. Granite pricing swings based on the specific stone — a common 'Steel Grey' is affordable, an exotic 'Azul Aran' may make you review your budget... but hey, you have to look at it every day for the next x amount of years. Don't skimp on the worktop. It's what ties everything together."
      ),

      h("Durability: both excellent, different weak spots"),
      p(
        "Both materials are extremely hard and will comfortably outlast the rest of your kitchen. The differences are at the margins:"
      ),
      list([
        "Scratches: Both resist everyday scratching very well. Quartz is slightly harder overall; neither should be used as a chopping board (it'll blunt your knives before it damages either stone).",
        "Chips: Both can chip on edges if you hit them with something heavy. Granite chips can be harder to repair invisibly because of the natural patterning; quartz chips can usually be filled with colour-matched resin.",
        "Heat: This is granite's win. Granite tolerates hot pans directly on the surface. Quartz contains resin, which can scorch or discolour above roughly 150°C — so with quartz, you use a trivet for hot pans and air fryers.",
        "UV/sunlight: In a very sunny kitchen or a south-facing extension with lots of glazing, some quartz colours can fade slightly over years of direct sun. Granite doesn't fade. Worth asking your installer about if your worktop will sit in strong daily sunlight.",
      ]),

      h("Maintenance: quartz wins clearly"),
      p("This is where the engineered material pulls ahead:"),
      p(
        "Quartz is non-porous. Liquids sit on the surface rather than soaking in. Red wine, coffee, turmeric, beetroot — wipe them up and they're gone. It never needs sealing. Just don't use washing up liquid to clean it — it can leave a film over time. Treat it like glass and use a streak-free cleaner. I always recommend method's granite cleaner."
      ),
      p(
        "Granite is porous. It needs sealing when installed and re-sealing roughly every 1–2 years (a simple DIY job, but one you have to remember). If the seal wears and you leave a spill overnight — oil and wine are the usual culprits — it can stain permanently. Most granites are so patterned and speckly that you won't notice these little marks, anyway."
      ),
      p(
        "If you want a fit-and-forget worktop, this section alone decides it for most people."
      ),

      h("Looks: the genuinely personal one"),
      p(
        "Choose granite if you love the idea of real, natural stone — the depth, the mineral flecks, the crystals, the character! Visit the stone yard and pick your actual slab; photographs never do granite justice."
      ),
      p(
        "Choose quartz if you want a specific, consistent look — especially the clean whites, soft greys and convincing marble-effects that dominate modern kitchen design. Natural granite simply doesn't come in a pure bright white; quartz does. The whitest granite I've seen in my time is 'Topazio White' and it's hard to come by for that specific reason. Quartz also gives you consistency across a large kitchen or island, with pattern-matched joins."
      ),
      p(
        "Current UK trends lean heavily toward light, marble-look surfaces, which is a big part of why quartz now outsells granite — but trends aren't a reason to override your own taste on something you'll live with for 20 years."
      ),

      h("Environmental considerations"),
      p(
        "Neither is a clear winner. Granite is natural but quarried and often shipped from Brazil, India or Africa. Quartz is manufactured (energy and resins) but often produced closer to market, and some brands now use significant recycled content. If sustainability matters to you, ask your installer about specific brands' recycled ranges rather than choosing on material type alone."
      ),

      h("So which should you choose?"),
      p("Choose quartz if:"),
      list([
        "You want minimal maintenance and no sealing, ever",
        "Stain resistance matters (busy family kitchen, keen cooks, red wine drinkers)",
        "You want white, light grey or marble-effect worktops",
        "You want predictable colour and pattern-matched joins",
      ]),
      p("Choose granite if:"),
      list([
        "You want genuinely natural, one-of-a-kind stone with character",
        "You regularly put hot pans straight down and don't want to think about trivets",
        "Your kitchen gets strong direct sunlight all day",
        "You've seen a slab you've fallen in love with",
      ]),
      p(
        "If you're still torn after all that, go back to basics: both will do the job and both will still look great in 30 years. Pick the one you think will look best in your kitchen — that's the advice I give every client, and nobody's ever regretted following it."
      ),
    ],
    faq: [
      {
        question: "Is quartz cheaper than granite?",
        answer:
          "Not necessarily. All the colours have their own price tag, so it's not as black and white as one is cheaper than the other... but what I can say is the best looking quartz are usually cheaper than the best looking granites.",
      },
      {
        question: "Which lasts longer, quartz or granite?",
        answer: "They will both outlast you, me and our grandkids.",
      },
      {
        question: "Can you put hot pans on quartz worktops?",
        answer:
          "No. The resin in quartz will get too hot, and when it cools, it will cool a different colour, usually leaving a ring mark matching the pan.",
      },
      {
        question: "Do granite worktops really need sealing?",
        answer:
          "Yes. Always get your fabricator to seal on installation. We tell people to reseal after a few years, but no one ever really does.",
      },
      {
        question: "Is quartz fake stone?",
        answer: "No — it's basically made of crushed up stone bound together with resin.",
      },
    ],
    draft: true,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return GUIDES.filter((guide) => guide.category === category);
}
