import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { axios } from "@/api/DuoBlySyncClient";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-accent/10 border border-primary/20 rounded-3xl p-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30"
          >
            <Heart className="w-8 h-8 text-primary-foreground fill-current" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Ready to find your match?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Whether you're a mentor sharing your expertise or a mentee ready to
            level up — your perfect match is waiting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => axios.auth.redirectToLogin("/dashboard")}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-105"
            >
              Start Matching
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => axios.auth.redirectToLogin("/dashboard")}
              className="px-8 py-3.5 rounded-xl border border-border bg-background text-foreground font-semibold hover:bg-secondary transition-all hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
