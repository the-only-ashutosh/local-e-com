"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { User, MapPin, Quote, Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShopOwner {
  id: string;
  name: string;
  shopName: string;
  photo: string;
  bio: string;
  city: string;
  quote: string;
  shopId: string;
}

interface ShopOwnerSpotlightProps {
  owner: ShopOwner;
}

export function ShopOwnerSpotlight({ owner }: ShopOwnerSpotlightProps) {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Shop Owner Spotlight</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Meet the passionate local business owners who make our community special
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="relative h-48">
                  <Image
                    src={owner.photo}
                    alt={owner.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{owner.name}</h3>
                    <p className="text-sm opacity-90">Owner of {owner.shopName}</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{owner.city}</span>
                  </div>
                  
                  <p className="text-muted-foreground">{owner.bio}</p>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <Quote className="h-5 w-5 text-primary mb-2" />
                    <blockquote className="italic text-muted-foreground">
                      "{owner.quote}"
                    </blockquote>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={`/shop/${owner.shopId}`}>
                      <Store className="mr-2 h-4 w-4" />
                      Visit {owner.shopName}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-5">
                <div className="md:col-span-2 relative aspect-square">
                  <Image
                    src={owner.photo}
                    alt={owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="md:col-span-3 p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{owner.name}</h3>
                      <p className="text-lg text-muted-foreground mb-1">
                        Owner of {owner.shopName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{owner.city}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {owner.bio}
                    </p>
                    
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <Quote className="h-6 w-6 text-primary mb-3" />
                      <blockquote className="text-lg italic text-muted-foreground">
                        "{owner.quote}"
                      </blockquote>
                    </div>
                    
                    <Button asChild size="lg">
                      <Link href={`/shop/${owner.shopId}`}>
                        <Store className="mr-2 h-5 w-5" />
                        Visit {owner.shopName}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}