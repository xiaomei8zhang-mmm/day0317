import { GetDashboardTodayDto } from './dto/get-dashboard-today.dto';
import { ExpenseService } from '../expense/expense.service';
import { FeedingService } from '../feeding/feeding.service';
import { NearbyService } from '../nearby/nearby.service';
import { OutfitService } from '../outfit/outfit.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Request } from 'express';
export declare class DashboardService {
    private readonly expenseService;
    private readonly feedingService;
    private readonly nearbyService;
    private readonly outfitService;
    private readonly scheduleService;
    private readonly weatherCnCityCodeMap;
    private weatherCnPrefixIndex;
    private weatherCnResolvedCodeCache;
    private readonly weatherResultCache;
    constructor(expenseService: ExpenseService, feedingService: FeedingService, nearbyService: NearbyService, outfitService: OutfitService, scheduleService: ScheduleService);
    getToday(query: GetDashboardTodayDto, req: Request): Promise<{
        date: string;
        child: {
            id: number;
            name: string;
            stage: string;
        };
        weather: {
            city: string;
            condition: string;
            temp: number;
            feelLike: number;
            source: string;
        };
        outfit: {
            brand: string;
            suggestion: string;
        };
        food: {
            breakfast: string;
            lunch: string;
            dinner: string;
        };
        upcomingEvents: {
            id: number;
            title: string;
            eventTime: string;
            daysLeft: number;
        }[];
        nearbyTop: {
            id: number;
            name: string;
            distanceKm: number;
            indoor: boolean;
            ageRange: string;
            avgCost: number;
        }[];
        expenseSummary: {
            monthTotal: number;
            budget: number;
            usageRate: number;
        };
    }>;
    private getClientIp;
    private resolveCityByIp;
    private getRealtimeWeather;
    private getRealtimeWeatherFromWeatherCn;
    private resolveWeatherCnCityCode;
    private normalizeCityKey;
    private fuzzyMatchCityPrefixes;
    private ensureWeatherCnPrefixIndex;
    private isValidWeatherCnCode;
    private getRealtimeWeatherFallback;
    private fetchJsonWithTimeout;
}
