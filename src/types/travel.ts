export interface TravelEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  image: string;
  eventsCount: number;
  events: TravelEvent[];
  videos: VideoItem[];
  tags: string[];
  rating: number;
}

export interface SearchFilters {
  startDate: Date | null;
  endDate: Date | null;
  departureCity: string;
  maxDistance: number;
  withChildren: boolean;
  description: string;
}

export interface InterestTag {
  id: string;
  label: string;
  labelRu: string;
  active: boolean;
}

// User profile types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  city?: string;
  bio?: string;
}

export interface UserPreferences {
  travelStyle: string[];
  budgetRange: 'low' | 'medium' | 'high' | 'luxury';
  preferredSeasons: string[];
  interests: string[];
  avoidCategories: string[];
}

export interface Companion {
  id: string;
  name: string;
  avatar: string;
  status: 'pending' | 'accepted' | 'rejected';
  sharedTrips: number;
}

export interface SavedPlace {
  id: string;
  destination: Destination;
  savedAt: string;
  notes?: string;
}
