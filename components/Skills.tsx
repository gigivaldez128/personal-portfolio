"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon?: string;
  color: string;
  category: "frontend" | "backend" | "database" | "blockchain" | "language";
}

const skills: Skill[] = [
  { name: "HTML", icon: "/html.png", color: "from-orange-500 to-red-600", category: "frontend" },
  { name: "CSS", icon: "/css.jpg", color: "from-blue-500 to-cyan-600", category: "frontend" },
  { name: "JavaScript", icon: "/js.svg", color: "from-yellow-400 to-orange-500", category: "frontend" },
  { name: "TypeScript", icon: "/ts.svg", color: "from-blue-600 to-indigo-700", category: "language" },
  { name: "React", icon: "/re.svg", color: "from-cyan-400 to-blue-500", category: "frontend" },
  { name: "Next.js", icon: "/next.svg", color: "from-gray-800 to-black", category: "frontend" },
  { name: "Vue", icon: "/re.svg", color: "from-green-500 to-emerald-600", category: "frontend" },
  { name: "Vite", icon: "/re.svg", color: "from-purple-500 to-pink-600", category: "frontend" },
  { name: "PHP", icon: "/php.png", color: "from-indigo-500 to-purple-600", category: "backend" },
  { name: "Python", icon: "/re.svg", color: "from-yellow-500 to-blue-500", category: "language" },
  { name: "Rust", icon: "/re.svg", color: "from-orange-600 to-red-700", category: "language" },
  { name: "Motoko", icon: "/re.svg", color: "from-blue-400 to-cyan-500", category: "blockchain" },
  { name: "MySQL", icon: "/re.svg", color: "from-blue-500 to-indigo-600", category: "database" },
  { name: "MongoDB", icon: "/re.svg", color: "from-green-600 to-emerald-700", category: "database" },
  { name: "Ethereum", icon: "/re.svg", color: "from-blue-400 to-purple-600", category: "blockchain" },
];

const categoryColors = {
  frontend: "border-blue-500/50",
  backend: "border-purple-500/50",
  database: "border-green-500/50",
  blockchain: "border-cyan-500/50",
  language: "border-yellow-500/50",
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">skills</span>
      </h1>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={cn(
              "group relative cursor-pointer",
              "bg-black-200/50 backdrop-blur-sm",
              "border border-white/10 rounded-xl",
              "p-4 md:p-6",
              "transition-all duration-300",
              "hover:border-purple/50 hover:shadow-lg hover:shadow-purple/20",
              categoryColors[skill.category]
            )}
          >
            {/* Gradient Background on Hover */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                `bg-gradient-to-br ${skill.color}`
              )}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 md:w-16 md:h-16 rounded-lg",
                  "flex items-center justify-center",
                  "bg-gradient-to-br",
                  skill.color,
                  "p-2 shadow-lg",
                  "group-hover:scale-110 transition-transform duration-300"
                )}
              >
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-white font-bold text-lg md:text-xl">
                    {skill.name.charAt(0)}
                  </span>
                )}
              </div>
              
              {/* Skill Name */}
              <h3 className="text-white text-sm md:text-base font-semibold text-center">
                {skill.name}
              </h3>
              
              {/* Category Badge */}
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  "bg-white/5 border border-white/10",
                  "text-white-200 capitalize"
                )}
              >
                {skill.category}
              </span>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Category Legend */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/50 border border-blue-500" />
          <span className="text-white-200">Frontend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500/50 border border-purple-500" />
          <span className="text-white-200">Backend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500" />
          <span className="text-white-200">Database</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500/50 border border-cyan-500" />
          <span className="text-white-200">Blockchain</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500" />
          <span className="text-white-200">Language</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
