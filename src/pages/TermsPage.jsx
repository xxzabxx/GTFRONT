import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Helmet } from 'react-helmet-async'

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - GrimmTrading Legal Agreement</title>
        <meta name="description" content="Read GrimmTrading's Terms of Service. Legal agreement covering platform usage, trading risks, account responsibilities, and service limitations." />
        <meta name="keywords" content="grimmtrading terms of service, trading platform legal, day trading agreement, terms and conditions" />
        <meta property="og:title" content="GrimmTrading Terms of Service" />
        <meta property="og:description" content="Legal terms and conditions for using the GrimmTrading platform." />
        <link rel="canonical" href="https://grimmtrading.com/terms" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: September 13, 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  By accessing and using GrimmTrading ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your use of our website located at grimmtrading.com and our trading platform services 
                  operated by GrimmTrading ("us", "we", or "our").
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  GrimmTrading provides a web-based platform that offers:
                </p>
                <ul>
                  <li>Stock market scanning tools and momentum indicators</li>
                  <li>Real-time and historical market data visualization</li>
                  <li>Trading community features and educational content</li>
                  <li>Market analysis tools and charting capabilities</li>
                </ul>
                <p>
                  Our service is designed for informational and educational purposes. We do not provide investment advice, 
                  recommendations, or broker services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>3. Trading Risks and Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p className="font-semibold text-red-600 dark:text-red-400">
                  IMPORTANT RISK DISCLOSURE: Trading stocks and securities involves substantial risk of loss and is not suitable for all investors.
                </p>
                <ul>
                  <li>Past performance does not guarantee future results</li>
                  <li>You may lose some or all of your invested capital</li>
                  <li>Trading decisions are your sole responsibility</li>
                  <li>Market data may be delayed or inaccurate</li>
                  <li>Our tools are for informational purposes only</li>
                </ul>
                <p>
                  You acknowledge that you understand these risks and that any trading decisions are made at your own discretion and risk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>4. User Accounts and Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p>You agree not to:</p>
                <ul>
                  <li>Share your account credentials with others</li>
                  <li>Use the service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Use automated systems to access our platform without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>5. Subscription and Billing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring 
                  and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis.
                </p>
                <p>
                  A valid payment method is required to process the payment for your subscription. You shall provide accurate 
                  and complete billing information including full name, address, state, zip code, and valid payment method information.
                </p>
                <p>
                  You may cancel your subscription at any time through your account settings. Cancellation will take effect at 
                  the end of the current billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>6. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive property of 
                  GrimmTrading and its licensors. The service is protected by copyright, trademark, and other laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                  republish, download, store, or transmit any of the material on our service without prior written consent.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>7. Data Accuracy and Availability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  While we strive to provide accurate and timely market data, we cannot guarantee the accuracy, completeness, 
                  or timeliness of any information provided through our service.
                </p>
                <p>
                  Market data may be delayed, and we are not responsible for any trading decisions made based on potentially 
                  inaccurate or delayed information.
                </p>
                <p>
                  We reserve the right to modify or discontinue the service at any time without notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  In no event shall GrimmTrading, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
                <p>
                  Our total liability to you for any damages shall not exceed the amount you paid for the service in the 
                  twelve (12) months preceding the claim.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>9. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, without regard to its 
                  conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>10. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or 
                  use our service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p>
                  Email: grimmdaytrading@gmail.com<br />
                  Website: grimmtrading.com/contact
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsPage

