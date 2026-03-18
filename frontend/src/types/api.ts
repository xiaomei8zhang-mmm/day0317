export interface ApiResponse<T> {
  code: number;
  message: string;
  requestId: string;
  data: T;
}

export interface DashboardData {
  date: string;
  child: { id: number; name: string; stage: string };
  weather: { city: string; condition: string; temp: number; feelLike: number; source?: string };
  outfit: { brand: string; suggestion: string };
  food: { breakfast: string; lunch: string; dinner: string };
  upcomingEvents: Array<{ id: number; title: string; eventTime: string; daysLeft: number }>;
  nearbyTop?: Array<{ id: number; name: string; distanceKm: number; indoor: boolean }>;
  expenseSummary: { monthTotal: number; budget: number; usageRate: number };
}

export interface FeedingData {
  childId: number;
  date: string;
  stage: string;
  allergens: string[];
  meals: {
    breakfast: { name: string; tags: string[]; alternatives: string[] };
    lunch: { name: string; tags: string[]; alternatives: string[] };
    dinner: { name: string; tags: string[]; alternatives: string[] };
  };
  snacks: string[];
  nutritionGoal: { proteinG: number; vegetableG: number; waterMl: number };
}

export interface OutfitData {
  weather: { temperature: number; rainProbability: number };
  suggestion: { layers: string[]; needWaterproof: boolean; text: string };
  brands: Array<{
    name: string;
    priceLevel: string;
    material: string;
    comfort: number;
    durability: number;
    careDifficulty: number;
  }>;
}

export interface PlaceRecommendData {
  city: string;
  weatherMode: string;
  items: Array<{
    id: number;
    name: string;
    distanceKm: number;
    indoor: boolean;
    ageRange: string;
    avgCost: number;
  }>;
}

export interface SchoolRecommendData {
  city: string;
  stage: string;
  compliance?: {
    source: string;
    updatedAt: string;
    notice: string;
  };
  items: Array<{
    id: number;
    name: string;
    distanceKm: number;
    ownership: string;
    tuitionRange: string;
    features: string[];
    rating: number;
  }>;
}

export interface HealthSummaryData {
  childId: number;
  latest: {
    weightKg: number;
    heightCm: number;
    sleepHoursAvg7d: number;
  };
  trend: Array<{ date: string; weightKg: number; heightCm: number }>;
  alerts: string[];
}

export interface ExpenseCreatePayload {
  childId?: number;
  amount: number;
  category: 'food' | 'diaper' | 'clothing' | 'medical' | 'education' | 'toy' | 'travel' | 'other';
  paidAt: string;
  note?: string;
}

export interface ExpenseCreateData {
  expenseId: number;
  monthTotal: number;
  budgetUsageRate: number;
  warning: string | null;
}

export interface ExpenseSummaryData {
  range: 'month' | 'quarter' | 'year';
  total: number;
  budget: number;
  usageRate: number;
  categories: Array<{ category: string; ratio: number }>;
}

export interface ScheduleCreatePayload {
  childId?: number;
  eventType: 'vaccine' | 'checkup' | 'school' | 'custom';
  title: string;
  eventTime: string;
  location?: string;
  note?: string;
  remindOffsets: number[];
}

export interface ScheduleCreateData {
  eventId: number;
  reminderJobs: number;
  status: string;
}

export interface ScheduleListData {
  total: number;
  items: Array<{
    id: number;
    childId: number;
    eventType: 'vaccine' | 'checkup' | 'school' | 'custom';
    title: string;
    eventTime: string;
    location?: string;
    note?: string;
    remindOffsets: number[];
    status: 'pending' | 'completed' | 'overdue';
  }>;
}

export interface ScheduleUpdateData {
  updated: boolean;
  eventId: number;
  status?: 'pending' | 'completed' | 'overdue';
}

export interface HealthCreatePayload {
  childId?: number;
  recordTime: string;
  weightKg?: number;
  heightCm?: number;
  temperatureC?: number;
  sleepHours?: number;
  note?: string;
}

export interface HealthCreateData {
  recordId: number;
  warning: string | null;
}

export interface VoiceParsePayload {
  sessionId: string;
  text: string;
}

export interface VoiceParseData {
  intent: string;
  confidence: number;
  slots: Record<string, unknown>;
  needConfirm: boolean;
}

export interface VoiceExecutePayload {
  sessionId: string;
  intent: string;
  slots: Record<string, unknown>;
}

export interface VoiceExecuteData {
  text: string;
  tts: string;
  action: { type: string; target: string };
}
