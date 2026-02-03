import { UserProfile, UserPreferences, Companion, SavedPlace } from "@/types/travel";
import { mockDestinations } from "./mockData";

export const mockUserProfile: UserProfile = {
  id: "user-1",
  name: "Александр Петров",
  email: "alex.petrov@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  phone: "+7 (999) 123-45-67",
  city: "Москва",
  bio: "Люблю путешествовать и открывать новые места. Предпочитаю культурный туризм и гастрономические приключения.",
};

export const mockUserPreferences: UserPreferences = {
  travelStyle: ["Культурный туризм", "Гастрономия", "Пешие прогулки"],
  budgetRange: "medium",
  preferredSeasons: ["Весна", "Осень"],
  interests: ["Архитектура", "Музеи", "Местная кухня", "Фотография"],
  avoidCategories: ["Экстрим", "Ночная жизнь"],
};

export const mockCompanions: Companion[] = [
  {
    id: "comp-1",
    name: "Мария Иванова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "accepted",
    sharedTrips: 5,
  },
  {
    id: "comp-2",
    name: "Дмитрий Козлов",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "accepted",
    sharedTrips: 3,
  },
  {
    id: "comp-3",
    name: "Елена Смирнова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "pending",
    sharedTrips: 0,
  },
  {
    id: "comp-4",
    name: "Андрей Новиков",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "accepted",
    sharedTrips: 2,
  },
];

export const mockSavedPlaces: SavedPlace[] = [
  {
    id: "saved-1",
    destination: mockDestinations[0], // Киото
    savedAt: "2024-01-15",
    notes: "Хочу посетить во время цветения сакуры",
  },
  {
    id: "saved-2",
    destination: mockDestinations[2], // Рейкьявик
    savedAt: "2024-01-10",
    notes: "Северное сияние — мечта!",
  },
  {
    id: "saved-3",
    destination: mockDestinations[5], // Бали
    savedAt: "2024-01-05",
  },
  {
    id: "saved-4",
    destination: mockDestinations[9], // Амстердам
    savedAt: "2024-01-02",
    notes: "Музеи и тюльпаны",
  },
];

export const travelStyleOptions = [
  "Культурный туризм",
  "Гастрономия",
  "Пляжный отдых",
  "Активный отдых",
  "Экотуризм",
  "Городские прогулки",
  "Пешие прогулки",
  "Приключения",
];

export const interestOptions = [
  "Архитектура",
  "Музеи",
  "Местная кухня",
  "Фотография",
  "История",
  "Природа",
  "Искусство",
  "Музыка",
  "Спорт",
  "Шопинг",
];

export const seasonOptions = ["Весна", "Лето", "Осень", "Зима"];
