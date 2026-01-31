"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedText = ({
    words,
    className
}: {
    words: string[];
    className?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2500); // Change word every 2.5 seconds

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span className={`relative inline-block ${className || ""}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ 
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="inline-block relative"
                >
                    {words[currentIndex]}
                    {/* Animated underline */}
                    <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-pink-500 to-purple"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    />
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default AnimatedText;
