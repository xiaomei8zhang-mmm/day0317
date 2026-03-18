import { useEffect, useState } from 'react';
import { PageTabs } from './components/PageTabs';
import { api } from './api/services';
import {
  DashboardData,
  FeedingData,
  ExpenseCreateData,
  ExpenseCreatePayload,
  ExpenseSummaryData,
  HealthCreateData,
  HealthSummaryData,
  OutfitData,
  PlaceRecommendData,
  ScheduleCreateData,
  SchoolRecommendData,
  ScheduleListData,
  VoiceExecuteData,
  VoiceParseData,
} from './types/api';
import { HomePage } from './pages/HomePage';
import { ExpensePage } from './pages/ExpensePage';
import { SchedulePage } from './pages/SchedulePage';
import { VoicePage } from './pages/VoicePage';
import { FoodPage, HealthPage, RecommendPage } from './pages/StaticPages';

export default function App() {
  const [tab, setTab] = useState('首页');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [feeding, setFeeding] = useState<FeedingData | null>(null);
  const [outfit, setOutfit] = useState<OutfitData | null>(null);
  const [summary, setSummary] = useState<ExpenseSummaryData | null>(null);
  const [expenseResult, setExpenseResult] = useState<ExpenseCreateData | null>(null);
  const [healthCreateResult, setHealthCreateResult] = useState<HealthCreateData | null>(null);
  const [places, setPlaces] = useState<PlaceRecommendData | null>(null);
  const [schools, setSchools] = useState<SchoolRecommendData | null>(null);
  const [health, setHealth] = useState<HealthSummaryData | null>(null);
  const [scheduleResult, setScheduleResult] = useState<ScheduleCreateData | null>(null);
  const [scheduleList, setScheduleList] = useState<ScheduleListData | null>(null);
  const [parseResult, setParseResult] = useState<VoiceParseData | null>(null);
  const [executeResult, setExecuteResult] = useState<VoiceExecuteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHome = async () => {
    try {
      setLoading(true);
      setError('');
      const results = await Promise.allSettled([
        api.getDashboard(),
        api.getFeeding(),
        api.getOutfit(),
        api.getExpenseSummary('month'),
        api.getNearbyPlaces('beijing', 'sunny', 45),
        api.getNearbySchools('beijing', 'kindergarten_3_6', '2000-5000'),
        api.getHealthSummary(101),
        api.getScheduleList(),
      ]);

      if (results[0].status === 'fulfilled') setDashboard(results[0].value);
      if (results[1].status === 'fulfilled') setFeeding(results[1].value);
      if (results[2].status === 'fulfilled') setOutfit(results[2].value);
      if (results[3].status === 'fulfilled') setSummary(results[3].value);
      if (results[4].status === 'fulfilled') setPlaces(results[4].value);
      if (results[5].status === 'fulfilled') setSchools(results[5].value);
      if (results[6].status === 'fulfilled') setHealth(results[6].value);
      if (results[7].status === 'fulfilled') setScheduleList(results[7].value);

      const failed = results.filter((item) => item.status === 'rejected');
      if (failed.length) {
        setError(`部分数据加载失败（${failed.length}项），已展示可用内容`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadHome();
  }, []);

  const createExpense = async (payload: { amount: number; category: string; note?: string }) => {
    const category = payload.category as ExpenseCreatePayload['category'];
    const result = await api.createExpense({
      childId: 101,
      amount: payload.amount,
      category,
      paidAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      note: payload.note,
    });
    setExpenseResult(result);
    setSummary(await api.getExpenseSummary('month'));
  };

  const createSchedule = async (payload: { title: string; eventTime: string }) => {
    const result = await api.createSchedule({
      childId: 101,
      eventType: 'checkup',
      title: payload.title,
      eventTime: payload.eventTime,
      location: '朝阳妇幼保健院',
      note: '携带疫苗本',
      remindOffsets: [10080, 4320, 1440, 0],
    });
    setScheduleResult(result);
    setScheduleList(await api.getScheduleList());
  };

  const completeSchedule = async (id: number) => {
    await api.updateScheduleStatus(id, 'completed');
    setScheduleList(await api.getScheduleList());
  };

  const addHealthRecord = async () => {
    const res = await api.createHealthRecord({
      childId: 101,
      recordTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      weightKg: 13.6,
      heightCm: 90.4,
      sleepHours: 10.2,
      temperatureC: 37,
      note: '前端录入',
    });
    setHealthCreateResult(res);
    setHealth(await api.getHealthSummary(101));
  };

  const runVoice = async (text: string) => {
    const parsed = await api.voiceParse({ sessionId: 'voice_abc_001', text });
    setParseResult(parsed);
    const executed = await api.voiceExecute({
      sessionId: 'voice_abc_001',
      intent: parsed.intent,
      slots: parsed.slots,
    });
    setExecuteResult(executed);
  };

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>养娃管家</h1>
          <p>简洁版 · 可联调前后端</p>
        </div>
      </header>

      <PageTabs current={tab} onChange={setTab} />

      {tab === '首页' ? <HomePage data={dashboard} loading={loading} error={error} onRefresh={() => void loadHome()} /> : null}
      {tab === '吃法' ? <FoodPage feeding={feeding} outfit={outfit} /> : null}
      {tab === '推荐' ? <RecommendPage places={places} schools={schools} onRefresh={() => void loadHome()} /> : null}
      {tab === '健康' ? <HealthPage data={health} onRefresh={() => void loadHome()} onCreateRecord={addHealthRecord} createResult={healthCreateResult} /> : null}
      {tab === '花销' ? <ExpensePage summary={summary} createResult={expenseResult} onCreate={createExpense} onRefresh={() => api.getExpenseSummary('month').then(setSummary)} /> : null}
      {tab === '日程' ? <SchedulePage result={scheduleResult} list={scheduleList} onCreate={createSchedule} onComplete={completeSchedule} /> : null}
      {tab === '语音' ? <VoicePage parseResult={parseResult} executeResult={executeResult} onRun={runVoice} /> : null}
    </main>
  );
}
