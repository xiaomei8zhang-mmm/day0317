import { FormEvent, useState } from 'react';
import { VoiceExecuteData, VoiceParseData } from '../types/api';
import { SectionCard } from '../components/SectionCard';

type VoicePageProps = {
  parseResult: VoiceParseData | null;
  executeResult: VoiceExecuteData | null;
  onRun: (text: string) => Promise<void>;
};

export function VoicePage({ parseResult, executeResult, onRun }: VoicePageProps) {
  const [text, setText] = useState('这个月到目前花了多少钱');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onRun(text);
  };

  return (
    <div className="page-grid">
      <SectionCard title="语音指令">
        <form className="form" onSubmit={submit}>
          <label>文本模拟<input value={text} onChange={(e) => setText(e.target.value)} /></label>
          <button type="submit">解析并执行</button>
        </form>
        <p className="muted">示例：这个月到目前花了多少钱 / 记一笔尿不湿89元 / 提醒我明天10点儿保复查</p>
      </SectionCard>
      <SectionCard title="解析结果">
        {parseResult ? (
          <ul className="list">
            <li>intent: {parseResult.intent}</li>
            <li>confidence: {parseResult.confidence}</li>
            <li>needConfirm: {String(parseResult.needConfirm)}</li>
          </ul>
        ) : <p className="muted">等待解析</p>}
      </SectionCard>
      <SectionCard title="执行结果">
        {executeResult ? (
          <ul className="list">
            <li>{executeResult.text}</li>
            <li>action: {executeResult.action.type} / {executeResult.action.target}</li>
          </ul>
        ) : <p className="muted">等待执行</p>}
      </SectionCard>
    </div>
  );
}
