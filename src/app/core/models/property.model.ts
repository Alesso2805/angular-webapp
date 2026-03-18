export interface Property {
  id: string;
  title: string;
  location: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  category: 'beach' | 'cabin' | 'city' | 'trending';
  isGuestFavorite: boolean;
}
