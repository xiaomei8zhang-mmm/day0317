export declare enum ScheduleEventType {
    VACCINE = "vaccine",
    CHECKUP = "checkup",
    SCHOOL = "school",
    CUSTOM = "custom"
}
export declare class CreateScheduleEventDto {
    childId?: number;
    eventType: ScheduleEventType;
    title: string;
    eventTime: string;
    location?: string;
    note?: string;
    remindOffsets: number[];
}
