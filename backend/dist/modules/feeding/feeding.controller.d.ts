import { FeedingService } from './feeding.service';
import { GetFeedingRecommendationsDto } from './dto/get-feeding-recommendations.dto';
export declare class FeedingController {
    private readonly feedingService;
    constructor(feedingService: FeedingService);
    getRecommendations(query: GetFeedingRecommendationsDto): {
        childId: number;
        date: string;
        stage: string;
        allergens: string[];
        meals: {
            breakfast: {
                name: string;
                tags: string[];
                alternatives: string[];
            };
            lunch: {
                name: string;
                tags: string[];
                alternatives: string[];
            };
            dinner: {
                name: string;
                tags: string[];
                alternatives: string[];
            };
        };
        snacks: string[];
        nutritionGoal: {
            proteinG: number;
            vegetableG: number;
            waterMl: number;
        };
    };
}
