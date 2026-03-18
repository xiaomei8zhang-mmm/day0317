import { Injectable } from '@nestjs/common';
import { GetDashboardTodayDto } from './dto/get-dashboard-today.dto';
import { mockDb } from '../../common/data/mock-db';
import { ExpenseService } from '../expense/expense.service';
import { FeedingService } from '../feeding/feeding.service';
import { NearbyService } from '../nearby/nearby.service';
import { OutfitService } from '../outfit/outfit.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Request } from 'express';

@Injectable()
export class DashboardService {
  private readonly weatherCnCityCodeMap: Record<string, string> = {
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
  private weatherCnPrefixIndex: Record<string, string[]> | null = null;
  private weatherCnResolvedCodeCache: Record<string, string> = {};
  private readonly weatherResultCache: Record<
    string,
    { condition: string; temp: number; feelLike: number; source: string; ts: number }
  > = {};

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly feedingService: FeedingService,
    private readonly nearbyService: NearbyService,
    private readonly outfitService: OutfitService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async getToday(query: GetDashboardTodayDto, req: Request) {
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
        name: mockDb.child.name,
        stage: mockDb.child.stage,
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

  private getClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string' && xForwardedFor.length > 0) {
      return xForwardedFor.split(',')[0].trim();
    }
    if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
      return xForwardedFor[0].split(',')[0].trim();
    }
    return req.ip || '';
  }

  private async resolveCityByIp(ip: string): Promise<string | null> {
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return null;
    }
    const data = await this.fetchJsonWithTimeout<{ city?: string }>(`http://ip-api.com/json/${encodeURIComponent(ip)}?lang=zh-CN`, 1200);
    return data?.city || null;
  }

  private async getRealtimeWeather(city: string): Promise<{
    condition: string;
    temp: number;
    feelLike: number;
    source: string;
  }> {
    const realtime = await this.getRealtimeWeatherFromWeatherCn(city);
    return realtime;
  }

  private async getRealtimeWeatherFromWeatherCn(
    city: string,
  ): Promise<{ condition: string; temp: number; feelLike: number; source: string }> {
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

    const data = await this.fetchJsonWithTimeout<{
      weatherinfo?: {
        city?: string;
        temp?: string;
        WD?: string;
        WS?: string;
      };
    }>(`https://www.weather.com.cn/data/sk/${cityCode}.html`, 12000, {
      Accept: 'application/json,text/plain,*/*',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
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

  private async resolveWeatherCnCityCode(city: string): Promise<string | null> {
    const normalized = this.normalizeCityKey(city);
    const seeded = this.weatherCnCityCodeMap[normalized] || this.weatherCnCityCodeMap[city];
    if (seeded) return seeded;
    if (this.weatherCnResolvedCodeCache[normalized]) return this.weatherCnResolvedCodeCache[normalized];

    const prefixIndex = await this.ensureWeatherCnPrefixIndex();
    const candidatePrefixes = prefixIndex[normalized] || this.fuzzyMatchCityPrefixes(prefixIndex, normalized);
    if (!candidatePrefixes.length) return null;

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

  private normalizeCityKey(city: string): string {
    return city
      .toLowerCase()
      .replace(/市|特别行政区|自治区|壮族|回族|维吾尔/g, '')
      .trim();
  }

  private fuzzyMatchCityPrefixes(
    prefixIndex: Record<string, string[]>,
    normalized: string,
  ): string[] {
    const hit = Object.entries(prefixIndex).find(
      ([key]) => key.includes(normalized) || normalized.includes(key),
    );
    return hit ? hit[1] : [];
  }

  private async ensureWeatherCnPrefixIndex(): Promise<Record<string, string[]>> {
    if (this.weatherCnPrefixIndex) return this.weatherCnPrefixIndex;

    const china = await this.fetchJsonWithTimeout<Record<string, string>>(
      'https://www.weather.com.cn/data/city3jdata/china.html',
      1500,
    );
    if (!china) {
      this.weatherCnPrefixIndex = {};
      return this.weatherCnPrefixIndex;
    }

    const entries = await Promise.all(
      Object.keys(china).map(async (provCode) => {
        const cities = await this.fetchJsonWithTimeout<Record<string, string>>(
          `https://www.weather.com.cn/data/city3jdata/provshi/${provCode}.html`,
          1500,
        );
        if (!cities) return [];
        return Object.entries(cities).map(([citySeq, cityName]) => {
          const normalizedSeq = citySeq === '00' ? '01' : citySeq;
          return {
            cityName: this.normalizeCityKey(cityName),
            prefix: `${provCode}${normalizedSeq}`,
          };
        });
      }),
    );

    const index: Record<string, string[]> = {};
    for (const cityPairs of entries) {
      for (const pair of cityPairs) {
        if (!index[pair.cityName]) index[pair.cityName] = [];
        if (!index[pair.cityName].includes(pair.prefix)) {
          index[pair.cityName].push(pair.prefix);
        }
      }
    }
    this.weatherCnPrefixIndex = index;
    return this.weatherCnPrefixIndex;
  }

  private async isValidWeatherCnCode(cityCode: string): Promise<boolean> {
    const data = await this.fetchJsonWithTimeout<{ weatherinfo?: { temp?: string } }>(
      `https://www.weather.com.cn/data/sk/${cityCode}.html`,
      3000,
      {
        Accept: 'application/json,text/plain,*/*',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        Referer: 'https://www.weather.com.cn/',
      },
    );
    return Boolean(data?.weatherinfo?.temp);
  }

  private async getRealtimeWeatherFallback(
    city: string,
  ): Promise<{ condition: string; temp: number; feelLike: number; source: string }> {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const data = await this.fetchJsonWithTimeout<{
      current_condition?: Array<{
        temp_C?: string;
        FeelsLikeC?: string;
        lang_zh?: Array<{ value?: string }>;
        weatherDesc?: Array<{ value?: string }>;
      }>;
    }>(url, 1200);

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

  private async fetchJsonWithTimeout<T>(
    url: string,
    timeoutMs: number,
    headers?: Record<string, string>,
  ): Promise<T | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const resp = await fetch(url, { signal: controller.signal, headers });
      if (!resp.ok) return null;
      return (await resp.json()) as T;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
