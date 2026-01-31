"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaBarsStaggered, FaXmark, FaPhone } from "react-icons/fa6";

export const ModernNavbar = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            setActiveLink(hash || "#");
        };

        const handleScroll = () => {
            // Detect which section is in view
            const sections = navItems.map(item => item.link.replace('#', ''));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && scrollPosition >= element.offsetTop) {
                    setActiveLink(`#${section}`);
                }
            }

            if (scrollPosition < 100) {
                setActiveLink("#");
            }
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navItems]);

    const handleLinkClick = (link: string, e?: React.MouseEvent) => {
        if (link === "#" || link === "") {
            e?.preventDefault();
            // Scroll to home section or top
            const homeElement = document.getElementById("home");
            if (homeElement) {
                const navbarHeight = 80;
                const elementPosition = homeElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: "smooth"
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setActiveLink("#");
        } else {
            // For hash links, scroll to element with offset
            const targetId = link.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                e?.preventDefault();
                const navbarHeight = 80; // Approximate navbar height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            setActiveLink(link);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[5000] transition-all duration-300",
                isScrolled
                    ? "bg-black-200/95 backdrop-blur-xl border-b border-black-300 shadow-lg"
                    : "bg-transparent",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group"
                        onClick={() => handleLinkClick("/")}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple to-blue-500 flex items-center justify-center border-2 border-purple/50"
                        >
                            <span className="text-white font-bold text-lg md:text-xl">GV</span>
                        </motion.div>
                        <span className="text-white font-semibold text-lg md:text-xl group-hover:text-purple transition-colors">

                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, idx) => {
                            const isActive = activeLink === item.link || (item.link === "#" && (!activeLink || activeLink === "#"));
                            return (
                                <Link
                                    key={idx}
                                    href={item.link}
                                    onClick={(e) => handleLinkClick(item.link, e)}
                                    className="relative px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors group cursor-pointer z-10"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <span
                                        className={cn(
                                            "relative z-10 transition-colors",
                                            isActive
                                                ? "text-white"
                                                : "text-white-200 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </span>

                                    {/* Active Indicator */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "100%", opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-orange-500 to-purple"
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Hover Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                        whileHover={{ scale: 1.05 }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Call to Action Button */}
                    <div className="hidden md:flex items-center">
                        <motion.a
                            href="tel:+639978579536"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                        >
                            <FaPhone className="w-4 h-4 text-white group-hover:text-purple transition-colors" />
                            <span className="text-white text-sm font-medium group-hover:text-purple transition-colors">
                                Call +63 997 857 9536
                            </span>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaXmark className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaBarsStaggered className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden border-t border-black-300 bg-black-200/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item, idx) => {
                                const isActive = activeLink === item.link;
                                return (
                                    <Link
                                        key={idx}
                                        href={item.link}
                                        onClick={(e) => handleLinkClick(item.link, e)}
                                        className={cn(
                                            "block px-4 py-3 rounded-lg text-sm font-medium uppercase transition-all",
                                            isActive
                                                ? "text-white bg-purple/20 border-l-4 border-purple"
                                                : "text-white-200 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <motion.a
                                href="tel:+19786669193"
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center space-x-2 mt-4 px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                            >
                                <FaPhone className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">
                                    Call +1 (978) 666-9193
                                </span>
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
