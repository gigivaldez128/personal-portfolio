"use client";
import { FaDownload } from "react-icons/fa6";
import { motion } from "framer-motion";

import { Spotlight } from "./ui/Spotlight";
import AnimatedText from "./ui/AnimatedText";
import { socialMedia } from "@/data";

const Hero = () => {
  return (
    <section id="home" className="pb-20 pt-24 min-h-screen flex items-center">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Role/Title */}
              <p className="text-xs md:text-sm uppercase tracking-widest text-blue-100 font-mono">
                Software Developer
              </p>

              {/* Main Heading with Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white block">Hello I&apos;m</span>
                <span className="text-purple block mt-2">Gigi C. Valdez</span>
              </h1>

              {/* Description */}
              <div className="space-y-2 text-white-200 font-mono text-sm md:text-base">
                <p>I excel at crafting elegant digital experiences and</p>
                <p className="flex items-center gap-2">
                  I am a{" "}
                  <AnimatedText
                    words={["Front-end", "Back-end"]}
                    className="text-purple font-bold text-base md:text-lg"
                  />{" "}
                  Developer
                </p>
              </div>

              {/* Download CV Button and Social Icons */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="/resume.pdf"
                  download="Gigi_C_Valdez_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-purple text-white hover:bg-purple/10 transition-all duration-300 group"
                >
                  <FaDownload className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  <span className="font-medium">DOWNLOAD CV</span>
                </a>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3">
                  {socialMedia.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border-2 border-purple flex items-center justify-center hover:bg-purple/10 transition-colors"
                      aria-label={social.name || "Social media link"}
                    >
                      <img
                        src={social.img}
                        alt={social.name || "social icon"}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Section - Portrait Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-full max-w-md">
                {/* Dashed Circular Border */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="#CBACF9"
                    strokeWidth="2"
                    strokeDasharray="10 15"
                    className="animate-spin-slow"
                  />
                  {/* Incomplete segments for dynamic look */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="#CBACF9"
                    strokeWidth="2"
                    strokeDasharray="5 30"
                    opacity="0.5"
                  />
                </svg>

                {/* Portrait Image */}
                <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden">
                  <img
                    src="/profile.png"
                    alt="Gigi C. Valdez"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src = "https://via.placeholder.com/400x400/CBACF9/000000?text=GCV";
                    }}
                  />
                  {/* Shadow overlay for dramatic effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
