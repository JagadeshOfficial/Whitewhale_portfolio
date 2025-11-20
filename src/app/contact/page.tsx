'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Send, CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsSubmitting(false);
      if (res.ok && data && data.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        // show an inline error by reusing submitSuccess state as false
        // optionally, you can add a dedicated error state
        console.error('Contact submit failed', data);
        alert('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert('Failed to send message. Please check your connection and try again.');
    }
  };

  const heroImage = getImage('hero-background');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-headline">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Have a question or ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email Card */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">
                For business inquiries
              </p>
              <a href="mailto:business@whitewhalesoft.in" className="text-primary font-semibold hover:underline block mb-3">
                business@whitewhalesoft.in
              </a>
              <p className="text-muted-foreground mb-2">For careers</p>
              <a href="mailto:contact@whitewhalesoft.in" className="text-primary font-semibold hover:underline">
                contact@whitewhalesoft.in
              </a>
            </Card>

            {/* Phone Card */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">
                Call us during business hours.
              </p>
              <a href="tel:+918374974600" className="text-primary font-semibold hover:underline">
                +91 8374 974 600
              </a>
            </Card>

            {/* Location Card */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-muted-foreground">
                Hyderabad, Telangana<br />
                India
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 font-headline">
                Send us a Message
              </h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900">Message Sent!</h3>
                    <p className="text-sm text-green-700">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Right - Contact Details & Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="p-8 bg-white">
                <h3 className="text-xl font-bold mb-6">Office Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-semibold">Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-semibold">Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </Card>

              {/* Follow Us */}
              <Card className="p-8 bg-white">
                <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </Card>

              {/* Quick Response */}
              <Card className="p-8 bg-primary text-white">
                <h3 className="text-xl font-bold mb-2">Quick Response</h3>
                <p className="mb-4">
                  We typically respond to all inquiries within 24 hours on business days.
                </p>
                <p className="text-sm opacity-90">
                  For urgent matters, please call us directly at +91 8374 974 600
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Maps Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
            Our Locations
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* India Office */}
            <div>
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-64 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7329635925636!2d78.66128331531505!3d17.360681199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3fc5555555%3A0x123456789!2sPlot%20no.18%2C%20iLabs%20Centre%2C%20Level%202%2C%20Oval%20Building%2C%20Inorbit%20Mall%20Rd%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <CardContent className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">India Office</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-muted-foreground">
                            Plot no.18, iLabs Centre, Level 2,<br />
                            Oval Building, Inorbit Mall Rd,<br />
                            Hyderabad, Telangana 500081
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <a href="tel:+918374974600" className="text-primary hover:underline">
                            +91 8374 974 600
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* USA Office */}
            <div>
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-64 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.6720923789!2d-93.2821968!3d37.1644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf629b6d1d1d1d%3A0x123456789!2s1010%20E%20Elm%20St%2C%20Springfield%2C%20Missouri%2065806!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <CardContent className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">USA Office</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-muted-foreground">
                            1010 E Elm St,<br />
                            Springfield, Missouri 65806,<br />
                            USA
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <a href="mailto:business@whitewhalesoft.in" className="text-primary hover:underline">
                            business@whitewhalesoft.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center font-headline">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: 'What is your typical response time?',
                  answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.'
                },
                {
                  question: 'Do you offer free consultations?',
                  answer: 'Yes! We offer a free initial consultation to discuss your project needs and requirements. Contact us to schedule yours.'
                },
                {
                  question: 'What is your service area?',
                  answer: 'We serve clients globally and have offices in India. We can assist you regardless of your location.'
                },
                {
                  question: 'How do you handle project timelines?',
                  answer: 'We use agile methodologies and work closely with clients to establish realistic timelines and milestones that fit your needs.'
                },
              ].map((faq, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's transform your vision into reality. Contact us today to schedule your free consultation.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#contact">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
