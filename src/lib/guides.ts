export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

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

function sh(text: string): GuideBlock {
  return { type: "subheading", text };
}

function list(items: string[]): GuideBlock {
  return { type: "list", items };
}

function table(headers: string[], rows: string[][]): GuideBlock {
  return { type: "table", headers, rows };
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
    draft: false,
  },
  {
    slug: "quartz-worktop-cost",
    title: "How Much Do Quartz Worktops Cost? (UK Price Guide 2026)",
    category: "Costs & pricing",
    excerpt:
      "What do quartz worktops really cost in the UK? An installer with over a decade in the industry breaks down prices per square metre, what's included in a quote, and where the hidden costs are.",
    content: [
      p(
        "In the UK, quartz worktops typically cost £250–£500 per square metre fully installed, meaning an average kitchen (5–7 square metres) comes to around £2,000–£3,500 all in. Budget ranges start lower, premium branded quartz goes higher, and the cutouts, edges and extras in your quote can shift the final figure more than the stone itself."
      ),
      p(
        "An end user would not be able to look at a slab and know the price. There are plain grey slabs that cost more than some marble effects, so always ask your fabricator for a price group."
      ),
      p(
        "Here's the full breakdown, so when quotes start arriving you'll know exactly what you're looking at — and what questions to ask."
      ),

      h("Quartz worktop prices per square metre"),
      table(
        ["Tier", "Price per m² (installed)", "What you're getting"],
        [
          ["Budget", "£250–£350", "Unbranded/imported quartz, simpler colours"],
          ["Mid-range", "£350–£450", "Branded ranges, popular marble-effects"],
          ["Premium", "£450–£600+", "Top-tier brands, dramatic veining, unusual finishes"],
        ]
      ),
      p(
        "Always ask what company supplies the slabs. Some fabricators opt out of using UK based wholesalers and import direct from China. To gain a competitive edge, they buy high-resin slabs at lower rates. More resin = lower quality. I would only ever offer my clients slabs at a maximum of 12% resin. The premium brands are as low as 6%. This is what you're paying for. You can always ask your fabricator for a technical data sheet — you will see the resin content there."
      ),
      p("Two things to understand about these numbers:"),
      p(
        "\"Installed\" is the only number that matters. Some companies advertise slab-only or \"supply only\" prices that look temptingly low. A fitted quartz worktop involves templating (measuring your kitchen precisely), fabrication (cutting the slab, polishing edges, cutting holes for your sink and hob) and installation. Always compare full fitted quotes."
      ),
      p(
        "The colour you choose moves the price more than anything else. Within a single brand, a plain colour and a heavily patterned one can sit in completely different price groups. Brands typically organise colours into price bands — ask which band your chosen colour is in before you fall in love with it."
      ),

      h("What a typical kitchen actually costs"),
      p("A worked example for an average UK kitchen with around 6 square metres of worktop:"),
      table(
        ["Item", "Typical cost"],
        [
          ["Quartz (6m² at mid-range £400/m²)", "£2,400"],
          ["Sink cutout", "£80–£150"],
          ["Hob cutout", "£80–£150"],
          ["Drainer grooves", "£100–£200"],
          ["Upstands (per metre)", "£40–£80"],
          ["Realistic total", "£2,700–£3,200"],
        ]
      ),
      p(
        "Really, even if you go with a plain grey colour with simple edge finishes, you will be looking around the £2,000 mark."
      ),

      h("The extras that appear on your quote (and what they should cost)"),
      list([
        "Cutouts (sink, hob, taps, sockets): each hole cut in the stone is machine time and risk, so each is charged. Undermounted sinks cost more than drop-in ones because the cut edge must be polished.",
        "Edge profiles: a standard polished square or pencil edge is usually included. Fancier edges (bullnose, ogee, chamfered) add cost. Mitred waterfall ends on an island are a significant extra.",
        "Drainer grooves: the recessed lines beside the sink. Popular, but they're precision machining — expect £100–£200.",
        "Splashbacks and upstands: quartz splashbacks look stunning but effectively add square metres to the job.",
        "Removal of old worktops: some fitters include it, some charge £100–£250. Ask.",
        "Thickness: 20mm and 30mm are the standard options. 30mm uses more material and costs roughly 10–20% more. If you have a traditional kitchen style like a shaker, I would recommend 30mm — the chunky look keeps it in line with the overall aesthetics. If you have a modern handleless design, get 20mm for a sleek look.",
      ]),

      h("Why quotes for the same kitchen can differ by £1,000+"),
      p("When you get three quotes and they're wildly different, it's usually one of these:"),
      list([
        "Different brands or colour bands — one fitter quoted a budget BQS / Nile stone, another quoted Silestone / Unistone. Make sure quotes are for the same (or equivalent) material.",
        "What's included — one quote includes cutouts, upstands and old worktop removal; another lists them as extras you'll discover later.",
        "Fabricator vs middleman — buying through a kitchen showroom often adds a margin on top of the fabricator doing the actual work. Going direct to a fabricator/installer can save 10–25%. [Search by postcode to find a fabricator near you](/).",
      ]),
      p(
        "I've seen some things over the years. One of the sneaky tricks I've seen from time to time is end users selecting a premium brand, only to have their fabricator install a budget replica without them knowing. The brand name is usually printed on the back of the slab, so keep an eye out during install. This usually happens if the fabricator makes a mistake, or is short of material and doesn't want to fork out of pocket to fix it."
      ),

      h("How quartz compares with other worktops on price"),
      table(
        ["Material", "Typical installed cost per m²"],
        [
          ["Laminate", "£30–£100"],
          ["Solid wood", "£150–£300"],
          ["Quartz", "£250–£500"],
          ["Granite", "£250–£500+"],
          ["Ceramic/porcelain", "£350–£600"],
          ["Corian (solid surface)", "£300–£500"],
        ]
      ),
      p(
        "Quartz sits in the premium bracket, level with granite. If you're weighing those two up specifically, read our full [quartz vs granite comparison](/guides/quartz-vs-granite-worktops)."
      ),

      h("How to keep the cost down (without regretting it)"),
      list([
        "Choose a colour from a lower price band — every brand has affordable colours that look far more expensive than they are. Your fabricator will know which ones. 'BQS Midas Gold' from Brachot is one such design. It features a very natural looking grey cloud vein with gold pencil veins running through it. I've seen the premium brands offer a similar design for 4x the cost.",
        "Simplify the design — fewer cutouts, standard edges, skip the drainer grooves, go for 20mm.",
        "Get quotes from installers, not just showrooms — cutting out the middleman is the single biggest saving.",
        "Don't shrink the worktop to save money — as I tell clients about the stone itself: you look at it every day. Save on extras, not on the material you actually see.",
      ]),
    ],
    faq: [
      {
        question: "How much is a quartz worktop for an average kitchen?",
        answer:
          "Around £2,000–£3,500 fully installed for a typical UK kitchen, depending on the colour, brand and extras. Large kitchens with islands can exceed £5,000.",
      },
      {
        question: "Why is quartz so expensive?",
        answer:
          "You're paying for the material (90%+ ground natural quartz), precision fabrication with diamond tooling, and skilled two-person installation of slabs that can weigh over 100kg. The machinery needed to cut the slabs is a significant investment for any business and therefore comes at a cost.",
      },
      {
        question: "Is quartz cheaper than granite?",
        answer:
          "Not necessarily — all colours have their own price tag in both materials. The best looking quartz is usually cheaper than the best looking granite.",
      },
      {
        question: "Are cheap quartz worktops worth it?",
        answer:
          "Yes. If you're looking to spruce up your kitchen without breaking the bank, there are plenty of options out there. Just do your homework — ask for the technical data sheet and check the resin content, as covered above.",
      },
      {
        question: "Do quartz worktops add value to a house?",
        answer:
          "Estate agents consistently list quality kitchen worktops among the details that help a house sell. You won't get the money back pound for pound, but a quartz kitchen photographs well and sells homes faster than tired laminate.",
      },
    ],
    draft: false,
  },
  {
    slug: "quartz-worktop-installation-aftercare",
    title: "Quartz Worktop Installation & Aftercare Guide (What to Expect)",
    category: "Installation & aftercare",
    excerpt:
      "What actually happens when your quartz worktop is installed — templating, fitting day, and how to look after it for the next 30 years. Written by an installer with over a decade in the industry.",
    content: [
      p(
        "A quartz worktop installation happens in two visits: templating (precise measuring, around 1 hour) and fitting (usually 2–4 hours), with 5–10 working days of fabrication in between. Once it's in, aftercare is minimal — no sealing, just the right cleaning products and a trivet for hot pans."
      ),

      h("Before templating: what needs to be ready"),
      p(
        "This is the part that catches people out. When the templater arrives, your kitchen needs to be further along than most people expect:"
      ),
      list([
        "Base units fully fitted, level and secure — the template is only as accurate as the cabinets it's measured from. If units move afterwards, the worktop won't fit.",
        "Sink, hob and taps on site — the templater needs the actual items (or exact manufacturer specs) to mark the cutouts. \"It's arriving next week\" is going to be a problem.",
        "Decisions made — overhang, edge profile, drainer grooves, upstand heights. Changing your mind after templating means delays and possibly charges.",
      ]),

      h("Templating day"),
      p(
        "The templater creates a precise digital or physical template of your worktop layout — every edge, corner, cutout and join. Expect around an hour. This is also your last chance to talk through the details in person: where joins will sit, which way patterns run, exactly how far the overhang comes out. Ask questions now, not on fitting day."
      ),
      p(
        "Why joins matter: slabs come in fixed sizes based on the machinery used to cut them (roughly 3.2m x 1.6m for most brands), so larger kitchens and islands will need joins. A good fabricator positions them where they're least visible."
      ),

      h("Fabrication: the 5–10 day wait"),
      p(
        "Your slab is cut, edges polished, and cutouts machined at the fabricator's workshop using the template. Nothing for you to do — except not touching those base units."
      ),

      h("Fitting day: what to expect"),
      p("The fitting team will carry in, position, join and secure the worktops."),
      p(
        "What you should check before they leave: joins are smooth and colour-matched, edges are polished consistently, cutouts line up, no chips or scratches — and, as covered in our [cost guide](/guides/quartz-worktop-cost), the brand name on the underside of the slab is the brand you paid for."
      ),

      h("Aftercare: keeping quartz looking new for 30 years"),
      p(
        "The good news first: quartz is about the lowest-maintenance worktop there is. No sealing, ever. But there are a few rules worth following:"
      ),

      h("Daily cleaning"),
      p(
        "Wipe with warm water and a soft cloth, then treat it like glass and use a streak-free cleaner. After a decade in the trade, these are the three products I recommend to every client:"
      ),
      list([
        "Daily use: [method granite & marble cleaner](https://www.amazon.co.uk/dp/B06W584GH8)",
        "Stubborn marks: CIF cream (non-abrasive)",
        "Yearly deep clean: [Lithofin MN Power Clean](https://www.amazon.co.uk/dp/B00AEC3P74)",
      ]),
      p(
        "One habit to break: wiping the worktop down with that damp washcloth out of the sink with washing up liquid on it. I've seen hundreds of site visits where the build-up leaves a film that can make the worktop look like it's marked. That being said, Lithofin Easy Clean will get rid of it if the damage is already done."
      ),

      h("What to avoid"),
      list([
        "Direct heat — always use a trivet for hot pans. The resin in quartz can scorch above roughly 150°C, and when it cools it can cool a different colour, usually leaving a ring mark matching the pan. Heat damage can be measured, so you won't be able to make a claim on your fabricator's manufacturing warranty. I'd put something underneath those air fryers, too — they can throw out some serious heat on the underside.",
        "Harsh chemicals — no bleach, oven cleaner, drain unblocker or anything strongly acidic/alkaline on the surface. If a splash happens, rinse it off promptly.",
        "Cutting directly on the surface — it'll blunt your knives before it damages the quartz, but use a board anyway.",
        "Standing on it — quartz is strong under spread weight but can crack under point pressure, especially near cutouts and unsupported spans.",
      ]),

      h("Dealing with marks and stains"),
      p(
        "For stubborn marks (dried-on food, limescale around the tap), a non-abrasive cream cleaner used gently will shift most things. CIF cream is my go-to."
      ),

      h("Chips and damage"),
      p(
        "Small chips (usually on edges, from knocks with heavy pans) can be filled with colour-matched resin by a professional — don't attempt DIY filler kits on a visible area."
      ),
    ],
    faq: [
      {
        question: "How long does quartz worktop installation take?",
        answer:
          "Around 2–4 hours on fitting day for a typical kitchen. The full process — templating, fabrication, fitting — usually takes 1–2 weeks from template to finished kitchen.",
      },
      {
        question: "Can I fit a quartz worktop myself?",
        answer:
          "No — and not just because of the weight. Quartz must be cut with specialist diamond tooling and dust extraction (the dust is a serious health hazard), and mistakes can't be patched like wood or laminate. This is one job to leave to the professionals.",
      },
      {
        question: "Do quartz worktops need sealing?",
        answer:
          "No, never. Quartz is non-porous. This is one of its biggest advantages over granite.",
      },
      {
        question: "How soon can I use my kitchen after installation?",
        answer:
          "Light use the same day, but wait around 24 hours before reconnecting plumbing and using the hob so adhesives can fully cure.",
      },
    ],
    draft: false,
  },
  {
    slug: "quartz-worktop-brands-compared",
    title: "Best Quartz Worktop Brands Compared (UK, 2026)",
    category: "Brands compared",
    excerpt:
      "Silestone, Caesarstone, Unistone, BQS and more — an installer with over a decade in the trade compares the quartz brands on quality, price and what you're actually paying for.",
    content: [
      p(
        "The main difference between quartz brands isn't the logo — it's resin content. Premium brands like Silestone and Caesarstone run as low as around 6% resin; budget imports can go far higher. More resin means a softer, less heat-tolerant and less durable surface. Everything else — colour range, warranty, availability — follows from where a brand sits on that scale."
      ),
      p(
        "I can't sit here and tell you any brand is best. They will all do a great job. The real question is what brand offers you the design you want working within your budget."
      ),

      h("Why resin content is the number that matters"),
      p(
        "Quartz is roughly 90–93% ground natural quartz bound together with resin and pigment. The higher the proportion of actual stone, the harder, more heat-tolerant and more durable the slab."
      ),
      p(
        "Some fabricators skip UK-based wholesalers and import direct from China, buying high-resin no-name brand slabs at lower rates to undercut competitors on price. I would only ever offer my clients slabs at a maximum of 12% resin — the premium brands are as low as 6%."
      ),
      p(
        "How to check for yourself: ask any fabricator for the technical data sheet for the slab you're considering. The resin content is listed there. A fabricator who can't or won't produce one is telling you something."
      ),

      h("The premium tier"),
      sh("Silestone (Cosentino, Spain)"),
      p(
        "Probably the biggest name in quartz and often the default recommendation in showrooms. Huge colour range, strong warranty, widely available across the UK. You pay for the brand as well as the material."
      ),
      sh("Caesarstone (Israel)"),
      p(
        "The other big premium name, particularly strong on convincing marble-effect designs. Comparable price bracket to Silestone."
      ),

      h("The mid-range"),
      sh("Unistone"),
      p(
        "Widely used in the UK, good quality-to-price ratio, solid colour range covering the popular whites and greys, with most colours available in a matt finish."
      ),

      h("The value tier"),
      sh("BQS (Brachot)"),
      p(
        "Good value with some genuinely impressive designs. 'BQS Midas Gold' is a standout — a natural-looking grey cloud vein with gold pencil veins running through it. I've seen premium brands offer a similar design for 4x the cost. 'BQS Taj Mahal' is the best replica of the natural quartzite."
      ),

      h("Unbranded and direct imports: the honest verdict"),
      p(
        "Unbranded slabs are always a risk. The high resin content makes them more susceptible to staining and heat damage. UK wholesalers have built a standard of quality over decades and built trustworthy brands that fabricators use time and time again."
      ),
      p(
        "One practical point regardless of brand: if a slab is discontinued or unbranded and you damage a section in five years' time, matching it can be difficult or impossible. Established brands keep ranges in production longer."
      ),

      h("Warranties: read the small print"),
      p(
        "Most quartz brands offer long warranties — often 10, 15 or 25 years — but they cover the fabricator for manufacturing defects, not damage. Heat marks, chips and chemical damage are excluded, and heat damage can be measured, so a scorch ring won't be covered."
      ),

      h("Cracks years after installation: whose fault?"),
      p(
        "During my decade in the industry, I have seen many quartz slabs crack years after the install. This is always down to cutting errors and no fault of the stone. The biggest one being fabricators cutting at 90 degree angles with no radius. This causes tension when the slab expands and contracts, which leads to a crack."
      ),
      p(
        "This type of damage would not be covered by the wholesaler's manufacturing warranty, and is the responsibility of the fabricator. It's worth asking them what their policy is on covering cracks down the road."
      ),

      h("So which brand should you choose?"),
      list([
        "If budget allows and you want certainty: a premium brand gives you the lowest resin content, the widest colour choice and the best chance of matching material years later.",
        "If you want the best value: a good mid-range or value brand with verified resin content under 12% will perform brilliantly for a fraction of the premium price.",
        "Whatever your budget: ask for the technical data sheet, ask who supplies the slabs, and check the brand printed on the underside on fitting day.",
      ]),
      p(
        "Personally, I wouldn't get tied up over which UK branded quartz you go with. If it achieves the look you want and is in your budget — pull the trigger!"
      ),
    ],
    faq: [
      {
        question: "Which quartz brand is best?",
        answer: "Personally, I recommend Brachot's BQS range. Great colours and fair pricing.",
      },
      {
        question: "Is Silestone worth the extra money?",
        answer: "Some colours, yes. Others, no.",
      },
      {
        question: "What's the difference between branded and unbranded quartz?",
        answer:
          "Mainly resin content, colour consistency between slabs, and long-term availability if you ever need a match. Ask for the technical data sheet to see the difference in numbers rather than marketing.",
      },
      {
        question: "Does the brand affect the price much?",
        answer:
          "Yes, but colour matters more. A premium colour band and a budget colour band can differ hugely within the same brand. See our [cost guide](/guides/quartz-worktop-cost) for full pricing.",
      },
      {
        question: "Can I mix brands in one kitchen?",
        answer:
          "Yes — but never join them. One brand for the island and another for the worktop runs would be fine. Just bear in mind that colours never match exactly between manufacturers, so it only works when the two surfaces are visually separate.",
      },
    ],
    draft: false,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return GUIDES.filter((guide) => guide.category === category);
}
