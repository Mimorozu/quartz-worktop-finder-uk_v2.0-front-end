import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, H2, H3, P, Ul, Notice } from "@/components/LegalLayout";
import { formatOrdinalDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Quartz Worktop Finder stone mason directory. Read our terms before using our free directory service.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated={formatOrdinalDate(new Date())}>
      <P>
        Welcome to Quartz Worktop Finder. By accessing and using our stone mason directory
        service, you agree to be bound by these Terms of Service. Please read them carefully.
      </P>

      <H2>1. Acceptance of Terms</H2>
      <P>
        By accessing or using Quartz Worktop Finder (&quot;the Service&quot;), you agree to
        comply with and be bound by these Terms of Service. If you do not agree to these
        terms, please do not use the Service.
      </P>

      <H2>2. Description of Service</H2>
      <P>
        Quartz Worktop Finder is a free online directory that connects homeowners,
        builders, and contractors with verified stone mason specialists in the UK who
        specialize in kitchen worktop fabrication and installation.
      </P>

      <Notice>
        <strong className="text-slate">Important:</strong> Quartz Worktop Finder is a
        directory service only. We do not employ stone masons, perform stone fabrication
        work, or engage in any construction or installation services. We simply provide
        contact information for verified stone mason businesses.
      </Notice>

      <H2>3. User Responsibilities</H2>
      <H3>3.1 Accurate Information</H3>
      <P>
        When using our search function, you agree to provide accurate postcode information
        to find stone masons in your area.
      </P>
      <H3>3.2 Lawful Use</H3>
      <P>
        You agree to use the Service only for lawful purposes and in accordance with these
        Terms. You must not:
      </P>
      <Ul>
        <li>Use the Service in any way that violates any applicable law or regulation</li>
        <li>Scrape, harvest, or collect information from the Service using automated means</li>
        <li>Attempt to gain unauthorized access to any part of the Service</li>
        <li>Use contact information for spam, harassment, or any unlawful purpose</li>
        <li>Misrepresent your identity or affiliation with any person or entity</li>
      </Ul>

      <H2>4. No Endorsement or Guarantee</H2>
      <H3>4.1 Verification Process</H3>
      <P>
        While we make reasonable efforts to verify that listed stone masons are legitimate
        businesses operating in the UK, Quartz Worktop Finder:
      </P>
      <Ul>
        <li>Does not employ, control, or supervise the stone masons listed</li>
        <li>Does not guarantee the quality, safety, or legality of their work</li>
        <li>Does not endorse any particular stone mason or company</li>
        <li>Is not responsible for any disputes between you and stone masons</li>
      </Ul>
      <H3>4.2 Your Responsibility</H3>
      <P>You are solely responsible for:</P>
      <Ul>
        <li>Conducting your own due diligence before hiring any stone mason</li>
        <li>Verifying credentials, insurance, and references</li>
        <li>Negotiating contracts and pricing</li>
        <li>Ensuring work meets building regulations and your requirements</li>
        <li>Resolving any disputes with stone masons directly</li>
      </Ul>

      <Notice>
        <strong className="text-slate">We Strongly Recommend:</strong> Always check that
        stone masons have appropriate insurance, ask for references, obtain written quotes,
        and ensure they comply with all relevant building regulations before commissioning
        any work.
      </Notice>

      <H2>5. Limitation of Liability</H2>
      <H3>5.1 No Warranties</H3>
      <P>
        The Service is provided &quot;as is&quot; and &quot;as available&quot; without
        warranties of any kind, either express or implied, including but not limited to:
      </P>
      <Ul>
        <li>The accuracy, completeness, or reliability of information provided</li>
        <li>The availability or uninterrupted access to the Service</li>
        <li>The quality or suitability of any stone mason listed</li>
      </Ul>
      <H3>5.2 Exclusion of Liability</H3>
      <P>
        To the fullest extent permitted by law, Quartz Worktop Finder shall not be liable
        for:
      </P>
      <Ul>
        <li>Any work performed by stone masons you contact through our Service</li>
        <li>Any disputes, damages, or losses arising from your interactions with stone masons</li>
        <li>The quality, timeliness, or cost of work performed by stone masons</li>
        <li>
          Personal injury, property damage, or financial loss resulting from stone mason
          services
        </li>
        <li>Any errors or omissions in the directory information</li>
        <li>Indirect, incidental, special, consequential, or punitive damages</li>
      </Ul>

      <H2>6. Indemnification</H2>
      <P>
        You agree to indemnify and hold harmless Quartz Worktop Finder, its owners,
        employees, and affiliates from any claims, damages, losses, liabilities, and expenses
        (including legal fees) arising from:
      </P>
      <Ul>
        <li>Your use of the Service</li>
        <li>Your interactions with stone masons listed in the directory</li>
        <li>Any work performed by stone masons you contacted through our Service</li>
        <li>Your violation of these Terms of Service</li>
      </Ul>

      <H2>7. Intellectual Property</H2>
      <P>
        All content on Quartz Worktop Finder, including text, graphics, logos, and
        software, is the property of Quartz Worktop Finder or its content suppliers and is
        protected by UK and international copyright laws.
      </P>
      <P>You may not:</P>
      <Ul>
        <li>Copy, modify, or distribute any content from the Service without permission</li>
        <li>Use our name, logo, or branding without written authorization</li>
        <li>Create derivative works based on our Service</li>
      </Ul>

      <H2>8. Stone Mason Listings</H2>
      <H3>8.1 Accuracy</H3>
      <P>
        We strive to maintain accurate and up-to-date information about listed stone masons.
        However, contact details, service areas, and availability may change without notice.
      </P>
      <H3>8.2 Removal</H3>
      <P>
        We reserve the right to remove any stone mason from our directory at any time, for
        any reason, including but not limited to:
      </P>
      <Ul>
        <li>Complaints about service quality or conduct</li>
        <li>Violation of laws or regulations</li>
        <li>Business closure or cessation of trading</li>
        <li>Request from the stone mason to be delisted</li>
      </Ul>

      <H2>9. Privacy</H2>
      <P>
        Your use of the Service is also governed by our{" "}
        <Link href="/privacy" className="text-gold hover:underline">
          Privacy Policy
        </Link>
        , which explains how we collect, use, and protect your information.
      </P>

      <H2>10. Third-Party Links</H2>
      <P>
        Our Service may contain links to third-party websites (such as stone mason
        websites). We are not responsible for:
      </P>
      <Ul>
        <li>The content or privacy practices of these websites</li>
        <li>Any transactions you conduct with third parties</li>
        <li>The accuracy of information on third-party sites</li>
      </Ul>

      <H2>11. Modifications to Service and Terms</H2>
      <H3>11.1 Service Changes</H3>
      <P>
        We reserve the right to modify, suspend, or discontinue the Service (or any part
        thereof) at any time without notice.
      </P>
      <H3>11.2 Terms Changes</H3>
      <P>
        We may update these Terms of Service from time to time. The &quot;Last
        Updated&quot; date at the top indicates when changes were last made. Your continued
        use of the Service after changes constitutes acceptance of the new terms.
      </P>

      <H2>12. Termination</H2>
      <P>
        We reserve the right to terminate or suspend your access to the Service immediately,
        without prior notice, if you breach these Terms of Service or engage in conduct we
        deem inappropriate or harmful.
      </P>

      <H2>13. Governing Law and Jurisdiction</H2>
      <P>
        These Terms of Service shall be governed by and construed in accordance with the laws
        of England and Wales. Any disputes arising from these terms or your use of the
        Service shall be subject to the exclusive jurisdiction of the courts of England and
        Wales.
      </P>

      <H2>14. Severability</H2>
      <P>
        If any provision of these Terms is found to be unenforceable or invalid, that
        provision shall be limited or eliminated to the minimum extent necessary, and the
        remaining provisions shall remain in full force and effect.
      </P>

      <H2>15. Entire Agreement</H2>
      <P>
        These Terms of Service, together with our Privacy Policy, constitute the entire
        agreement between you and Quartz Worktop Finder regarding the use of the Service.
      </P>

      <H2>16. Consumer Rights</H2>
      <P>
        Nothing in these Terms affects your statutory rights as a consumer under UK law. If
        you are a consumer, you have certain legal rights which cannot be excluded or limited
        by these Terms.
      </P>

      <H2>17. Contact Information</H2>
      <P>If you have any questions about these Terms of Service, please contact us at:</P>
      <p className="mt-5 p-5 bg-page-bg border-l-4 border-gold rounded">
        <strong className="text-slate">Quartz Worktop Finder</strong>
        <br />
        Email: mimorozu@gmail.com
      </p>

      <div className="mt-10">
        <Notice>
          <strong className="text-slate">
            By using Quartz Worktop Finder, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service.
          </strong>
        </Notice>
      </div>
    </LegalLayout>
  );
}
