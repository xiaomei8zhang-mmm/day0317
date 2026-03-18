import { GetFeedingRecommendationsDto } from './dto/get-feeding-recommendations.dto';
export declare class FeedingService {
    private readonly mealPool;
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
    private pickMeal;
}
