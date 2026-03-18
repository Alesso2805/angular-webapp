import { Injectable, signal, computed } from '@angular/core';
import { Property } from '../models/property.model';
import { delay, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly MOCK_PROPERTIES: Property[] = [
    {
      id: '1', title: 'Serene Oceanfront Villa', location: 'Santorini', country: 'Greece',
      pricePerNight: 450, rating: 4.96, reviews: 124, category: 'beach', isGuestFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2', title: 'Modern Glass Cabin in the Woods', location: 'Portland', country: 'USA',
      pricePerNight: 280, rating: 4.85, reviews: 89, category: 'cabin', isGuestFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3', title: 'Luxury Penthouse', location: 'New York City', country: 'USA',
      pricePerNight: 850, rating: 4.99, reviews: 201, category: 'city', isGuestFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '4', title: 'Cozy Alpine Chalet', location: 'Zermatt', country: 'Switzerland',
      pricePerNight: 550, rating: 4.92, reviews: 65, category: 'trending', isGuestFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '5', title: 'Beach House Getaway', location: 'Malibu', country: 'USA',
      pricePerNight: 620, rating: 4.75, reviews: 110, category: 'beach', isGuestFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '6', title: 'A-Frame Forest Retreat', location: 'Banff', country: 'Canada',
      pricePerNight: 190, rating: 4.88, reviews: 312, category: 'cabin', isGuestFavorite: true,
      imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  private readonly _properties = signal<Property[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  private readonly _searchQuery = signal<string>('');
  private readonly _selectedCategory = signal<string>('all');

  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();
  
  public readonly filteredProperties = computed(() => {
    const query = this._searchQuery().toLowerCase();
    const category = this._selectedCategory();
    
    return this._properties().filter(prop => {
      const matchQuery = prop.title.toLowerCase().includes(query) || prop.location.toLowerCase().includes(query);
      const matchCategory = category === 'all' ? true : prop.category === category;
      return matchQuery && matchCategory;
    });
  });

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this._loading.set(true);
    of(this.MOCK_PROPERTIES).pipe(
      delay(800) 
    ).subscribe({
      next: (data) => {
        this._properties.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Failed to load properties: ' + err.message);
        this._loading.set(false);
      }
    });
  }

  public updateSearchQuery(query: string) {
    this._searchQuery.set(query);
  }

  public updateCategory(category: string) {
    this._selectedCategory.set(category);
  }
}
