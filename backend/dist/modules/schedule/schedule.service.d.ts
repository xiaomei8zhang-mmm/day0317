import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { ListScheduleEventsDto } from './dto/list-schedule-events.dto';
import { UpdateScheduleStatusDto } from './dto/update-schedule-status.dto';
export declare class ScheduleService {
    createEvent(payload: CreateScheduleEventDto): {
        eventId: number;
        reminderJobs: number;
        status: string;
    };
    listEvents(query: ListScheduleEventsDto): {
        total: number;
        items: import("../../common/data/mock-db").ScheduleEventItem[];
    };
    updateStatus(id: number, payload: UpdateScheduleStatusDto): {
        updated: boolean;
        eventId: number;
        status?: undefined;
    } | {
        updated: boolean;
        eventId: number;
        status: import("../../common/data/mock-db").ScheduleStatus;
    };
    getUpcoming(limit?: number): {
        id: number;
        title: string;
        eventTime: string;
        daysLeft: number;
    }[];
}
