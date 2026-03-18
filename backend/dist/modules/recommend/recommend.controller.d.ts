import { RecommendService } from './recommend.service';
import { GetRecommendQueryDto } from './dto/get-recommend-query.dto';
export declare class RecommendController {
    private readonly recommendService;
    constructor(recommendService: RecommendService);
    getPlaces(query: GetRecommendQueryDto): {
        city: string;
        weatherMode: string;
        items: {
            id: number;
            name: string;
            distanceKm: number;
            indoor: boolean;
            ageRange: string;
            avgCost: number;
        }[];
    };
    getSchools(query: GetRecommendQueryDto): {
        city: string;
        stage: "nursery_0_3" | "kindergarten_3_6" | "primary_6_12" | "middle_12_plus";
        compliance: {
            source: string;
            updatedAt: string;
            notice: string;
        };
        items: {
            id: number;
            name: string;
            distanceKm: number;
            ownership: string;
            tuitionRange: string;
            features: string[];
            rating: number;
        }[];
    };
}
