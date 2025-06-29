"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cities, City } from '@/data/cities';

interface CitySelectorModalProps {
  isOpen: boolean;
  onCitySelect: (city: City) => void;
  onClose?: () => void;
}

// Enhanced fuzzy search function
function fuzzySearch(query: string, text: string): boolean {
  const queryLower = query.toLowerCase().trim();
  const textLower = text.toLowerCase();
  
  if (!queryLower) return true;
  if (textLower.includes(queryLower)) return true;
  
  // Character-by-character fuzzy matching
  let queryIndex = 0;
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === queryLower.length;
}

export function CitySelectorModal({ isOpen, onCitySelect, onClose }: CitySelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    
    return cities.filter(city =>
      fuzzySearch(searchQuery, city.name) ||
      fuzzySearch(searchQuery, city.state) ||
      fuzzySearch(searchQuery, `${city.name} ${city.state}`) ||
      fuzzySearch(searchQuery, `${city.state} ${city.name}`)
    );
  }, [searchQuery]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleConfirm = async () => {
    if (selectedCity) {
      setIsLoading(true);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set cookie with 7-day expiry
      document.cookie = `city=${selectedCity.slug}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      onCitySelect(selectedCity);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md mx-4"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Select Your City</CardTitle>
                </div>
                {onClose && (
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Choose your city to discover local shops and get personalized deals
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for your city... (try fuzzy search like 'mum' for Mumbai)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* City List */}
              <div className="max-h-64 overflow-y-auto space-y-2">
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <motion.div
                      key={city.slug}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          selectedCity?.slug === city.slug
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleCitySelect(city)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{city.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {city.state}, {city.country}
                              </p>
                            </div>
                            {selectedCity?.slug === city.slug && (
                              <Badge variant="default">Selected</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No cities found matching "{searchQuery}".</p>
                    <p className="text-xs mt-1">Try a different search term or check spelling.</p>
                  </div>
                )}
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleConfirm}
                disabled={!selectedCity || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading 
                  ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Setting up your local experience...
                    </div>
                  )
                  : selectedCity 
                    ? `Continue with ${selectedCity.name}` 
                    : 'Select a city to continue'
                }
              </Button>

              {/* Popular Cities */}
              {!searchQuery && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Popular cities:</p>
                  <div className="flex flex-wrap gap-1">
                    {cities.slice(0, 4).map((city) => (
                      <Button
                        key={city.slug}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}