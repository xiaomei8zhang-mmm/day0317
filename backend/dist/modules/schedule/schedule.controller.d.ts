import { ScheduleService } from './schedule.service';
import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { ListScheduleEventsDto } from './dto/list-schedule-events.dto';
import { UpdateScheduleStatusDto } from './dto/update-schedule-status.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    list(query: ListScheduleEventsDto): {
        total: number;
        items: import("../../common/data/mock-db").ScheduleEventItem[];
    };
    create(payload: CreateScheduleEventDto): {
        eventId: number;
        reminderJobs: number;
        status: string;
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
}
