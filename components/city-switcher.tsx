"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { City, cities } from '@/data/cities';

interface CitySwitcherProps {
  city: City;
  onChange: (city: City) => void;
}

export function CitySwitcher({ city, onChange }: CitySwitcherProps) {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <>
      {/* Hero Image with City Info */}
      <div className="relative h-32 md:h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg')`
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Exploring {city.name}
            </h2>
            <p className="text-sm md:text-base opacity-90">
              {city.state}, {city.country}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky City Switcher Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm md:text-base">
                Shopping in {city.name}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="hidden sm:inline">Change City</span>
                  <span className="sm:hidden">Switch</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {cities.map((cityOption) => (
                  <DropdownMenuItem
                    key={cityOption.slug}
                    onClick={() => onChange(cityOption)}
                    className={cityOption.slug === city.slug ? 'bg-muted' : ''}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{cityOption.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {cityOption.state}, {cityOption.country}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </>
  );
}