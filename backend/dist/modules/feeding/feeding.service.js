"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingService = void 0;
const common_1 = require("@nestjs/common");
const mock_db_1 = require("../../common/data/mock-db");
let FeedingService = class FeedingService {
    constructor() {
        this.mealPool = {
            breakfast: [
                { name: '南瓜小米粥 + 蒸蛋', tags: ['易消化'], allergens: ['蛋'], alternatives: ['山药鸡肉粥'] },
                { name: '蓝莓酸奶碗', tags: ['补钙'], allergens: ['乳制品'], alternatives: ['香蕉豆乳碗'] },
                { name: '山药鸡肉粥', tags: ['高蛋白'], allergens: [], alternatives: ['鳕鱼粥'] },
            ],
            lunch: [
                { name: '番茄牛肉面 + 西兰花', tags: ['高铁'], allergens: ['麸质'], alternatives: ['番茄牛肉饭'] },
                { name: '土豆鸡胸肉泥 + 玉米粒', tags: ['高能量'], allergens: [], alternatives: ['鸡腿肉炖土豆'] },
                { name: '胡萝卜鳕鱼面', tags: ['DHA'], allergens: ['鱼'], alternatives: ['鸡肉蔬菜面'] },
            ],
            dinner: [
                { name: '三文鱼粥 + 胡萝卜泥', tags: ['DHA'], allergens: ['鱼'], alternatives: ['鸡肉蔬菜粥'] },
                { name: '牛油果拌饭 + 豆腐', tags: ['优质脂肪'], allergens: ['大豆'], alternatives: ['南瓜豆角饭'] },
                { name: '小米南瓜饭 + 虾仁', tags: ['维生素A'], allergens: ['甲壳类'], alternatives: ['鸡丝小米饭'] },
            ],
        };
    }
    getRecommendations(query) {
        const childId = query.childId ? Number(query.childId) : mock_db_1.mockDb.child.id;
        const childAllergens = query.allergens
            ? query.allergens.split(',').map((item) => item.trim()).filter(Boolean)
            : mock_db_1.mockDb.child.allergies;
        return {
            childId,
            date: query.date || '2026-03-15',
            stage: mock_db_1.mockDb.child.stage,
            allergens: childAllergens,
            meals: {
                breakfast: this.pickMeal('breakfast', childAllergens),
                lunch: this.pickMeal('lunch', childAllergens),
                dinner: this.pickMeal('dinner', childAllergens),
            },
            snacks: ['水果丁 + 原味奶酪', '核桃（磨粉）'],
            nutritionGoal: {
                proteinG: 36,
                vegetableG: 300,
                waterMl: 1200,
            },
        };
    }
    pickMeal(type, allergens) {
        const target = this.mealPool[type].find((item) => !item.allergens.some((allergen) => allergens.includes(allergen))) || this.mealPool[type][0];
        return {
            name: target.name,
            tags: target.tags,
            alternatives: target.alternatives,
        };
    }
};
exports.FeedingService = FeedingService;
exports.FeedingService = FeedingService = __decorate([
    (0, common_1.Injectable)()
], FeedingService);
//# sourceMappingURL=feeding.service.js.map