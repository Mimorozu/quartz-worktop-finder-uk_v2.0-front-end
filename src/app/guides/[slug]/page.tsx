import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.excerpt, type: "article" },
    robots: guide.draft ? { index: false, follow: false } : undefined,
  };
}

// Guide content is plain data, not markdown/HTML, but supports one small
// piece of syntax so writers can link out inline: [label](/path).
const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInlineText(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  INLINE_LINK_PATTERN.lastIndex = 0;
  while ((match = INLINE_LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    parts.push(
      isExternal ? (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline-offset-2 hover:underline"
        >
          {label}
        </a>
      ) : (
        <Link key={key++} href={href} className="text-gold underline-offset-2 hover:underline">
          {label}
        </Link>
      )
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const faqJsonLd = guide.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <NavBar />

      <main className="mx-auto max-w-[720px] px-5 py-16">
        {guide.draft && (
          <div className="mb-8 rounded-xl border border-dashed border-gold/50 bg-gold/5 px-5 py-3 text-center text-sm font-semibold text-gold">
            Draft placeholder — not yet published
          </div>
        )}

        <Link
          href="/guides"
          className="mb-6 inline-block text-sm font-medium text-muted transition-colors hover:text-gold"
        >
          ← Back to Guides
        </Link>

        <div className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          {guide.category}
        </div>
        <h1 className="mb-8 font-display text-4xl font-medium tracking-tight text-slate sm:text-5xl">
          {guide.title}
        </h1>

        <div className="space-y-5">
          {guide.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="pt-4 font-display text-2xl font-semibold text-slate"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "subheading") {
              return (
                <h3
                  key={index}
                  className="pt-2 font-display text-lg font-semibold text-slate"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={index} className="list-disc space-y-2 pl-6 text-body-text">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="leading-7">
                      {renderInlineText(item)}
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "table") {
              return (
                <div key={index} className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[480px] border-collapse text-sm">
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="border-b border-border bg-page-bg px-4 py-3 text-left font-semibold text-slate"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-surface even:bg-page-bg/40">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border-b border-border px-4 py-3 text-body-text"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            return (
              <p key={index} className="leading-8 text-body-text">
                {renderInlineText(block.text)}
              </p>
            );
          })}
        </div>

        {guide.faq && guide.faq.length > 0 && (
          <div className="mt-12 border-t border-border pt-10">
            <h2 className="mb-6 font-display text-2xl font-semibold text-slate">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {guide.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="mb-1.5 font-semibold text-slate">{item.question}</h3>
                  <p className="leading-7 text-body-text">{renderInlineText(item.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center sm:p-10">
          <h2 className="mb-2 font-display text-2xl font-semibold text-slate">
            Ready to get quotes?
          </h2>
          <p className="mb-6 text-muted">
            Compare trusted quartz worktop installers in your area.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30"
          >
            Find installers near you
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
