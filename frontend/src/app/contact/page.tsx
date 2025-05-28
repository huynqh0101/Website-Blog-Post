"use client";

import { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ArrowRight,
  CheckCircle,
  User,
  Type,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Giả lập gửi form
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Xử lý thành công
    console.log(formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    formRef.current?.reset();
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset trạng thái sau 5 giây
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-purple-700 py-20 px-4 sm:px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions or feedback? We'd love to hear from you. Our team is
            here to help and respond as quickly as possible.
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-slate-900 to-transparent"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Mail className="text-primary h-6 w-6" />,
              title: "Email Us",
              content: "support@newsfeed.com",
              link: "mailto:support@newsfeed.com",
            },
            {
              icon: <Phone className="text-primary h-6 w-6" />,
              title: "Call Us",
              content: "+1 (555) 123-4567",
              link: "tel:+15551234567",
            },
            {
              icon: <Clock className="text-primary h-6 w-6" />,
              title: "Business Hours",
              content: "Mon-Fri: 9AM - 5PM",
              subContent: "Weekend: Closed",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex items-start hover:shadow-lg transition-shadow dark:shadow-slate-700/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-primary hover:underline flex items-center"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.content}
                  </p>
                )}
                {item.subContent && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {item.subContent}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {isSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-4 text-center my-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-1">
                  Message Sent!
                </h3>
                <p className="text-green-700 dark:text-green-400">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="you@example.com"
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Type className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      required
                      placeholder="How can we help you?"
                      className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Type your message here..."
                      className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Location & Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Our Location
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                123 News Street, Media City
                <br />
                New York, NY 10001
                <br />
                United States
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:underline mt-2"
              >
                Get Directions
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            {/* Interactive Map */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden h-[300px]">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1621520751598!5m2!1sen!2s"
                className="w-full h-full border-0"
                loading="lazy"
                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.8)" }}
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly will I receive a response?",
                answer:
                  "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call our support line directly.",
              },
              {
                question: "Do you offer advertising opportunities?",
                answer:
                  "Yes, we offer various advertising packages for businesses. Please contact our advertising department at ads@newsfeed.com for more information.",
              },
              {
                question: "How can I submit a news tip?",
                answer:
                  "You can submit news tips through our contact form. Please mark the subject as 'News Tip' and include as many details as possible.",
              },
              {
                question: "Are you hiring journalists or contributors?",
                answer:
                  "We're always looking for talented writers and journalists. Check our careers page for current openings or send your portfolio to careers@newsfeed.com.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-primary rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-white/90">
            Subscribe to our newsletter to receive the latest news, updates, and
            exclusive content directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Custom CSS for background pattern */}
      <style jsx global>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
