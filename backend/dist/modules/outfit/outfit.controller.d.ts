import { OutfitService } from './outfit.service';
import { GetOutfitRecommendationsDto } from './dto/get-outfit-recommendations.dto';
export declare class OutfitController {
    private readonly outfitService;
    constructor(outfitService: OutfitService);
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
