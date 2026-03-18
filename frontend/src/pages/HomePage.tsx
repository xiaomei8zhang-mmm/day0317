import { DashboardData } from '../types/api';
import { SectionCard } from '../components/SectionCard';

type HomePageProps = {
  data: DashboardData | null;
  loading: boolean;
  error: string;
  onRefresh: () => void;
};

export function HomePage({ data, loading, error, onRefresh }: HomePageProps) {
  return (
    <div className="page-grid">
      <div className="hero card hero-card">
        <div>
          <p className="muted">{data?.weather.city || '北京'} · {data?.weather.condition || '-'}</p>
          <h2>{data ? `${data.weather.temp}°C` : '--'}</h2>
          <p className="muted">体感 {data?.weather.feelLike ?? '--'}°C</p>
          <p className="muted">来源：{data?.weather.source || 'fallback'}</p>
        </div>
        <div className="hero-right">
          <p>今日穿搭品牌</p>
          <h3>{data?.outfit.brand || '--'}</h3>
          <p className="muted">{data?.outfit.suggestion || '-'}</p>
        </div>
      </div>

      <SectionCard title="今日吃法" right={<button onClick={onRefresh}>刷新</button>}>
        {loading ? <p className="muted">加载中...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        <ul className="list">
          <li>早餐：{data?.food.breakfast || '-'}</li>
          <li>午餐：{data?.food.lunch || '-'}</li>
          <li>晚餐：{data?.food.dinner || '-'}</li>
        </ul>
      </SectionCard>

      <SectionCard title="近期提醒">
        <ul className="list">
          {(data?.upcomingEvents || []).map((item) => (
            <li key={item.id}>{item.title} · {item.eventTime} · {item.daysLeft}天后</li>
          ))}
          {data?.upcomingEvents?.length ? null : <li>暂无提醒</li>}
        </ul>
      </SectionCard>

      <SectionCard title="本月花销">
        <p className="amount">¥ {data?.expenseSummary.monthTotal ?? '--'}</p>
        <p className="muted">预算：¥ {data?.expenseSummary.budget ?? '--'}</p>
        <div className="progress">
          <span style={{ width: `${Math.min(100, Math.round((data?.expenseSummary.usageRate || 0) * 100))}%` }} />
        </div>
      </SectionCard>

      <SectionCard title="附近推荐速览">
        <ul className="list">
          {(data?.nearbyTop || []).map((item) => (
            <li key={item.id}>
              {item.name} · {item.distanceKm}km · {item.indoor ? '室内' : '户外'}
            </li>
          ))}
          {!data?.nearbyTop?.length ? <li>暂无推荐</li> : null}
        </ul>
      </SectionCard>
    </div>
  );
}
