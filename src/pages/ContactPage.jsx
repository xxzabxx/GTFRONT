import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create mailto link as fallback
      const subject = encodeURIComponent(`GrimmTrading Contact: ${formData.subject}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:grimmdaytrading@gmail.com?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password from the login page by clicking 'Forgot Password' and following the email instructions."
    },
    {
      question: "Can I change my subscription plan?",
      answer: "Yes, you can upgrade or downgrade your plan anytime from your account settings. Changes take effect immediately."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day free trial on all paid plans. If you're not satisfied, you can cancel during the trial period for a full refund."
    },
    {
      question: "Is my trading data secure?",
      answer: "Yes, we use bank-level encryption and security measures. Your data is never shared with third parties and is protected by industry standards."
    },
    {
      question: "What are your support hours?",
      answer: "We provide support Monday through Friday, 4 AM - 8 PM ET, covering extended market hours. We typically respond within 24-48 hours."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period."
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - GrimmTrading Support & Help</title>
        <meta name="description" content="Get help with GrimmTrading platform. Contact our support team for technical issues, billing questions, or general inquiries. Fast response times guaranteed." />
        <meta name="keywords" content="grimmtrading support, contact trading platform, day trading help, technical support, customer service" />
        <meta property="og:title" content="Contact GrimmTrading Support" />
        <meta property="og:description" content="Get help with your day trading platform. Fast, friendly support for all your questions." />
        <link rel="canonical" href="https://grimmtrading.com/contact" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our platform? Need technical support? 
              We're here to help you succeed in your trading journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What can we help you with?"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide as much detail as possible..."
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <span>Your email client should open with the message. If not, please try again or check your email settings.</span>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>There was an issue sending your message. Please try again or check your email client settings.</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - FAQ and Help */}
            <div className="space-y-8">
              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="border-border/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Additional Help */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Need More Help?</h3>
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for? Use the contact form to send us a message 
                    and we'll get back to you as soon as possible.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="/resources"
                      className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Trading Resources
                    </a>
                    <a 
                      href="/pricing"
                      className="inline-flex items-center justify-center border border-border hover:bg-muted px-4 py-2 rounded-md font-medium"
                    >
                      View Pricing
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Info */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Response Times</h3>
                      <p className="text-muted-foreground mb-2">
                        We're committed to providing fast, helpful support during market hours and beyond.
                      </p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Technical Issues:</span> Usually within 24 hours</p>
                        <p><span className="font-medium">General Questions:</span> Usually within 48 hours</p>
                        <p><span className="font-medium">Support Hours:</span> Monday - Friday, 4 AM - 8 PM ET</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage

