import { FeedingData, HealthCreateData, HealthSummaryData, OutfitData, PlaceRecommendData, SchoolRecommendData } from '../types/api';
import { SectionCard } from '../components/SectionCard';

export function FoodPage({ feeding, outfit }: { feeding: FeedingData | null; outfit: OutfitData | null }) {
  return (
    <div className="page-grid">
      <SectionCard title={`分龄吃法建议（${feeding?.stage || '1_3y'}）`}>
        <ul className="list">
          <li>早餐：{feeding?.meals.breakfast.name || '-'}</li>
          <li>午餐：{feeding?.meals.lunch.name || '-'}</li>
          <li>晚餐：{feeding?.meals.dinner.name || '-'}</li>
        </ul>
        <p className="muted">过敏源过滤：{feeding?.allergens.join('、') || '无'}</p>
      </SectionCard>
      <SectionCard title="营养目标">
        <ul className="list">
          <li>蛋白质：{feeding?.nutritionGoal.proteinG ?? '--'}g</li>
          <li>蔬果：{feeding?.nutritionGoal.vegetableG ?? '--'}g</li>
          <li>饮水：{feeding?.nutritionGoal.waterMl ?? '--'}ml</li>
        </ul>
      </SectionCard>
      <SectionCard title="今日穿搭建议">
        <p>{outfit?.suggestion.text || '-'}</p>
        <p className="muted">分层：{outfit?.suggestion.layers.join(' + ') || '-'}</p>
        <ul className="list">
          {(outfit?.brands || []).slice(0, 3).map((brand) => (
            <li key={brand.name}>
              {brand.name} · 舒适度 {brand.comfort} · 耐穿度 {brand.durability}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

export function RecommendPage({
  places,
  schools,
  onRefresh,
}: {
  places: PlaceRecommendData | null;
  schools: SchoolRecommendData | null;
  onRefresh: () => void;
}) {
  return (
    <div className="page-grid">
      <SectionCard title="附近玩乐推荐" right={<button onClick={onRefresh}>刷新</button>}>
        <ul className="list">
          {(places?.items || []).map((item) => (
            <li key={item.id}>
              {item.name}（{item.distanceKm}km · {item.indoor ? '室内' : '户外'} · 约¥{item.avgCost}）
            </li>
          ))}
          {!places?.items?.length ? <li>暂无数据</li> : null}
        </ul>
      </SectionCard>
      <SectionCard title="学校推荐">
        <p className="muted">
          {schools?.compliance?.notice || '以当地教育主管部门最新公告为准'}
        </p>
        <ul className="list">
          {(schools?.items || []).map((item) => (
            <li key={item.id}>
              {item.name}（{item.distanceKm}km · {item.ownership} · {item.tuitionRange}）
            </li>
          ))}
          {!schools?.items?.length ? <li>暂无数据</li> : null}
        </ul>
      </SectionCard>
    </div>
  );
}

export function HealthPage({
  data,
  onRefresh,
  onCreateRecord,
  createResult,
}: {
  data: HealthSummaryData | null;
  onRefresh: () => void;
  onCreateRecord: () => Promise<void>;
  createResult: HealthCreateData | null;
}) {
  return (
    <div className="page-grid">
      <SectionCard
        title="健康趋势"
        right={
          <div className="actions">
            <button onClick={() => void onRefresh()}>刷新</button>
            <button onClick={() => void onCreateRecord()}>新增记录</button>
          </div>
        }
      >
        <ul className="list">
          <li>体重：{data?.latest.weightKg ?? '-'}kg</li>
          <li>身高：{data?.latest.heightCm ?? '-'}cm</li>
          <li>睡眠均值：{data?.latest.sleepHoursAvg7d ?? '-'}h</li>
        </ul>
        {createResult?.warning ? <p className="error">{createResult.warning}</p> : null}
      </SectionCard>
      <SectionCard title="近三次趋势">
        <ul className="list">
          {(data?.trend || []).map((t) => (
            <li key={t.date}>{t.date} · {t.weightKg}kg / {t.heightCm}cm</li>
          ))}
          {!data?.trend?.length ? <li>暂无趋势数据</li> : null}
        </ul>
        {data?.alerts?.length ? (
          <ul className="list warning-list">
            {data.alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        ) : null}
      </SectionCard>
    </div>
  );
}
