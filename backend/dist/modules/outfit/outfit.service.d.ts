import { GetOutfitRecommendationsDto } from './dto/get-outfit-recommendations.dto';
export declare class OutfitService {
    getRecommendations(query: GetOutfitRecommendationsDto): {
        weather: {
            temperature: number;
            rainProbability: number;
        };
        suggestion: {
            layers: string[];
            needWaterproof: boolean;
            text: string;
        };
        brands: {
            name: string;
            priceLevel: string;
            material: string;
            comfort: number;
            durability: number;
            careDifficulty: number;
        }[];
    };
}
