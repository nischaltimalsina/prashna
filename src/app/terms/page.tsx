import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: April 15, 2025</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          Welcome to SajhaSabha. These Terms of Service ("Terms") govern your use of the SajhaSabha platform,
          including our website, mobile application, and related services (collectively, the "Platform").
          By accessing or using the Platform, you agree to be bound by these Terms.
          If you do not agree to these Terms, please do not use the Platform.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound
          by these Terms, our Privacy Policy, and our Community Guidelines, which are incorporated herein by reference.
          If you are using the Platform on behalf of an organization, you represent and warrant that you have the
          authority to bind that organization to these Terms.
        </p>

        <h2>2. Platform Overview</h2>
        <p>
          SajhaSabha is a civic technology platform designed to promote transparency, accountability, and civic engagement
          in Nepal's democratic processes. The Platform allows users to:
        </p>
        <ul>
          <li>Rate and review elected officials based on their performance</li>
          <li>Access information about elected officials</li>
          <li>Participate in discussions about civic issues</li>
          <li>Join and create campaigns for civic action</li>
          <li>Monitor elected officials' actions and statements</li>
        </ul>

        <h2>3. User Accounts</h2>
        <p>
          3.1. <strong>Registration.</strong> To access certain features of the Platform, you may need to create an account.
          When you register, you agree to provide accurate, current, and complete information.
        </p>
        <p>
          3.2. <strong>Account Security.</strong> You are responsible for maintaining the confidentiality of your account credentials
          and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use
          of your account.
        </p>
        <p>
          3.3. <strong>Verification.</strong> We may use various methods to verify user identities, including phone verification.
          This helps ensure the credibility of the Platform and prevents multiple or fake accounts.
        </p>

        <h2>4. User Conduct</h2>
        <p>
          You agree not to use the Platform to:
        </p>
        <ul>
          <li>Violate any applicable law, regulation, or these Terms</li>
          <li>Post or transmit content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of privacy, or otherwise objectionable</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
          <li>Engage in activities that would constitute a criminal offense or give rise to civil liability</li>
          <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
          <li>Collect or store personal data about other users without their consent</li>
          <li>Post false, misleading, or defamatory content about elected officials or other users</li>
        </ul>

        <h2>5. Content and Submissions</h2>
        <p>
          5.1. <strong>User Content.</strong> By posting, uploading, or submitting content to the Platform, including ratings,
          reviews, comments, and other materials (collectively, "User Content"), you grant us a non-exclusive,
          worldwide, royalty-free, perpetual, irrevocable right to use, reproduce, modify, adapt, publish, translate,
          create derivative works from, distribute, and display such User Content in any media.
        </p>
        <p>
          5.2. <strong>Content Responsibility.</strong> You are solely responsible for your User Content and the consequences
          of posting it. You represent and warrant that:
        </p>
        <ul>
          <li>You own or have the necessary rights to post your User Content</li>
          <li>Your User Content does not violate the rights of any third party, including intellectual property rights, privacy rights, or publicity rights</li>
          <li>Your User Content is accurate and not misleading</li>
          <li>Your User Content complies with these Terms and our Community Guidelines</li>
        </ul>
        <p>
          5.3. <strong>Content Moderation.</strong> We reserve the right, but not the obligation, to monitor, edit, or remove
          any User Content that we determine, in our sole discretion, violates these Terms or is otherwise objectionable.
          We may use automated systems and human moderators to review User Content.
        </p>

        <h2>6. Ratings and Reviews</h2>
        <p>
          6.1. <strong>Honest and Factual Ratings.</strong> You agree to provide honest, factual, and constructive ratings
          and reviews of elected officials. Ratings should be based on your genuine assessment of the official's
          performance in areas such as integrity, responsiveness, effectiveness, and transparency.
        </p>
        <p>
          6.2. <strong>No Defamation.</strong> You agree not to post false or defamatory content about elected officials.
          Criticism should be constructive and based on observable actions, policy positions, or public statements.
        </p>
        <p>
          6.3. <strong>Evidence-Based Reviews.</strong> When possible, provide specific examples or evidence to support your
          ratings and reviews. This helps maintain the credibility and usefulness of the Platform.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          7.1. <strong>Our Intellectual Property.</strong> The Platform and its original content, features, and functionality are
          owned by SajhaSabha and are protected by international copyright, trademark, patent, trade secret, and other
          intellectual property or proprietary rights laws.
        </p>
        <p>
          7.2. <strong>Limited License.</strong> We grant you a limited, non-exclusive, non-transferable, and revocable license
          to use the Platform for its intended purposes, subject to these Terms.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and disclose information
          about you. By using the Platform, you consent to the processing of your information as explained in our
          Privacy Policy.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          9.1. <strong>Platform Provided "As Is."</strong> The Platform is provided on an "as is" and "as available" basis.
          We make no warranties, expressed or implied, regarding the operation of the Platform or the information,
          content, or materials included on the Platform.
        </p>
        <p>
          9.2. <strong>Accuracy of Information.</strong> While we strive to provide accurate information about elected officials
          and public matters, we do not guarantee the accuracy, completeness, or usefulness of this information.
          Users should verify information independently before making decisions based on it.
        </p>
        <p>
          9.3. <strong>User Content Disclaimer.</strong> We do not endorse or guarantee the accuracy of User Content.
          Ratings, reviews, and comments reflect the opinions of individual users and not the views of SajhaSabha.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, SajhaSabha and its officers, directors, employees, and agents
          shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any
          loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
          or other intangible losses resulting from:
        </p>
        <ul>
          <li>Your use of or inability to use the Platform</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
          <li>Any interruption or cessation of transmission to or from the Platform</li>
          <li>Any content obtained from the Platform</li>
          <li>User Content or the defamatory, offensive, or illegal conduct of any third party</li>
        </ul>

        <h2>11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless SajhaSabha and its officers, directors, employees, and
          agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
          fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms
          or your use of the Platform, including your User Content.
        </p>

        <h2>12. Modifications to the Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
          posting the new Terms on the Platform and updating the "Last updated" date. Your continued use of the
          Platform after such modifications constitutes your acceptance of the revised Terms.
        </p>

        <h2>13. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Platform immediately, without prior notice or
          liability, for any reason, including, without limitation, if you breach these Terms. Upon termination,
          your right to use the Platform will immediately cease.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to
          its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the
          courts located in Kathmandu, Nepal.
        </p>

        <h2>15. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          Email: legal@sajhasabha.com<br />
          Address: Civic Tech Nepal, Thamel, Kathmandu, Nepal
        </p>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row gap-4 justify-center py-4">
        <Button variant="outline" asChild>
          <Link href="/privacy">Privacy Policy</Link>
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
