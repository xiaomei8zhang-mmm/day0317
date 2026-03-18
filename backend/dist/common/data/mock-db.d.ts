export type ExpenseCategory = 'food' | 'diaper' | 'clothing' | 'medical' | 'education' | 'toy' | 'travel' | 'other';
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
export declare const mockDb: {
    child: {
        id: number;
        name: string;
        stage: string;
        ageMonths: number;
        allergies: string[];
    };
    expenses: ExpenseRecordItem[];
    budgetByMonth: number;
    scheduleEvents: ScheduleEventItem[];
    healthRecords: HealthRecordItem[];
    ids: {
        expense: number;
        schedule: number;
        health: number;
    };
};
export declare const resetMockDb: () => void;
