import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Helmet } from 'react-helmet-async'

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - GrimmTrading Data Protection</title>
        <meta name="description" content="GrimmTrading Privacy Policy. Learn how we collect, use, and protect your personal information and trading data. GDPR compliant data practices." />
        <meta name="keywords" content="grimmtrading privacy policy, data protection, trading platform privacy, personal information security" />
        <meta property="og:title" content="GrimmTrading Privacy Policy" />
        <meta property="og:description" content="How we protect your personal information and trading data." />
        <link rel="canonical" href="https://grimmtrading.com/privacy" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: September 13, 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  subscribe to our service, or contact us for support.
                </p>
                <h4>Personal Information:</h4>
                <ul>
                  <li>Name and email address</li>
                  <li>Payment and billing information</li>
                  <li>Account preferences and settings</li>
                  <li>Communications with our support team</li>
                </ul>
                <h4>Usage Information:</h4>
                <ul>
                  <li>Platform usage patterns and features accessed</li>
                  <li>Trading preferences and watchlist data</li>
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent fraudulent transactions</li>
                  <li>Personalize your experience on our platform</li>
                </ul>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>3. Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>We may share your information in the following situations:</p>
                <h4>Service Providers:</h4>
                <p>
                  We may share your information with third-party service providers who perform services on our behalf, 
                  such as payment processing, data analysis, email delivery, and customer service.
                </p>
                <h4>Legal Requirements:</h4>
                <p>
                  We may disclose your information if required to do so by law or in response to valid requests 
                  by public authorities (e.g., a court or government agency).
                </p>
                <h4>Business Transfers:</h4>
                <p>
                  If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred. 
                  We will provide notice before your personal information is transferred.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>4. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <h4>Security Measures Include:</h4>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure data storage with encryption at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p>
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your personal information, 
                  we cannot guarantee its absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>5. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We retain your personal information for as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
                <p>
                  When you cancel your account, we will delete or anonymize your personal information within 30 days, 
                  except for information we are required to retain for legal or regulatory purposes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>6. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>You have the following rights regarding your personal information:</p>
                <h4>Access and Portability:</h4>
                <p>You can request a copy of your personal information in a structured, machine-readable format.</p>
                <h4>Correction:</h4>
                <p>You can update or correct your personal information through your account settings.</p>
                <h4>Deletion:</h4>
                <p>You can request deletion of your personal information, subject to certain legal limitations.</p>
                <h4>Opt-out:</h4>
                <p>You can opt out of receiving promotional communications from us by following the unsubscribe instructions.</p>
                <p>
                  To exercise these rights, please contact us at grimmdaytrading@gmail.com. 
                  We will respond to your request within 30 days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We use cookies and similar tracking technologies to collect and use personal information about you. 
                  This includes information about your use of our platform and your preferences.
                </p>
                <h4>Types of Cookies We Use:</h4>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling certain cookies may 
                  affect the functionality of our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>8. Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Our platform may contain links to third-party websites or integrate with third-party services. 
                  We are not responsible for the privacy practices of these third parties.
                </p>
                <h4>Third-Party Services We Use:</h4>
                <ul>
                  <li><strong>Payment Processing:</strong> Stripe for secure payment processing</li>
                  <li><strong>Market Data:</strong> Finnhub for real-time market information</li>
                  <li><strong>Analytics:</strong> Google Analytics for usage statistics</li>
                  <li><strong>Email:</strong> Email service providers for communications</li>
                </ul>
                <p>
                  We encourage you to review the privacy policies of any third-party services you access through our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>9. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Your information may be transferred to and processed in countries other than your own. 
                  These countries may have different data protection laws than your jurisdiction.
                </p>
                <p>
                  When we transfer your personal information internationally, we ensure appropriate safeguards 
                  are in place to protect your information in accordance with this privacy policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>10. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Our service is not intended for children under the age of 18. We do not knowingly collect 
                  personal information from children under 18. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>11. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by 
                  posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  You are advised to review this privacy policy periodically for any changes. 
                  Changes to this privacy policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>12. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <p>
                  Email: grimmdaytrading@gmail.com<br />
                  Website: grimmtrading.com/contact
                </p>
                <p>
                  We will respond to your inquiry within 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPage

