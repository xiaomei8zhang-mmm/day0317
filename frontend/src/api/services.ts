import {
  DashboardData,
  ExpenseCreateData,
  ExpenseCreatePayload,
  ExpenseSummaryData,
  FeedingData,
  HealthCreateData,
  HealthCreatePayload,
  HealthSummaryData,
  OutfitData,
  PlaceRecommendData,
  ScheduleCreateData,
  ScheduleCreatePayload,
  ScheduleListData,
  ScheduleUpdateData,
  SchoolRecommendData,
  VoiceExecuteData,
  VoiceExecutePayload,
  VoiceParseData,
  VoiceParsePayload,
} from '../types/api';
import { request } from './client';

export const api = {
  getDashboard: (childId = 101, city?: string) =>
    request<DashboardData>(
      city ? `/dashboard/today?childId=${childId}&city=${city}` : `/dashboard/today?childId=${childId}`,
    ),

  getFeeding: (childId = 101, date = '2026-03-15', allergens = '花生') =>
    request<FeedingData>(`/feeding/recommendations?childId=${childId}&date=${date}&allergens=${encodeURIComponent(allergens)}`),

  getOutfit: (childId = 101, temperature = 11, rainProbability = 20) =>
    request<OutfitData>(
      `/outfit/recommendations?childId=${childId}&temperature=${temperature}&rainProbability=${rainProbability}`,
    ),

  getNearbyPlaces: (city = 'beijing', weather = 'sunny', aqi = 40) =>
    request<PlaceRecommendData>(`/nearby/places?city=${city}&weather=${weather}&aqi=${aqi}`),

  getNearbySchools: (city = 'beijing', stage = 'kindergarten_3_6', budget = '2000-5000') =>
    request<SchoolRecommendData>(`/nearby/schools?city=${city}&stage=${stage}&budget=${budget}`),

  getHealthSummary: (childId = 101) =>
    request<HealthSummaryData>(`/health/summary?childId=${childId}`),

  createHealthRecord: (payload: HealthCreatePayload) =>
    request<HealthCreateData>('/health/record', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  createExpense: (payload: ExpenseCreatePayload) =>
    request<ExpenseCreateData>('/expenses', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getExpenseSummary: (range: 'month' | 'quarter' | 'year' = 'month') =>
    request<ExpenseSummaryData>(`/expenses/summary?range=${range}`),

  createSchedule: (payload: ScheduleCreatePayload) =>
    request<ScheduleCreateData>('/schedule/events', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getScheduleList: (status?: 'pending' | 'completed' | 'overdue') =>
    request<ScheduleListData>(status ? `/schedule/events?status=${status}` : '/schedule/events'),

  updateScheduleStatus: (id: number, status: 'pending' | 'completed' | 'overdue') =>
    request<ScheduleUpdateData>(`/schedule/events/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  voiceParse: (payload: VoiceParsePayload) =>
    request<VoiceParseData>('/voice/parse', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  voiceExecute: (payload: VoiceExecutePayload) =>
    request<VoiceExecuteData>('/voice/execute', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
