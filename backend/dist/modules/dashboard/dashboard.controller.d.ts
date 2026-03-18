import { DashboardService } from './dashboard.service';
import { GetDashboardTodayDto } from './dto/get-dashboard-today.dto';
import { Request } from 'express';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
}
