"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMockDb = exports.mockDb = void 0;
exports.mockDb = {
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
    ],
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
    ],
    healthRecords: [
        { id: 8001, childId: 101, recordTime: '2026-03-01 09:00:00', weightKg: 13.2, heightCm: 89.4, sleepHours: 10.0 },
        { id: 8002, childId: 101, recordTime: '2026-03-08 09:00:00', weightKg: 13.3, heightCm: 89.7, sleepHours: 10.2 },
        { id: 8003, childId: 101, recordTime: '2026-03-15 09:00:00', weightKg: 13.4, heightCm: 90.1, sleepHours: 10.1 },
    ],
    ids: {
        expense: 10000,
        schedule: 7100,
        health: 8100,
    },
};
const initialState = JSON.parse(JSON.stringify(exports.mockDb));
const resetMockDb = () => {
    Object.assign(exports.mockDb, JSON.parse(JSON.stringify(initialState)));
};
exports.resetMockDb = resetMockDb;
//# sourceMappingURL=mock-db.js.map