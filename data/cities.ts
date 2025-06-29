export interface City {
  slug: string;
  name: string;
  state: string;
  country: string;
}

export const cities: City[] = [
  { slug: 'valsad', name: 'Valsad', state: 'Gujarat', country: 'India' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', country: 'India' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', country: 'India' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', country: 'India' },
  { slug: 'nashik', name: 'Nashik', state: 'Maharashtra', country: 'India' },
  { slug: 'rajkot', name: 'Rajkot', state: 'Gujarat', country: 'India' },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}