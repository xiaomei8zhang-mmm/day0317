import { GetNearbyPlacesDto } from './dto/get-nearby-places.dto';
import { GetNearbySchoolsDto } from './dto/get-nearby-schools.dto';
export declare class NearbyService {
    getPlaces(query: GetNearbyPlacesDto): {
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
    getSchools(query: GetNearbySchoolsDto): {
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
    private placeScore;
}
