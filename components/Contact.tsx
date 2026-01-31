"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1000);

    // In a real application, you would send the form data to your backend
    // Example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setSubmitStatus("success");
    //   } else {
    //     setSubmitStatus("error");
    //   }
    // } catch (error) {
    //   setSubmitStatus("error");
    // }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      label: "Email",
      value: "gigivaldez128@gmail.com",
      link: "mailto:gigivaldez128@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      label: "Phone",
      value: "+63 997 857 9536",
      link: "tel:+639978579536",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      label: "Location",
      value: "Davao City, Philippines",
      link: "#",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialIcons = [
    { name: "GitHub", icon: FaGithub, link: "#" },
    { name: "Twitter", icon: FaTwitter, link: "#" },
    { name: "LinkedIn", icon: FaLinkedin, link: "#" },
  ];

  return (
    <section id="contact" className="py-20 w-full relative">
      <h1 className="heading">
        Get in <span className="text-purple">Touch</span>
      </h1>
      <p className="text-white-200 text-center mt-4 max-w-2xl mx-auto">
        Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
      </p>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-white-200">
              Feel free to reach out through any of these channels. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-black-200/50 backdrop-blur-sm border border-white/10 hover:border-purple/50 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {info.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white-200 text-sm">{info.label}</p>
                  <p className="text-white font-semibold">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Media */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
            <div className="flex gap-3">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-lg bg-black-200/50 backdrop-blur-sm border border-white/10 hover:border-purple/50 flex items-center justify-center transition-all duration-300"
                  aria-label={social.name || "Social media link"}
                >
                  <img src={social.img} alt={social.name || "social icon"} className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-black-200/50 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white-200 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black-300/50 border border-white/10 text-white placeholder-white-200 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white-200 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black-300/50 border border-white/10 text-white placeholder-white-200 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white-200 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-black-300/50 border border-white/10 text-white placeholder-white-200 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-sm"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm"
                >
                  Something went wrong. Please try again or contact me directly.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
