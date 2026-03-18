import { VoiceParseDto } from './dto/voice-parse.dto';
import { VoiceExecuteDto } from './dto/voice-execute.dto';
import { ExpenseService } from '../expense/expense.service';
import { ScheduleService } from '../schedule/schedule.service';
export declare class VoiceService {
    private readonly expenseService;
    private readonly scheduleService;
    constructor(expenseService: ExpenseService, scheduleService: ScheduleService);
    parse(payload: VoiceParseDto): {
        intent: string;
        confidence: number;
        slots: {
            range: string;
            radius?: undefined;
            amount?: undefined;
            category?: undefined;
            title?: undefined;
            eventTime?: undefined;
        };
        needConfirm: boolean;
    } | {
        intent: string;
        confidence: number;
        slots: {
            range?: undefined;
            radius?: undefined;
            amount?: undefined;
            category?: undefined;
            title?: undefined;
            eventTime?: undefined;
        };
        needConfirm: boolean;
    } | {
        intent: string;
        confidence: number;
        slots: {
            radius: number;
            range?: undefined;
            amount?: undefined;
            category?: undefined;
            title?: undefined;
            eventTime?: undefined;
        };
        needConfirm: boolean;
    } | {
        intent: string;
        confidence: number;
        slots: {
            amount: number;
            category: string;
            range?: undefined;
            radius?: undefined;
            title?: undefined;
            eventTime?: undefined;
        };
        needConfirm: boolean;
    } | {
        intent: string;
        confidence: number;
        slots: {
            title: string;
            eventTime: string;
            range?: undefined;
            radius?: undefined;
            amount?: undefined;
            category?: undefined;
        };
        needConfirm: boolean;
    };
    execute(payload: VoiceExecuteDto): {
        text: string;
        tts: string;
        action: {
            type: string;
            target: string;
        };
    };
}
