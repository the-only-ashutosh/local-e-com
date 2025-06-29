"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import React from "react";
import { ArrowRight, Truck, Shield, RefreshCw, Award, Store, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { CitySelector } from "@/components/city-selector";
import { CityGreeting } from "@/components/city-greeting";
import { TopDealsCarousel } from "@/components/top-deals-carousel";
import { FeaturedShops } from "@/components/featured-shops";
import { CitySwitcher } from "@/components/city-switcher";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { DiscountWheelModal } from "@/components/discount-wheel-modal";
import { LiveStats } from "@/components/live-stats";
import { SeasonalCampaignBanner } from "@/components/seasonal-campaign-banner";
import { ShopOwnerSpotlight } from "@/components/shop-owner-spotlight";
import { RecentOrdersFeed } from "@/components/recent-orders-feed";
import { featuredProducts, saleProducts, categories } from "@/lib/data";
import { City, getCityBySlug } from "@/data/cities";
import { getShopsByCity } from "@/data/shops";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  useEffect(() => {
    // Check if city cookie exists
    const citySlug = document.cookie
      .split('; ')
      .find(row => row.startsWith('city='))
      ?.split('=')[1];

    if (citySlug) {
      const city = getCityBySlug(citySlug);
      if (city) {
        setSelectedCity(city);
      }
    } else {
      setShowCitySelector(true);
    }

    // Check for first-time visitor discount
    const hasDiscount = document.cookie
      .split('; ')
      .find(row => row.startsWith('discount_claimed='));
    
    if (!hasDiscount && citySlug) {
      setTimeout(() => setShowDiscountModal(true), 3000);
    }

    setIsLoading(false);
  }, []);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowCitySelector(false);
    // Reload page to get SSR with city context
    window.location.reload();
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    document.cookie = `city=${city.slug}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    window.location.reload();
  };

  const features = [
    {
      icon: Truck,
      title: "Local Delivery",
      description: "Fast delivery from local shops",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free returns to local shops",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Premium quality from trusted local businesses",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your local shopping experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-16">
      {/* City Selector Modal */}
      <CitySelector
        isOpen={showCitySelector}
        onCitySelect={handleCitySelect}
      />

      {/* Discount Wheel Modal */}
      <DiscountWheelModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
      />

      {/* City Switcher Bar */}
      {selectedCity && (
        <CitySwitcher city={selectedCity} onChange={handleCityChange} />
      )}

      {/* Hero Section with City Greeting */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
            alt="Local shopping hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Shopping in {selectedCity.name}</span>
            </motion.div>
          )}
          
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            {"Discover Local"}
            <span className="text-primary"> Businesses</span>
          </h1>
          <p className="text-base md:text-xl mb-8 text-gray-200">
            Support your community by shopping from local stores and businesses in your city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/shops">
                <Store className="mr-2 h-5 w-5" />
                Browse Local Shops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* City Greeting */}
      {selectedCity && (
        <CityGreeting city={selectedCity} />
      )}

      {/* Live Stats Widget */}
      {selectedCity && (
        <LiveStats 
          stats={{ 
            users: 1241, 
            orders: 312, 
            shops: getShopsByCity(selectedCity.slug).length 
          }} 
        />
      )}

      {/* Top Deals Carousel */}
      {selectedCity && (
        <TopDealsCarousel city={selectedCity} />
      )}

      {/* Featured Local Shops */}
      {selectedCity && (
        <FeaturedShops shops={getShopsByCity(selectedCity.slug).slice(0, 4)} />
      )}

      {/* Seasonal Campaign Banner */}
      <SeasonalCampaignBanner campaigns={[
        {
          id: '1',
          title: '🪔 Diwali Specials',
          subtitle: 'from Local Sellers',
          description: 'Celebrate the festival of lights with amazing deals from your local community',
          image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg',
          ctaText: 'Shop Diwali Deals',
          ctaLink: '/products?category=festival',
          isActive: true
        }
      ]} />

      {/* Shop Owner Spotlight */}
      <ShopOwnerSpotlight owner={{
        id: '1',
        name: 'Rajesh Patel',
        shopName: 'Valsad Mart',
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        bio: 'Running the family grocery business for over 20 years, serving the Valsad community with fresh produce and daily essentials.',
        city: selectedCity?.name || 'Valsad',
        quote: 'We believe in serving our community with the freshest products and the warmest service.',
        shopId: 'valsad-mart'
      }} />

      {/* Features */}
      <section className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="text-center h-full">
                <CardContent className="p-4 md:p-6">
                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Local Buyer Testimonials */}
      <TestimonialCarousel testimonials={[
        {
          id: '1',
          quote: 'Amazing experience shopping locally! Fresh products and great service.',
          name: 'Priya Sharma',
          rating: 5,
          city: selectedCity?.name || 'Valsad',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
        },
        {
          id: '2',
          quote: 'Love supporting local businesses. The quality is outstanding!',
          name: 'Amit Kumar',
          rating: 5,
          city: selectedCity?.name || 'Valsad',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
        },
        {
          id: '3',
          quote: 'Fast delivery and excellent customer service. Highly recommended!',
          name: 'Sneha Patel',
          rating: 5,
          city: selectedCity?.name || 'Valsad',
          avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
        }
      ]} />

      {/* Recent Orders Feed */}
      {selectedCity && (
        <RecentOrdersFeed orders={[
          {
            id: '1',
            productName: 'Fresh Milk',
            productImage: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
            buyerName: 'Rahul',
            shopName: 'Valsad Mart',
            timeAgo: '2 minutes ago',
            city: selectedCity.name
          },
          {
            id: '2',
            productName: 'Kashmir Apples',
            productImage: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
            buyerName: 'Meera',
            shopName: 'Fresh Fruits Corner',
            timeAgo: '5 minutes ago',
            city: selectedCity.name
          },
          {
            id: '3',
            productName: 'Basmati Rice',
            productImage: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
            buyerName: 'Vikash',
            shopName: 'Valsad Mart',
            timeAgo: '8 minutes ago',
            city: selectedCity.name
          }
        ]} />
      )}

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Discover premium products from local businesses that combine
            quality, style, and community support
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {featuredProducts.slice(0, 6).map((product) => (
            <motion.div
              key={product.xata_id + "khbsks"}
              variants={itemVariants}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 md:mt-12">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore our diverse range of categories from local businesses
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {categories.slice(0, 8).map((category) => (
            <motion.div key={category} variants={itemVariants}>
              <Link href={`/products?category=${encodeURIComponent(category)}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 md:p-6 text-center">
                    <h3 className="font-semibold group-hover:text-primary transition-colors text-sm md:text-base">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-primary-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Subscribe to our newsletter and be the first to know about new
              local businesses, exclusive deals, and community events
              {selectedCity && ` in ${selectedCity.name}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground text-sm md:text-base"
              />
              <Button variant="secondary" size="lg">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}