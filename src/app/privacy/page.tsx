import type { Metadata } from "next";
import { LegalLayout, H2, H3, P, Ul } from "@/components/LegalLayout";
import { formatOrdinalDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Kitchen Worktop Experts - How we collect, use and protect your data when using our stone mason directory service.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated={formatOrdinalDate(new Date())}>
      <P>
        Kitchen Worktop Experts (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
        committed to protecting your privacy. This Privacy Policy explains how we collect,
        use, and safeguard your information when you use our stone mason directory service.
      </P>

      <H2>1. Information We Collect</H2>

      <H3>1.1 Information You Provide</H3>
      <P>When you use our search function, we may collect:</P>
      <Ul>
        <li>Postcode information entered into our search tool</li>
        <li>Any contact information if you choose to reach out to us directly</li>
      </Ul>

      <H3>1.2 Automatically Collected Information</H3>
      <P>When you interact with our directory, we automatically collect:</P>
      <Ul>
        <li>
          <strong className="text-slate">Usage Data:</strong> Which stone masons you view
          contact details for
        </li>
        <li>
          <strong className="text-slate">IP Address:</strong> Your internet protocol address
          for security and analytics purposes
        </li>
        <li>
          <strong className="text-slate">Click Data:</strong> When you click to reveal
          contact details or visit stone mason websites
        </li>
        <li>
          <strong className="text-slate">Search Data:</strong> Postcodes you search to help
          us improve our service coverage
        </li>
      </Ul>

      <H2>2. How We Use Your Information</H2>
      <P>We use the collected information for the following purposes:</P>
      <Ul>
        <li>
          <strong className="text-slate">Service Provision:</strong> To connect you with
          verified stone masons in your area
        </li>
        <li>
          <strong className="text-slate">Analytics:</strong> To understand which stone
          masons are receiving the most interest and improve our directory
        </li>
        <li>
          <strong className="text-slate">Service Improvement:</strong> To identify areas
          where we need more stone mason coverage
        </li>
        <li>
          <strong className="text-slate">Security:</strong> To prevent abuse and protect our
          service integrity
        </li>
      </Ul>

      <H2>3. Information Sharing</H2>
      <P>
        We do not sell, trade, or rent your personal information to third parties. We may
        share information in the following limited circumstances:
      </P>
      <Ul>
        <li>
          <strong className="text-slate">With Stone Masons:</strong> When you click to reveal
          a stone mason&apos;s contact details, we log this interaction so the stone mason
          knows you found them through our directory
        </li>
        <li>
          <strong className="text-slate">Legal Requirements:</strong> If required by law or
          to protect our rights and safety
        </li>
        <li>
          <strong className="text-slate">Anonymized Data:</strong> We may share aggregated,
          anonymized statistics about directory usage
        </li>
      </Ul>

      <H2>4. Cookies and Tracking</H2>
      <P>
        We use Google Analytics to understand how visitors use our directory — for example,
        which pages are viewed and how visitors found our site. Google Analytics sets cookies
        only after you give consent via the cookie banner shown on your first visit; if you
        decline, no analytics cookies are set.
      </P>
      <P>
        You can change your choice at any time by clearing your browser&apos;s cookies for
        this site, which will show the consent banner again on your next visit.
      </P>

      <H2>5. Data Retention</H2>
      <P>We retain your search and click data for analytics purposes. This data helps us:</P>
      <Ul>
        <li>Demonstrate value to stone masons listed in our directory</li>
        <li>Identify popular service areas</li>
        <li>Improve our directory coverage</li>
      </Ul>
      <P>
        Your IP address and postcode search data is retained for a maximum of 24 months.
      </P>

      <H2>6. Your Rights (GDPR)</H2>
      <P>Under UK data protection law (GDPR), you have the following rights:</P>
      <Ul>
        <li>
          <strong className="text-slate">Right to Access:</strong> Request a copy of the
          personal data we hold about you
        </li>
        <li>
          <strong className="text-slate">Right to Rectification:</strong> Request correction
          of inaccurate data
        </li>
        <li>
          <strong className="text-slate">Right to Erasure:</strong> Request deletion of your
          personal data
        </li>
        <li>
          <strong className="text-slate">Right to Object:</strong> Object to our processing
          of your data
        </li>
        <li>
          <strong className="text-slate">Right to Data Portability:</strong> Request transfer
          of your data
        </li>
      </Ul>
      <P>To exercise any of these rights, please contact us using the details below.</P>

      <H2>7. Third-Party Links</H2>
      <P>
        Our directory contains links to stone mason websites. We are not responsible for the
        privacy practices of these third-party websites. We encourage you to review their
        privacy policies.
      </P>

      <H2>8. Children&apos;s Privacy</H2>
      <P>
        Our service is not intended for children under 16 years of age. We do not knowingly
        collect personal information from children.
      </P>

      <H2>9. Security</H2>
      <P>
        We implement appropriate technical and organizational measures to protect your
        personal information. However, no method of transmission over the internet is 100%
        secure, and we cannot guarantee absolute security.
      </P>

      <H2>10. Changes to This Privacy Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. The &quot;Last Updated&quot; date
        at the top of this page indicates when it was last revised. We encourage you to
        review this policy periodically.
      </P>

      <H2>11. Contact Us</H2>
      <P>
        If you have any questions about this Privacy Policy or wish to exercise your data
        protection rights, please contact us at:
      </P>
      <p className="mt-5 p-5 bg-page-bg border-l-4 border-gold rounded">
        <strong className="text-slate">Kitchen Worktop Experts</strong>
        <br />
        Email: mimorozu@gmail.com
      </p>

      <p className="mt-8 pt-8 border-t border-border text-muted text-sm">
        This privacy policy complies with UK GDPR and Data Protection Act 2018 requirements.
      </p>
    </LegalLayout>
  );
}
