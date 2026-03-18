import { FormEvent, useState } from 'react';
import { ScheduleCreateData, ScheduleListData } from '../types/api';
import { SectionCard } from '../components/SectionCard';

type SchedulePageProps = {
  result: ScheduleCreateData | null;
  list: ScheduleListData | null;
  onCreate: (payload: { title: string; eventTime: string }) => Promise<void>;
  onComplete: (id: number) => Promise<void>;
};

export function SchedulePage({ result, list, onCreate, onComplete }: SchedulePageProps) {
  const [title, setTitle] = useState('儿保复查');
  const [eventTime, setEventTime] = useState(() => defaultFutureTime());

  const pendingItems = (list?.items || []).filter((item) => item.status === 'pending');
  const overdueItems = (list?.items || []).filter((item) => item.status === 'overdue');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onCreate({ title, eventTime });
  };

  return (
    <div className="page-grid">
      <SectionCard title="新增提醒">
        <form className="form" onSubmit={submit}>
          <label>标题<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>时间<input value={eventTime} onChange={(e) => setEventTime(e.target.value)} /></label>
          <button type="submit">创建提醒</button>
        </form>
      </SectionCard>
      <SectionCard title="创建结果">
        {result ? <p className="success">eventId: {result.eventId} · jobs: {result.reminderJobs}</p> : <p className="muted">等待创建</p>}
      </SectionCard>

      <SectionCard title="待处理事件">
        <ul className="list">
          {pendingItems.map((item) => (
            <li key={item.id}>
              <div className="list-row">
                <span>{item.title} · {item.eventTime}</span>
                <button onClick={() => void onComplete(item.id)}>完成</button>
              </div>
            </li>
          ))}
          {!pendingItems.length ? <li>暂无待处理事件</li> : null}
        </ul>
      </SectionCard>

      <SectionCard title="已逾期事件">
        <ul className="list">
          {overdueItems.map((item) => (
            <li key={item.id}>{item.title} · {item.eventTime}</li>
          ))}
          {!overdueItems.length ? <li>暂无逾期事件</li> : null}
        </ul>
      </SectionCard>
    </div>
  );
}

function defaultFutureTime() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}
