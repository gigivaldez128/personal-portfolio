"use client";

export const dynamic = 'force-dynamic';

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { ModernNavbar } from "@/components/ui/ModernNavbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Chatbot from "@/components/ui/Chatbot";
import BubblesBackground from "@/components/ui/BubblesBackground";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <BubblesBackground />
      <div className="max-w-7xl w-full relative z-10">
        <ModernNavbar navItems={navItems} />
        <Hero />
        <Grid />
        <Skills />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Contact />
        <Footer />
      </div>
      <ScrollToTop />
      <Chatbot />
    </main>
  );
};

export default Home;
