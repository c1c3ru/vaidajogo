import React from 'react';
import { motion } from 'framer-motion';

export const Logo = () => {
    return (
        <div className="flex items-center gap-2 group cursor-pointer relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative flex items-center justify-center w-12 h-12 bg-card border-2 border-primary rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,179,255,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <span className="text-primary font-heading font-bold text-2xl z-10">V</span>
            </motion.div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-heading font-bold tracking-widest text-foreground uppercase">
                    Vai<span className="text-primary">Da</span>Jogo
                </h1>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-body">
                    System Core Online
                </span>
            </div>
        </div>
    );
};
