import React, { useState } from "react";
import { motion } from "framer-motion";

const HelpSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Forgot Password' on the login page, and follow the instructions sent to your email.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team by emailing support@example.com or using the live chat option on our website.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, go to 'Account Settings,' and click 'Delete Account.' Please note this action is irreversible.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "To update your profile information, go to 'Account Settings' and modify your details, including email, phone number, and address.",
    },
    {
      question: "What should I do if I encounter a bug or issue?",
      answer:
        "If you encounter a bug or issue, please try restarting the app. If the problem persists, contact support@example.com with detailed information about the issue.",
    },
    {
      question: "Can I share my account with others?",
      answer:
        "For security reasons, we do not recommend sharing your account. If you'd like to allow others to use certain features, consider creating a shared trip or event.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 p-6 rounded-lg">
      <h2 className="text-3xl font-bold">Help & Support</h2>
      <p className="text-gray-600">
        We're here to help! Browse our FAQs or reach out to us directly for assistance.
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
              layout
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <button
                className="w-full text-left px-4 py-3 bg-blue-200 hover:bg-blue-100"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="float-right">{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <motion.div
                  className="px-4 py-3 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
        <p className="text-gray-600">
          Having trouble? Check out these common issues and solutions:
        </p>
        <ul className="list-disc text-sm list-inside mt-3">
          <li><strong>Can't log in?</strong> Make sure your email and password are correct. If you’ve forgotten your password, follow the reset instructions above.</li>
          <li><strong>Slow app performance?</strong> Try clearing your cache or reinstalling the app for better performance.</li>
          <li><strong>Features not working?</strong> Ensure your app is up to date. Check for updates in your app store.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
        <p className="text-gray-600 text-base">
          If your question isn't answered in the FAQs or troubleshooting section, feel free to contact us directly.
        </p>
        <ul className="list-disc text-sm list-inside mt-3">
          <li>Email: support@example.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Live Chat: Available 24/7 on our website</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpSupport;
