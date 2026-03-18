import { Injectable } from '@nestjs/common';
import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { ListScheduleEventsDto } from './dto/list-schedule-events.dto';
import { UpdateScheduleStatusDto } from './dto/update-schedule-status.dto';
import { mockDb } from '../../common/data/mock-db';

@Injectable()
export class ScheduleService {
  createEvent(payload: CreateScheduleEventDto) {
    const id = mockDb.ids.schedule++;
    const remindOffsets = [...new Set(payload.remindOffsets)].sort((a, b) => b - a);
    const safeReminders = remindOffsets.slice(0, 4);
    mockDb.scheduleEvents.push({
      id,
      childId: payload.childId ?? mockDb.child.id,
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

  listEvents(query: ListScheduleEventsDto) {
    const now = new Date();
    const mapped = mockDb.scheduleEvents.map((event) => {
      if (event.status !== 'completed' && new Date(event.eventTime) < now) {
        return { ...event, status: 'overdue' as const };
      }
      return event;
    });
    const filtered = query.status ? mapped.filter((event) => event.status === query.status) : mapped;
    return {
      total: filtered.length,
      items: filtered,
    };
  }

  updateStatus(id: number, payload: UpdateScheduleStatusDto) {
    const target = mockDb.scheduleEvents.find((item) => item.id === id);
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
    return [...mockDb.scheduleEvents]
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
}
