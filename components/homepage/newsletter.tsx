"use client";

import { useState } from "react";
import { newsletter } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl px-6 py-12 text-center md:px-16 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary to-secondary" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rotate-12 rounded-lg bg-secondary/30" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {newsletter.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">{newsletter.description}</p>
            {submitted ? (
              <p className="mt-8 text-sm font-semibold text-accent">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
                <Button type="submit" size="lg" variant="sale" className="shrink-0">
                  {newsletter.buttonText}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
