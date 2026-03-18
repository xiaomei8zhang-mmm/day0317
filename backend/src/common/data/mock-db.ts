export type ExpenseCategory =
  | 'food'
  | 'diaper'
  | 'clothing'
  | 'medical'
  | 'education'
  | 'toy'
  | 'travel'
  | 'other';

export type ScheduleStatus = 'pending' | 'completed' | 'overdue';

export interface ExpenseRecordItem {
  id: number;
  childId: number;
  amount: number;
  category: ExpenseCategory;
  paidAt: string;
  note?: string;
}

export interface ScheduleEventItem {
  id: number;
  childId: number;
  eventType: 'vaccine' | 'checkup' | 'school' | 'custom';
  title: string;
  eventTime: string;
  location?: string;
  note?: string;
  remindOffsets: number[];
  status: ScheduleStatus;
}

export interface HealthRecordItem {
  id: number;
  childId: number;
  recordTime: string;
  weightKg?: number;
  heightCm?: number;
  temperatureC?: number;
  sleepHours?: number;
  note?: string;
}

export const mockDb = {
  child: {
    id: 101,
    name: '小米',
    stage: '1_3y',
    ageMonths: 28,
    allergies: ['花生'],
  },
  expenses: [
    { id: 9900, childId: 101, amount: 1650, category: 'food', paidAt: '2026-03-03 09:00:00' },
    { id: 9901, childId: 101, amount: 1020, category: 'medical', paidAt: '2026-03-05 10:00:00' },
    { id: 9902, childId: 101, amount: 880, category: 'education', paidAt: '2026-03-08 11:00:00' },
    { id: 9903, childId: 101, amount: 730, category: 'clothing', paidAt: '2026-03-10 12:00:00' },
    { id: 9904, childId: 101, amount: 585, category: 'diaper', paidAt: '2026-03-12 13:00:00' },
  ] as ExpenseRecordItem[],
  budgetByMonth: 5500,
  scheduleEvents: [
    {
      id: 7001,
      childId: 101,
      eventType: 'checkup',
      title: '儿保复查',
      eventTime: '2026-03-17 10:00:00',
      remindOffsets: [10080, 4320, 1440, 0],
      status: 'pending',
      location: '朝阳妇幼保健院',
    },
    {
      id: 7002,
      childId: 101,
      eventType: 'vaccine',
      title: '乙肝疫苗',
      eventTime: '2026-03-22 09:30:00',
      remindOffsets: [10080, 4320, 1440, 0],
      status: 'pending',
      location: '社区卫生服务中心',
    },
  ] as ScheduleEventItem[],
  healthRecords: [
    { id: 8001, childId: 101, recordTime: '2026-03-01 09:00:00', weightKg: 13.2, heightCm: 89.4, sleepHours: 10.0 },
    { id: 8002, childId: 101, recordTime: '2026-03-08 09:00:00', weightKg: 13.3, heightCm: 89.7, sleepHours: 10.2 },
    { id: 8003, childId: 101, recordTime: '2026-03-15 09:00:00', weightKg: 13.4, heightCm: 90.1, sleepHours: 10.1 },
  ] as HealthRecordItem[],
  ids: {
    expense: 10000,
    schedule: 7100,
    health: 8100,
  },
};

const initialState = JSON.parse(JSON.stringify(mockDb));

export const resetMockDb = (): void => {
  Object.assign(mockDb, JSON.parse(JSON.stringify(initialState)));
};
