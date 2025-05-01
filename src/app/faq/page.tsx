import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, ShieldCheck, ThumbsUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SajhaSabha",
  description: "Find answers to common questions about SajhaSabha - the civic platform for democratic accountability in Nepal.",
};

export default function FAQPage() {

  return (
    <div className="px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-center mb-10">
          Find answers to common questions about using SajhaSabha
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <div className="space-y-4 sticky top-24">
              <h3 className="font-medium">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-sm hover:underline">About SajhaSabha</a>
                </li>
                <li>
                  <a href="#ratings" className="text-sm hover:underline">Ratings & Reviews</a>
                </li>
                <li>
                  <a href="#verification" className="text-sm hover:underline">Verification & Trust</a>
                </li>
                <li>
                  <a href="#actions" className="text-sm hover:underline">Actions & Campaigns</a>
                </li>
                <li>
                  <a href="#account" className="text-sm hover:underline">Account & Privacy</a>
                </li>
                <li>
                  <a href="#technical" className="text-sm hover:underline">Technical Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-4 space-y-10">
            <section id="about" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">About SajhaSabha</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is SajhaSabha?</AccordionTrigger>
                <AccordionContent>
                  SajhaSabha ("Common Assembly" in Nepali) is a civic technology platform designed to empower Nepali citizens to rate, review, and engage with their elected officials. Our goal is to foster transparency, accountability, and civic engagement in Nepal's democratic processes by providing tools for citizens to offer feedback to officials, track promises, and collectively advocate for positive change.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Who is behind SajhaSabha?</AccordionTrigger>
                <AccordionContent>
                  SajhaSabha was founded by a team of Nepali civic technologists, democracy advocates, and professionals committed to strengthening democratic accountability. The platform is operated by Civic Tech Nepal, a non-partisan organization dedicated to using technology to enhance civic participation. We are transparent about our funding sources and governance structure, which you can find on our About page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is SajhaSabha affiliated with any political party?</AccordionTrigger>
                <AccordionContent>
                  No, SajhaSabha is strictly non-partisan. We do not endorse any political party, ideology, or candidate. Our commitment is to democratic processes and civic engagement regardless of political affiliation. We have measures in place to ensure the platform remains neutral, including diverse oversight and transparent moderation policies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How is SajhaSabha funded?</AccordionTrigger>
                <AccordionContent>
                  SajhaSabha is primarily funded through grants from international organizations supporting democracy and civic tech initiatives, as well as contributions from Nepali civil society organizations. In the future, we plan to develop sustainable revenue streams through premium API access and partnerships while ensuring our core services remain free for all citizens. We maintain strict editorial independence from all funding sources.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Which officials can I find on SajhaSabha?</AccordionTrigger>
                <AccordionContent>
                  SajhaSabha includes profiles for elected officials at all levels of Nepal's government: federal (Members of Parliament), provincial (Provincial Assembly Members), and local (Mayors, Ward Chairpersons, etc.). We continuously update our database as elections occur and new officials take office. If you notice a missing official, you can submit their information through our "Suggest an Official" form.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          <section id="ratings" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does the rating system work?</AccordionTrigger>
                <AccordionContent>
                  Our rating system allows citizens to evaluate elected officials on four key dimensions: Integrity, Responsiveness, Effectiveness, and Transparency. Each dimension is rated on a scale of 1-5, and these ratings are combined to create an overall score. Users can also provide specific examples and comments to support their ratings. The system is designed to encourage thoughtful, evidence-based feedback rather than simple approval/disapproval.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Who can rate officials?</AccordionTrigger>
                <AccordionContent>
                  Any verified Nepali citizen can rate officials on SajhaSabha. To ensure the integrity of ratings, we require users to verify their identity through phone verification or community vouching. This prevents multiple ratings from the same person and reduces the risk of fake accounts. While we verify identities, users can still maintain privacy by using pseudonyms for their public profiles.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do you prevent fake or biased ratings?</AccordionTrigger>
                <AccordionContent>
                  We employ several measures to maintain rating integrity: (1) User verification to prevent multiple accounts, (2) Anti-brigading algorithms to detect coordinated rating manipulation, (3) Report mechanisms for users to flag suspicious ratings, (4) Human moderation of flagged content, and (5) Requirements for specific examples to support extremely positive or negative ratings. These systems help ensure ratings reflect genuine citizen feedback rather than organized campaigns.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can officials respond to ratings?</AccordionTrigger>
                <AccordionContent>
                  Yes, verified elected officials can claim their profiles and respond to ratings and reviews. This enables a constructive dialogue between citizens and their representatives. Official responses are clearly labeled and appear alongside the original ratings. Officials cannot remove ratings unless they violate our Community Guidelines, but they can provide their perspective and clarifications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What should I include in an effective review?</AccordionTrigger>
                <AccordionContent>
                  An effective review includes specific examples of an official's actions or policies, factual information that can be verified, observations of their behavior in public service, and a fair assessment across multiple dimensions of performance. Focus on their role as a public servant rather than personal characteristics. When possible, include dates, contexts, and sources for your observations. Avoid generalizations, purely partisan assessments, or personal attacks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          <section id="verification" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Verification & Trust</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does user verification work?</AccordionTrigger>
                <AccordionContent>
                  We use a two-step verification process: first, phone verification through an SMS code sent to a Nepali mobile number; second, for certain actions like creating campaigns, we may require additional verification through community vouching or document verification. This approach balances security with accessibility, especially for users in areas with limited internet access or technical familiarity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How are official profiles verified?</AccordionTrigger>
                <AccordionContent>
                  Official profiles display a verification badge once we've confirmed the identity of the elected official. This verification process involves official documentation (government ID, election commission credentials) and cross-referencing with official government records. For high-profile officials, we may also use trusted institutional partners to confirm identity. Verified officials can claim their profiles and respond to citizen feedback.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do you ensure information accuracy?</AccordionTrigger>
                <AccordionContent>
                  We maintain information accuracy through several mechanisms: (1) Sourcing official data directly from government records, election commissions, and parliamentary documents; (2) Partnering with fact-checking organizations to verify user submissions; (3) Allowing verified officials to correct factual errors; (4) Enabling community reporting of inaccuracies; and (5) Regular audits and updates of our database. Factual claims in ratings and reviews must be supportable with evidence.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use SajhaSabha anonymously?</AccordionTrigger>
                <AccordionContent>
                  While we require identity verification to prevent abuse, you can participate pseudonymously on SajhaSabha. Your real identity is verified privately during account creation, but you can choose a username for your public profile and interactions. Your real name, phone number, and verification details are never shared publicly. This approach protects user privacy while maintaining platform integrity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How is content moderated?</AccordionTrigger>
                <AccordionContent>
                  Content moderation involves both automated systems and human reviewers. Our AI identifies potentially problematic content based on our Community Guidelines, which is then reviewed by trained moderators. Flagged content goes through a two-tier review process, with complex cases referred to an independent Oversight Board. We aim for consistency, transparency, and fairness in moderation decisions, with clear reasons provided for any content removal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          <section id="actions" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Actions & Campaigns</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are action campaigns?</AccordionTrigger>
                <AccordionContent>
                  Action campaigns are collective citizen initiatives focused on specific issues or policy goals. They enable citizens to organize around shared concerns, gather support, and communicate collectively with elected officials. Campaigns can address local issues (e.g., water access in a specific district) or national policies (e.g., educational reform). Each campaign includes clear objectives, target officials, and progress tracking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I start a campaign?</AccordionTrigger>
                <AccordionContent>
                  To start a campaign, you need a verified account with good standing. From the Actions page, click "Start a Campaign" and follow the guided process: (1) Define the issue and specific goals, (2) Identify target officials, (3) Provide supporting evidence and context, (4) Set clear success metrics. All campaigns undergo moderation to ensure they comply with our Community Guidelines before becoming public. Focus on specific, actionable objectives related to governance and public policy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How are campaign outcomes tracked?</AccordionTrigger>
                <AccordionContent>
                  Campaign outcomes are tracked through several mechanisms: (1) Official responses from targeted representatives, (2) Documented policy or action changes, (3) Implementation milestones for specific projects, and (4) Community updates from campaign participants. Campaign creators can post verified updates, and officials can provide official responses. This creates a transparent record of progress and accountability for both citizens and representatives.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What makes an effective campaign?</AccordionTrigger>
                <AccordionContent>
                  Effective campaigns share several characteristics: (1) Specific, achievable objectives rather than broad demands, (2) Clear evidence documenting the issue, (3) Respectful, solution-oriented framing, (4) Relevant targeting of officials with actual authority over the issue, (5) Regular updates and engagement with supporters, and (6) Willingness to engage constructively with official responses. The most successful campaigns focus on local issues with tangible impacts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can officials respond to campaigns?</AccordionTrigger>
                <AccordionContent>
                  Yes, verified officials can respond directly to campaigns that target them. Their responses are prominently displayed on the campaign page and sent to all campaign supporters. Officials can provide updates on actions taken, clarify constraints or timelines, or engage directly with campaign organizers. This two-way communication is a core feature of SajhaSabha, creating structured dialogue between citizens and representatives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          <section id="account" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Account & Privacy</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  To create an account, click the "Sign Up" button on the homepage or navigation bar. You'll need to provide a username, email address, and phone number for verification. After submitting this information, you'll receive an SMS with a verification code. Once verified, you can complete your profile by adding optional information like your location and areas of interest. Basic accounts allow you to rate officials and join campaigns.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What information is visible on my public profile?</AccordionTrigger>
                <AccordionContent>
                  By default, only your username and activity (ratings, reviews, campaign participation) are visible on your public profile. You control what additional information to display, such as your location, interests, or a short bio. Your real name, email, phone number, and verification details are never publicly visible. You can review and adjust your privacy settings at any time through your account dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How can I delete my account?</AccordionTrigger>
                <AccordionContent>
                  To delete your account, go to Settings &gt; Account &gt; Delete Account. You'll need to confirm your decision and may be asked for feedback. Account deletion permanently removes your personal information, but your public contributions (ratings, reviews, comments) may remain on the platform in an anonymized form. If you wish to remove specific content before deleting your account, you can do so individually through your activity history.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How is my personal information protected?</AccordionTrigger>
                <AccordionContent>
                  We implement strong data protection measures including: (1) Encryption of sensitive information both in transit and at rest, (2) Strict access controls for our team members, (3) Regular security audits and testing, (4) Compliance with global privacy standards, and (5) Minimized data collection and retention. We never sell your personal information to third parties. For complete details, please review our Privacy Policy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use SajhaSabha in my local language?</AccordionTrigger>
                <AccordionContent>
                  Yes, SajhaSabha is available in multiple languages spoken in Nepal. Currently, we support Nepali, Maithili, and English, with plans to add Bhojpuri and other local languages. You can change your language preference from the settings menu. We work with native speakers to ensure high-quality translations, particularly for specialized civic and political terminology.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          <Separator className="my-8" />

          <section id="technical" className="mb-10 scroll-m-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Technical Support</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I access SajhaSabha?</AccordionTrigger>
                <AccordionContent>
                  SajhaSabha is accessible through multiple channels: (1) Our website at sajhasabha.com, optimized for both desktop and mobile browsers, (2) Android and iOS mobile apps available in their respective app stores, and (3) For users with limited internet access, basic features are available via SMS. We also offer a low-bandwidth version of the website for areas with slow internet connections.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What should I do if I encounter a technical issue?</AccordionTrigger>
                <AccordionContent>If you encounter a technical issue, please: (1) Check our status page at status.sajhasabha.com to see if there's a known outage, (2) Try refreshing the page or restarting the app, (3) Clear your browser cache if using the website, (4) Report the issue through the "Report a Problem" link in the footer or via your account settings. When reporting, please include details about your device, browser/app version, and the specific actions that triggered the issue.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How can I use SajhaSabha via SMS?</AccordionTrigger>
                <AccordionContent>
                  Our SMS service allows basic interaction with SajhaSabha for users with limited internet access. Text "START" to 9801XXXXXX to begin. You can then use commands like "FIND [Official Name]" to get information about officials, "RATE [Official ID] [Score 1-5]" to submit a simple rating, or "JOIN [Campaign ID]" to support a campaign. Text "HELP" for a complete list of commands. Standard SMS rates from your carrier apply.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data usage monitored when using SajhaSabha?</AccordionTrigger>
                <AccordionContent>
                  We collect standard usage analytics to improve our platform, including pages visited, features used, and system performance. This data is anonymized and used solely for platform improvements. We do not track your activity outside of SajhaSabha, sell your browsing data, or use invasive tracking technologies. You can adjust your analytics preferences in your account settings, including opting out of non-essential data collection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer an API for developers?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a public API that provides access to non-personal, aggregated data from SajhaSabha, such as official ratings, campaign statistics, and public representative information. The basic API is free with rate limits, while premium access is available for researchers, journalists, and civic organizations. All API users must register and agree to our data use terms. Documentation is available at developers.sajhasabha.com.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          </div>
        </div>


        <div className="mt-12 p-6 border rounded-lg bg-muted/30 text-center">
          <h2 className="text-lg font-medium mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            If you couldn't find what you were looking for, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Contact Us
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Back to Home
            </Link>
          </div>
        </div>
    </div>
  );
}
