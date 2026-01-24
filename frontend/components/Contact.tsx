"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      id: 1,
      icon: "📞",
      label: "Phone",
      value: "+1 (800) 123-4567",
      link: "tel:+18001234567"
    },
    {
      id: 2,
      icon: "📧",
      label: "Email",
      value: "info@racingpoint.com",
      link: "mailto:info@racingpoint.com"
    },
    {
      id: 3,
      icon: "📍",
      label: "Address",
      value: "123 Racing Lane, Suncity Hyderabad, 500086",
      link: "#"
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f", url: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: "𝕏", url: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: "📷", url: "#", color: "hover:text-pink-500" },
    { name: "YouTube", icon: "▶️", url: "#", color: "hover:text-red-600" },
    { name: "LinkedIn", icon: "in", url: "#", color: "hover:text-blue-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // Here you would normally send the form data to your backend
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="min-h-screen bg-black py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-lg">
            Have questions? We'd love to hear from you. Contact us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl hover:border-red-600 transition group"
                >
                  <div className="text-4xl mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-600 transition">
                      {item.label}
                    </h3>
                    <p className="text-gray-400 mt-1">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    title={social.name}
                    className={`w-12 h-12 rounded-full border border-red-600 text-red-600 flex items-center justify-center font-bold text-lg transition ${social.color} hover:bg-red-600 hover:text-white hover:border-red-600`}
                  >
                    {social.name === "Twitter" ? "𝕏" : social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-lg">
                <p className="text-green-400 font-semibold">✓ Message sent successfully!</p>
                <p className="text-green-300 text-sm mt-1">We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-black/50 rounded-lg border border-red-600/20">
              <h4 className="text-sm font-bold text-gray-300 mb-2">Business Hours</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-16 bg-gradient-to-r from-red-900/30 to-black border border-red-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">📍 Visit Our Location</h3>
          <p className="text-gray-400 mb-6">
            Come experience our state-of-the-art F1 racing simulator facility in person
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition">
            Get Directions
          </button>
        </div>
      </div>
    </section>
  );
}
