"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mock_db_1 = require("../../common/data/mock-db");
const expense_service_1 = require("../expense/expense.service");
const feeding_service_1 = require("../feeding/feeding.service");
const nearby_service_1 = require("../nearby/nearby.service");
const outfit_service_1 = require("../outfit/outfit.service");
const schedule_service_1 = require("../schedule/schedule.service");
let DashboardService = class DashboardService {
    constructor(expenseService, feedingService, nearbyService, outfitService, scheduleService) {
        this.expenseService = expenseService;
        this.feedingService = feedingService;
        this.nearbyService = nearbyService;
        this.outfitService = outfitService;
        this.scheduleService = scheduleService;
        this.weatherCnCityCodeMap = {
            北京: '101010100',
            beijing: '101010100',
            上海: '101020100',
            shanghai: '101020100',
            广州: '101280101',
            guangzhou: '101280101',
            深圳: '101280601',
            shenzhen: '101280601',
            杭州: '101210101',
            hangzhou: '101210101',
            南京: '101190101',
            nanjing: '101190101',
            苏州: '101190401',
            suzhou: '101190401',
            武汉: '101200101',
            wuhan: '101200101',
            成都: '101270101',
            chengdu: '101270101',
            重庆: '101040100',
            chongqing: '101040100',
            天津: '101030100',
            tianjin: '101030100',
            西安: '101110101',
            xian: '101110101',
            长沙: '101250101',
            changsha: '101250101',
            郑州: '101180101',
            zhengzhou: '101180101',
            青岛: '101120201',
            qingdao: '101120201',
            宁波: '101210401',
            ningbo: '101210401',
            厦门: '101230201',
            xiamen: '101230201',
            福州: '101230101',
            fuzhou: '101230101',
            昆明: '101290101',
            kunming: '101290101',
            哈尔滨: '101050101',
            haerbin: '101050101',
            沈阳: '101070101',
            shenyang: '101070101',
            大连: '101070201',
            dalian: '101070201',
            济南: '101120101',
            jinan: '101120101',
            合肥: '101220101',
            hefei: '101220101',
            南昌: '101240101',
            nanchang: '101240101',
            石家庄: '101090101',
            shijiazhuang: '101090101',
            太原: '101100101',
            taiyuan: '101100101',
            南宁: '101300101',
            nanning: '101300101',
            海口: '101310101',
            haikou: '101310101',
            兰州: '101160101',
            lanzhou: '101160101',
            乌鲁木齐: '101130101',
            urumqi: '101130101',
            拉萨: '101140101',
            lasa: '101140101',
        };
        this.weatherCnPrefixIndex = null;
        this.weatherCnResolvedCodeCache = {};
        this.weatherResultCache = {};
    }
    async getToday(query, req) {
        const clientIp = this.getClientIp(req);
        const city = query.city || (await this.resolveCityByIp(clientIp)) || '北京';
        const realtimeWeather = await this.getRealtimeWeatherFromWeatherCn(city);
        const feeding = this.feedingService.getRecommendations({ childId: query.childId });
        const outfit = this.outfitService.getRecommendations({
            temperature: String(realtimeWeather.temp),
        });
        const nearby = this.nearbyService.getPlaces({ city, weather: 'sunny' });
        const summary = this.expenseService.getSummary({ range: 'month' });
        return {
            date: '2026-03-15',
            child: {
                id: query.childId ? Number(query.childId) : 101,
                name: mock_db_1.mockDb.child.name,
                stage: mock_db_1.mockDb.child.stage,
            },
            weather: {
                city,
                condition: realtimeWeather.condition,
                temp: realtimeWeather.temp,
                feelLike: realtimeWeather.feelLike,
                source: realtimeWeather.source,
            },
            outfit: {
                brand: outfit.brands[0]?.name || '巴拉巴拉',
                suggestion: outfit.suggestion.layers.join('+'),
            },
            food: {
                breakfast: feeding.meals.breakfast.name,
                lunch: feeding.meals.lunch.name,
                dinner: feeding.meals.dinner.name,
            },
            upcomingEvents: this.scheduleService.getUpcoming(3),
            nearbyTop: nearby.items.slice(0, 2),
            expenseSummary: {
                monthTotal: summary.total,
                budget: summary.budget,
                usageRate: summary.usageRate,
            },
        };
    }
    getClientIp(req) {
        const xForwardedFor = req.headers['x-forwarded-for'];
        if (typeof xForwardedFor === 'string' && xForwardedFor.length > 0) {
            return xForwardedFor.split(',')[0].trim();
        }
        if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
            return xForwardedFor[0].split(',')[0].trim();
        }
        return req.ip || '';
    }
    async resolveCityByIp(ip) {
        if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
            return null;
        }
        const data = await this.fetchJsonWithTimeout(`http://ip-api.com/json/${encodeURIComponent(ip)}?lang=zh-CN`, 1200);
        return data?.city || null;
    }
    async getRealtimeWeather(city) {
        const realtime = await this.getRealtimeWeatherFromWeatherCn(city);
        return realtime;
    }
    async getRealtimeWeatherFromWeatherCn(city) {
        const cached = this.weatherResultCache[city];
        if (cached && Date.now() - cached.ts < 5 * 60 * 1000) {
            return {
                condition: cached.condition,
                temp: cached.temp,
                feelLike: cached.feelLike,
                source: cached.source,
            };
        }
        const cityCode = await this.resolveWeatherCnCityCode(city);
        if (!cityCode) {
            return this.getRealtimeWeatherFallback(city);
        }
        const data = await this.fetchJsonWithTimeout(`https://www.weather.com.cn/data/sk/${cityCode}.html`, 12000, {
            Accept: 'application/json,text/plain,*/*',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            Referer: 'https://www.weather.com.cn/',
        });
        const info = data?.weatherinfo;
        if (!info?.temp) {
            return this.getRealtimeWeatherFallback(city);
        }
        const temp = Number(info.temp);
        const windDirection = info.WD || '天气网';
        const windScale = info.WS || '实况';
        const condition = `${windDirection} ${windScale}`.trim();
        const result = {
            condition,
            temp: Number.isNaN(temp) ? 11 : temp,
            feelLike: Number.isNaN(temp) ? 9 : temp,
            source: 'weather.com.cn',
        };
        this.weatherResultCache[city] = { ...result, ts: Date.now() };
        return result;
    }
    async resolveWeatherCnCityCode(city) {
        const normalized = this.normalizeCityKey(city);
        const seeded = this.weatherCnCityCodeMap[normalized] || this.weatherCnCityCodeMap[city];
        if (seeded)
            return seeded;
        if (this.weatherCnResolvedCodeCache[normalized])
            return this.weatherCnResolvedCodeCache[normalized];
        const prefixIndex = await this.ensureWeatherCnPrefixIndex();
        const candidatePrefixes = prefixIndex[normalized] || this.fuzzyMatchCityPrefixes(prefixIndex, normalized);
        if (!candidatePrefixes.length)
            return null;
        for (const prefix of candidatePrefixes.slice(0, 3)) {
            for (const suffix of ['00', '01']) {
                const candidateCode = `${prefix}${suffix}`;
                if (await this.isValidWeatherCnCode(candidateCode)) {
                    this.weatherCnResolvedCodeCache[normalized] = candidateCode;
                    return candidateCode;
                }
            }
        }
        return null;
    }
    normalizeCityKey(city) {
        return city
            .toLowerCase()
            .replace(/市|特别行政区|自治区|壮族|回族|维吾尔/g, '')
            .trim();
    }
    fuzzyMatchCityPrefixes(prefixIndex, normalized) {
        const hit = Object.entries(prefixIndex).find(([key]) => key.includes(normalized) || normalized.includes(key));
        return hit ? hit[1] : [];
    }
    async ensureWeatherCnPrefixIndex() {
        if (this.weatherCnPrefixIndex)
            return this.weatherCnPrefixIndex;
        const china = await this.fetchJsonWithTimeout('https://www.weather.com.cn/data/city3jdata/china.html', 1500);
        if (!china) {
            this.weatherCnPrefixIndex = {};
            return this.weatherCnPrefixIndex;
        }
        const entries = await Promise.all(Object.keys(china).map(async (provCode) => {
            const cities = await this.fetchJsonWithTimeout(`https://www.weather.com.cn/data/city3jdata/provshi/${provCode}.html`, 1500);
            if (!cities)
                return [];
            return Object.entries(cities).map(([citySeq, cityName]) => {
                const normalizedSeq = citySeq === '00' ? '01' : citySeq;
                return {
                    cityName: this.normalizeCityKey(cityName),
                    prefix: `${provCode}${normalizedSeq}`,
                };
            });
        }));
        const index = {};
        for (const cityPairs of entries) {
            for (const pair of cityPairs) {
                if (!index[pair.cityName])
                    index[pair.cityName] = [];
                if (!index[pair.cityName].includes(pair.prefix)) {
                    index[pair.cityName].push(pair.prefix);
                }
            }
        }
        this.weatherCnPrefixIndex = index;
        return this.weatherCnPrefixIndex;
    }
    async isValidWeatherCnCode(cityCode) {
        const data = await this.fetchJsonWithTimeout(`https://www.weather.com.cn/data/sk/${cityCode}.html`, 3000, {
            Accept: 'application/json,text/plain,*/*',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            Referer: 'https://www.weather.com.cn/',
        });
        return Boolean(data?.weatherinfo?.temp);
    }
    async getRealtimeWeatherFallback(city) {
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
        const data = await this.fetchJsonWithTimeout(url, 1200);
        const current = data?.current_condition?.[0];
        const temp = Number(current?.temp_C ?? 11);
        const feelLike = Number(current?.FeelsLikeC ?? temp - 2);
        const condition = current?.lang_zh?.[0]?.value || current?.weatherDesc?.[0]?.value || '天气网实况';
        const result = {
            condition,
            temp: Number.isNaN(temp) ? 11 : temp,
            feelLike: Number.isNaN(feelLike) ? 9 : feelLike,
            source: 'fallback',
        };
        this.weatherResultCache[city] = { ...result, ts: Date.now() };
        return result;
    }
    async fetchJsonWithTimeout(url, timeoutMs, headers) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const resp = await fetch(url, { signal: controller.signal, headers });
            if (!resp.ok)
                return null;
            return (await resp.json());
        }
        catch {
            return null;
        }
        finally {
            clearTimeout(timer);
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        feeding_service_1.FeedingService,
        nearby_service_1.NearbyService,
        outfit_service_1.OutfitService,
        schedule_service_1.ScheduleService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map