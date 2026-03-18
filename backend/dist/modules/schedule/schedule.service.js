"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mock_db_1 = require("../../common/data/mock-db");
let ScheduleService = class ScheduleService {
    createEvent(payload) {
        const id = mock_db_1.mockDb.ids.schedule++;
        const remindOffsets = [...new Set(payload.remindOffsets)].sort((a, b) => b - a);
        const safeReminders = remindOffsets.slice(0, 4);
        mock_db_1.mockDb.scheduleEvents.push({
            id,
            childId: payload.childId ?? mock_db_1.mockDb.child.id,
            eventType: payload.eventType,
            title: payload.title,
            eventTime: payload.eventTime,
            location: payload.location,
            note: payload.note,
            remindOffsets: safeReminders,
            status: 'pending',
        });
        return {
            eventId: id,
            reminderJobs: safeReminders.length,
            status: 'pending',
        };
    }
    listEvents(query) {
        const now = new Date();
        const mapped = mock_db_1.mockDb.scheduleEvents.map((event) => {
            if (event.status !== 'completed' && new Date(event.eventTime) < now) {
                return { ...event, status: 'overdue' };
            }
            return event;
        });
        const filtered = query.status ? mapped.filter((event) => event.status === query.status) : mapped;
        return {
            total: filtered.length,
            items: filtered,
        };
    }
    updateStatus(id, payload) {
        const target = mock_db_1.mockDb.scheduleEvents.find((item) => item.id === id);
        if (!target) {
            return {
                updated: false,
                eventId: id,
            };
        }
        target.status = payload.status;
        return {
            updated: true,
            eventId: id,
            status: target.status,
        };
    }
    getUpcoming(limit = 3) {
        return [...mock_db_1.mockDb.scheduleEvents]
            .filter((item) => item.status !== 'completed')
            .sort((a, b) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime())
            .slice(0, limit)
            .map((item) => ({
            id: item.id,
            title: item.title,
            eventTime: item.eventTime,
            daysLeft: Math.max(0, Math.ceil((new Date(item.eventTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
        }));
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)()
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map