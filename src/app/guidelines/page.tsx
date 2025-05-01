import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Ban } from "lucide-react";

export default function CommunityGuidelinesPage() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Community Guidelines</h1>
        <p className="text-muted-foreground">Last updated: April 15, 2025</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          SajhaSabha is dedicated to fostering constructive civic engagement and democratic accountability in Nepal.
          These Community Guidelines are designed to ensure our platform remains a respectful, factual, and
          productive space for all users. By using SajhaSabha, you agree to follow these guidelines and help us
          maintain a positive community.
        </p>

        <h2>Our Core Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Evidence-Based</h3>
                  <p className="text-muted-foreground text-sm">
                    Ratings and comments should be based on verifiable facts, observable actions, and demonstrable outcomes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Constructive</h3>
                  <p className="text-muted-foreground text-sm">
                    Focus on providing feedback that helps improve governance and accountability, not on personal attacks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Respectful</h3>
                  <p className="text-muted-foreground text-sm">
                    Engage with others in a civil manner, even when disagreeing strongly on political issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2>1. Rating and Reviewing Officials</h2>

        <h3>1.1. Encouraged Behaviors</h3>
        <ul>
          <li><strong>Provide specific examples</strong> to support your ratings and reviews</li>
          <li><strong>Focus on actions and policies</strong> rather than personal characteristics</li>
          <li><strong>Rate based on performance</strong> in areas such as integrity, responsiveness, effectiveness, and transparency</li>
          <li><strong>Update your ratings</strong> as circumstances or performance changes</li>
          <li><strong>Include links to credible sources</strong> when referencing specific events or statements</li>
        </ul>

        <h3>1.2. Prohibited Behaviors</h3>
        <ul>
          <li><strong>False or misleading content:</strong> Deliberately posting inaccurate information about officials</li>
          <li><strong>Defamation:</strong> Making false statements that harm an official's reputation</li>
          <li><strong>Personal attacks:</strong> Focusing on personal characteristics rather than professional actions</li>
          <li><strong>Hate speech:</strong> Attacks based on ethnicity, religion, gender, caste, or other protected characteristics</li>
          <li><strong>Coordinated manipulation:</strong> Organizing groups to artificially inflate or deflate ratings</li>
        </ul>

        <h3>1.3. Rating Criteria</h3>
        <p>
          When rating officials, consider the following dimensions:
        </p>
        <ul>
          <li><strong>Integrity:</strong> Honesty, ethical conduct, and consistency between words and actions</li>
          <li><strong>Responsiveness:</strong> Communication with citizens and addressing constituent concerns</li>
          <li><strong>Effectiveness:</strong> Ability to achieve policy objectives and deliver results</li>
          <li><strong>Transparency:</strong> Openness about decisions, actions, and public information</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg not-prose my-6">
          <h4 className="font-medium mb-2">Example of a Good Review</h4>
          <p className="text-sm mb-4">
            "MP Sharma has been responsive to constituent concerns about water infrastructure (4/5). She held three public meetings in our area this year and personally followed up on issues raised. However, her transparency could improve (3/5) as budget allocations for the new pipeline project haven't been fully disclosed despite requests."
          </p>
          <h4 className="font-medium mb-2">Example of an Unacceptable Review</h4>
          <p className="text-sm">
            "MP Sharma is terrible and corrupt. Everyone knows she's just in it for herself and her family. Don't trust anything she says."
          </p>
        </div>

        <h2>2. Discussions and Comments</h2>

        <h3>2.1. Encouraged Behaviors</h3>
        <ul>
          <li><strong>Engage respectfully</strong> with others, even when disagreeing</li>
          <li><strong>Stay on topic</strong> and relevant to the discussion</li>
          <li><strong>Provide thoughtful perspectives</strong> that add value to the conversation</li>
          <li><strong>Fact-check before posting</strong> and cite sources when appropriate</li>
          <li><strong>Acknowledge different viewpoints</strong> and seek to understand diverse perspectives</li>
        </ul>

        <h3>2.2. Prohibited Behaviors</h3>
        <ul>
          <li><strong>Harassment:</strong> Targeting specific users with unwanted or aggressive comments</li>
          <li><strong>Trolling:</strong> Deliberately posting inflammatory content to provoke emotional responses</li>
          <li><strong>Spam:</strong> Posting irrelevant, repetitive, or promotional content</li>
          <li><strong>Impersonation:</strong> Pretending to be someone else</li>
          <li><strong>Doxing:</strong> Revealing private information about others without consent</li>
        </ul>

        <h2>3. Evidence and Verification</h2>

        <h3>3.1. Submissions and Evidence</h3>
        <ul>
          <li><strong>Verify information</strong> before posting it on the platform</li>
          <li><strong>Provide context</strong> for evidence you submit (e.g., date, location, relevance)</li>
          <li><strong>Respect copyright and privacy</strong> when sharing documents, images, or other media</li>
          <li><strong>Indicate the source</strong> of information when possible</li>
          <li><strong>Be clear about what is fact vs. opinion</strong> in your submissions</li>
        </ul>

        <h3>3.2. Types of Acceptable Evidence</h3>
        <ul>
          <li><strong>Public records:</strong> Official government documents, voting records, attendance records</li>
          <li><strong>Media reports:</strong> Articles from reputable news sources</li>
          <li><strong>Public statements:</strong> Speeches, press releases, social media posts from official accounts</li>
          <li><strong>Verified images/videos:</strong> Of public events, infrastructure projects, etc.</li>
          <li><strong>Budget documents:</strong> Public financial records and expenditure reports</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg not-prose my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Important Note on Evidence</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Before submitting evidence, ensure it is from a public source and doesn't violate any privacy laws.
                Do not share confidential government documents, personal communications, or information obtained
                through unauthorized means.
              </p>
            </div>
          </div>
        </div>

        <h2>4. Account and Identity Verification</h2>

        <p>
          To maintain the credibility of the platform and prevent manipulation, we require users to verify their
          identity before posting ratings, reviews, or participating in campaigns. This verification is designed
          to be secure while respecting user privacy.
        </p>

        <h3>4.1. Verification Guidelines</h3>
        <ul>
          <li><strong>Provide accurate information</strong> during the verification process</li>
          <li><strong>Do not create multiple accounts</strong> or attempt to circumvent verification</li>
          <li><strong>Report suspicious accounts</strong> that appear to be fake or engaging in manipulation</li>
          <li><strong>Protect your account credentials</strong> and do not share them with others</li>
          <li><strong>Update your verification information</strong> if it changes</li>
        </ul>

        <h3>4.2. Privacy Protection</h3>
        <p>
          While we verify user identities, we understand the importance of privacy and anonymity in political discourse.
          Therefore:
        </p>
        <ul>
          <li>You can use a pseudonym or username for your public profile</li>
          <li>Your verification details are not shared publicly</li>
          <li>You control what personal information is visible to other users</li>
        </ul>

        <h2>5. Campaigns and Collective Action</h2>

        <h3>5.1. Campaign Guidelines</h3>
        <ul>
          <li><strong>Focus on specific, actionable goals</strong> related to governance and public policy</li>
          <li><strong>Provide clear, factual information</strong> about the issue being addressed</li>
          <li><strong>Be transparent about campaign sponsors</strong> and organizers</li>
          <li><strong>Update supporters</strong> on progress and outcomes</li>
          <li><strong>Respect the democratic process</strong> and advocate through legitimate channels</li>
        </ul>

        <h3>5.2. Prohibited Campaign Content</h3>
        <ul>
          <li><strong>Calls for illegal actions</strong> or violence</li>
          <li><strong>Misinformation</strong> about public officials or policy issues</li>
          <li><strong>Hateful or discriminatory</strong> content or objectives</li>
          <li><strong>Campaigns targeting private individuals</strong> rather than public officials</li>
          <li><strong>Fundraising</strong> for unauthorized purposes or without proper disclosure</li>
        </ul>

        <h2>6. Enforcement and Moderation</h2>

        <p>
          To maintain these community standards, we employ both automated systems and human moderators to review content.
          Violations of these guidelines may result in the following actions, depending on the severity and frequency:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium mb-2 text-yellow-800 dark:text-yellow-300 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Warning
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              For minor or first-time violations, users will receive a warning explaining the violation and how to avoid it in the future.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-medium mb-2 text-orange-800 dark:text-orange-300 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Content Removal
            </h4>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Content that clearly violates our guidelines will be removed. The user will be notified of the removal and the reason.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-medium mb-2 text-red-800 dark:text-red-300 flex items-center">
              <Ban className="h-4 w-4 mr-2" />
              Account Sanctions
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400">
              Repeated or severe violations may result in temporary restrictions or permanent suspension of account privileges.
            </p>
          </div>
        </div>

        <h3>6.1. Appeals Process</h3>
        <p>
          If you believe that moderation action was taken in error, you can appeal through the following process:
        </p>
        <ol>
          <li>Submit an appeal through the "Appeal" option in your account dashboard</li>
          <li>Provide a clear explanation of why you believe the action was incorrect</li>
          <li>Include any relevant context or evidence to support your appeal</li>
          <li>Appeals are reviewed by a different moderator than the one who took the original action</li>
          <li>You will receive a response to your appeal within 5 business days</li>
        </ol>

        <h3>6.2. Oversight Board</h3>
        <p>
          For cases involving significant content policy questions, or for repeated appeals, matters may be
          referred to our independent Oversight Board, which consists of representatives from civil society
          organizations, legal experts, and community members. The Board reviews complex moderation decisions
          and helps refine our Community Guidelines over time.
        </p>

        <h2>7. Reporting Violations</h2>

        <p>
          If you encounter content that violates these guidelines, please report it using the reporting
          tools available throughout the platform. When reporting, please:
        </p>
        <ul>
          <li>Select the appropriate reason for the report</li>
          <li>Provide additional context that might help moderators understand the violation</li>
          <li>Report only genuine violations, not content you simply disagree with</li>
        </ul>

        <p>
          Reports are reviewed by our moderation team in accordance with our guidelines, typically within 24-48 hours.
        </p>

        <h2>8. Updates to Community Guidelines</h2>

        <p>
          These Community Guidelines may be updated periodically to address new challenges, incorporate feedback,
          and improve the platform experience. Major changes will be announced on the platform, and users are
          encouraged to review the guidelines regularly.
        </p>

        <h2>9. Contact and Feedback</h2>

        <p>
          We welcome feedback on these Community Guidelines. If you have suggestions for improvement or
          questions about specific policies, please contact us at:
        </p>
        <p>
          Email: community@sajhasabha.com<br />
          Subject: Community Guidelines Feedback
        </p>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row gap-4 justify-center py-4">
        <Button variant="outline" asChild>
          <Link href="/terms">Terms of Service</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/privacy">Privacy Policy</Link>
        </Button>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
