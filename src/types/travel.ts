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
