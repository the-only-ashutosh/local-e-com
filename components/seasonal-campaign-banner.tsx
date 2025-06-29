"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

interface SeasonalCampaignBannerProps {
  campaigns: Campaign[];
}

export function SeasonalCampaignBanner({ campaigns }: SeasonalCampaignBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const activeCampaigns = campaigns.filter(campaign => campaign.isActive);
  
  if (activeCampaigns.length === 0) return null;

  const nextCampaign = () => {
    setCurrentIndex((prev) => (prev + 1) % activeCampaigns.length);
  };

  const prevCampaign = () => {
    setCurrentIndex((prev) => (prev - 1 + activeCampaigns.length) % activeCampaigns.length);
  };

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Special Campaigns</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Don't miss out on seasonal offers and special events from your local community
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {activeCampaigns.length === 1 ? (
          // Single campaign - full width banner
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 md:h-64 lg:h-80">
              <Image
                src={activeCampaigns[0].image}
                alt={activeCampaigns[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl text-white">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4"
                    >
                      {activeCampaigns[0].title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-lg md:text-xl mb-2"
                    >
                      {activeCampaigns[0].subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-sm md:text-base mb-6 opacity-90"
                    >
                      {activeCampaigns[0].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                        <Link href={activeCampaigns[0].ctaLink}>
                          {activeCampaigns[0].ctaText}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          // Multiple campaigns - carousel
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 md:h-64 lg:h-80">
                  <Image
                    src={activeCampaigns[currentIndex].image}
                    alt={activeCampaigns[currentIndex].title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                  
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                      <div className="max-w-2xl text-white">
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                          {activeCampaigns[currentIndex].title}
                        </h3>
                        <p className="text-lg md:text-xl mb-2">
                          {activeCampaigns[currentIndex].subtitle}
                        </p>
                        <p className="text-sm md:text-base mb-6 opacity-90">
                          {activeCampaigns[currentIndex].description}
                        </p>
                        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                          <Link href={activeCampaigns[currentIndex].ctaLink}>
                            {activeCampaigns[currentIndex].ctaText}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Navigation */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={prevCampaign}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={nextCampaign}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {activeCampaigns.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}