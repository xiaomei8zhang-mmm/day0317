import { FormEvent, useState } from 'react';
import { ExpenseCreateData, ExpenseSummaryData } from '../types/api';
import { SectionCard } from '../components/SectionCard';

type ExpensePageProps = {
  summary: ExpenseSummaryData | null;
  createResult: ExpenseCreateData | null;
  onCreate: (payload: { amount: number; category: string; note?: string }) => Promise<void>;
  onRefresh: () => Promise<void>;
};

export function ExpensePage({ summary, createResult, onCreate, onRefresh }: ExpensePageProps) {
  const [amount, setAmount] = useState('89');
  const [category, setCategory] = useState('diaper');
  const [note, setNote] = useState('尿不湿L码');
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const amountValue = Number(amount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setSubmitError('金额必须大于 0');
      return;
    }

    try {
      setBusy(true);
      setSubmitError('');
      await onCreate({ amount: amountValue, category, note });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '提交失败，请稍后重试');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-grid">
      <SectionCard title="本月报表" right={<button onClick={() => void onRefresh()}>刷新</button>}>
        <p className="amount">¥ {summary?.total ?? '--'}</p>
        <p className="muted">预算 ¥ {summary?.budget ?? '--'} · 使用率 {((summary?.usageRate ?? 0) * 100).toFixed(0)}%</p>
        <div className="progress">
          <span style={{ width: `${Math.min(100, Math.round((summary?.usageRate ?? 0) * 100))}%` }} />
        </div>
        <ul className="list">
          {(summary?.categories || []).map((item) => (
            <li key={item.category}>{item.category}：{(item.ratio * 100).toFixed(0)}%</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="快速记账">
        <form className="form" onSubmit={submit}>
          <label>金额<input value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>分类
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="diaper">尿不湿</option>
              <option value="food">奶粉辅食</option>
              <option value="medical">医疗健康</option>
              <option value="education">教育</option>
              <option value="clothing">衣物</option>
              <option value="other">其他</option>
            </select>
          </label>
          <label>备注<input value={note} onChange={(e) => setNote(e.target.value)} /></label>
          <button type="submit" disabled={busy}>{busy ? '提交中...' : '提交'}</button>
        </form>
        {submitError ? <p className="error">{submitError}</p> : null}
        {createResult ? <p className="success">记账成功，最新累计 ¥ {createResult.monthTotal}</p> : null}
      </SectionCard>
    </div>
  );
}
