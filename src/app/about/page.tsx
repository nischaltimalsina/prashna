import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, User, ShieldCheck, BarChart4 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About SajhaSabha</h1>
          <p className="text-xl text-muted-foreground">
            A civic platform empowering Nepali citizens to rate, review, and engage with their elected officials
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            SajhaSabha ("Common Assembly" in Nepali) creates transparency and accountability in Nepal's democratic system through a platform that bridges the gap between citizens and their representatives.
          </p>
          <p className="text-lg mb-4">
            We believe that democracy works best when citizens have meaningful ways to engage with their elected officials beyond election cycles. SajhaSabha provides the tools for citizens to offer constructive feedback to officials, track promises, and collectively advocate for positive change.
          </p>
          <p className="text-lg">
            By fostering a culture of continuous engagement, we aim to strengthen Nepal's democracy and improve governance through informed citizen participation.
          </p>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How SajhaSabha Works</h2>
          <p className="text-lg mb-8">
            Our platform empowers citizens with tools to meaningfully engage with democracy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Find & Evaluate Representatives
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Search for officials by name, location, or issue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>View comprehensive profiles with performance data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Rate officials on integrity, responsiveness, effectiveness, and transparency</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Verification & Credibility
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Phone verification to ensure authentic participation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Evidence-based reviews linked to verifiable sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Transparent moderation and fact-checking processes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart4 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Citizen Action Tools
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Join campaigns for specific policy changes or local needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Participate in open letters to officials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Track whether and how officials respond to citizen concerns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="m2 9 3-3 3 3"/>
                      <path d="M13 18H7a2 2 0 0 1-2-2V6"/>
                      <path d="m22 15-3 3-3-3"/>
                      <path d="M11 6h6a2 2 0 0 1 2 2v10"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Accessibility & Inclusion
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Available in Nepali, Maithili, and English</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Multiple access methods including SMS-based participation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Designed for users with varying digital literacy and abilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We believe openness is essential for trust. We are transparent about our processes, data sources, and moderation decisions.
              </p>
            </div>

            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Inclusivity</h3>
              <p className="text-muted-foreground">
                We design our platform to be accessible to all Nepali citizens regardless of location, language, or technical ability.
              </p>
            </div>

            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Evidence-Based</h3>
              <p className="text-muted-foreground">
                We prioritize factual information and verifiable claims over opinions, ensuring that ratings and reviews are backed by evidence.
              </p>
            </div>

            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Constructive Engagement</h3>
              <p className="text-muted-foreground">
                We promote respectful, solution-oriented dialogue rather than partisan attacks or negativity.
              </p>
            </div>

            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Political Neutrality</h3>
              <p className="text-muted-foreground">
                We do not endorse political parties or ideologies. Our platform serves citizens across the political spectrum.
              </p>
            </div>

            <div className="border rounded p-6">
              <h3 className="font-semibold text-xl mb-3">Continuous Improvement</h3>
              <p className="text-muted-foreground">
                We constantly evolve our platform based on user feedback and emerging needs in Nepal's democratic landscape.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-lg mb-8">
            SajhaSabha is powered by a dedicated team of Nepali technologists, democracy advocates, and civic-minded professionals committed to strengthening democratic accountability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">PD</span>
              </div>
              <h3 className="font-semibold">Prabesh Dahal</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">MT</span>
              </div>
              <h3 className="font-semibold">Meera Thapa</h3>
              <p className="text-muted-foreground">Chief Technology Officer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">RG</span>
              </div>
              <h3 className="font-semibold">Rajendra Gurung</h3>
              <p className="text-muted-foreground">Head of Content & Verification</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Be part of strengthening Nepal's democracy through citizen engagement. Sign up to rate officials, join campaigns, and make your voice heard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
