import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: April 15, 2025</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          SajhaSabha ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our website, mobile application,
          and related services (collectively, the "Platform").
        </p>
        <p>
          Please read this Privacy Policy carefully. By using the Platform, you consent to the collection, use, and
          disclosure of your information as described in this Privacy Policy. If you do not agree with our policies
          and practices, please do not use the Platform.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect several types of information from and about users of our Platform:
        </p>

        <h3>1.1. Information You Provide to Us</h3>
        <ul>
          <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, phone number, and password.</li>
          <li><strong>Profile Information:</strong> Information you provide in your user profile, such as your location, interests, and profile picture.</li>
          <li><strong>Content Contributions:</strong> Ratings, reviews, comments, discussions, and other content you post on the Platform.</li>
          <li><strong>Communications:</strong> Information you provide when you contact us, participate in surveys, or respond to questionnaires.</li>
          <li><strong>Verification Information:</strong> Information used to verify your identity, such as your phone number or community references.</li>
        </ul>

        <h3>1.2. Information We Collect Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Information about your interactions with the Platform, such as the pages you visit, features you use, and actions you take.</li>
          <li><strong>Device Information:</strong> Information about the device you use to access the Platform, including device type, operating system, browser type, and IP address.</li>
          <li><strong>Location Information:</strong> General location information derived from your IP address or, with your consent, more precise location information.</li>
          <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar technologies. For more information, see our Cookie Policy.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including:
        </p>
        <ul>
          <li><strong>Providing the Platform:</strong> To operate, maintain, and improve the Platform and its features.</li>
          <li><strong>User Authentication:</strong> To verify your identity, maintain your account, and ensure the security of the Platform.</li>
          <li><strong>Communication:</strong> To communicate with you about the Platform, respond to your inquiries, and send you updates and notifications.</li>
          <li><strong>Personalization:</strong> To personalize your experience on the Platform, such as showing you relevant content and representatives.</li>
          <li><strong>Analytics:</strong> To analyze usage patterns, trends, and preferences to improve the Platform and develop new features.</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
          <li><strong>Enforcement:</strong> To enforce our Terms of Service, Community Guidelines, and other policies.</li>
          <li><strong>Safety and Security:</strong> To protect the safety, integrity, and security of the Platform, our users, and the public.</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>
          We may share your information in the following circumstances:
        </p>
        <ul>
          <li><strong>Public Content:</strong> Ratings, reviews, comments, and other content you post on the Platform may be visible to other users and the public.</li>
          <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, customer service, and marketing.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
          <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information against
          unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
          the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for limiting
          access to your device. If you believe your account has been compromised, please contact us immediately.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required or permitted by law. The criteria used to determine
          our retention periods include:
        </p>
        <ul>
          <li>The length of time we have an ongoing relationship with you</li>
          <li>Whether there is a legal obligation to which we are subject</li>
          <li>Whether retention is advisable in light of our legal position (such as for statutes of limitations, litigation, or regulatory investigations)</li>
        </ul>

        <h2>6. Your Privacy Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information:
        </p>

        <h3>6.1. Rights for All Users</h3>
        <ul>
          <li><strong>Access:</strong> You can request access to the personal information we have about you.</li>
          <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information about you.</li>
          <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
          <li><strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us.</li>
        </ul>

        <h3>6.2. Additional Rights for Users in Certain Jurisdictions</h3>
        <p>
          Users in certain jurisdictions may have additional rights under applicable law. If you are a resident
          of such a jurisdiction, please contact us for more information about your specific rights.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          The Platform is not intended for use by persons under the age of 16. We do not knowingly collect
          personal information from persons under 16. If you are a parent or guardian and believe that your
          child has provided us with personal information, please contact us so that we can take appropriate action.
        </p>

        <h2>8. Third-Party Links and Services</h2>
        <p>
          The Platform may contain links to third-party websites and services. We are not responsible for the
          privacy practices or content of these third parties. We encourage you to review the privacy policies
          of any third-party websites or services you access through the Platform.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
          updated Privacy Policy on the Platform and updating the "Last updated" date. Your continued use of
          the Platform after such changes constitutes your acceptance of the revised Privacy Policy.
        </p>

        <h2>10. Data Processing in Nepal and International Transfers</h2>
        <p>
          We are based in Nepal, and the information we collect is governed by Nepali law. If you are accessing
          the Platform from outside Nepal, please be aware that your information may be transferred to, stored,
          and processed in Nepal or other countries where our servers are located. By using the Platform, you
          consent to the transfer of your information to countries outside your country of residence, which may
          have different data protection rules than your country.
        </p>

        <h2>11. Anonymous Use</h2>
        <p>
          We understand the importance of protecting users' identities, particularly in contexts where political
          expression might be sensitive. While we require verification of your identity to ensure platform integrity,
          your public activity on the platform (ratings, comments, etc.) can be done under a pseudonym or username
          without revealing your real identity to other users. Your real identity is kept confidential and is only
          used for verification purposes.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
          please contact us at:
        </p>
        <p>
          Email: privacy@sajhasabha.com<br />
          Address: Civic Tech Nepal, Thamel, Kathmandu, Nepal<br />
          Phone: +977-1-XXXXXXX
        </p>
        <p>
          We will respond to your request within a reasonable timeframe.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row gap-4 justify-center py-4">
        <Button variant="outline" asChild>
          <Link href="/terms">Terms of Service</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/guidelines">Community Guidelines</Link>
        </Button>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
