const LEFT_TABS = ['首页', '吃法', '推荐'];
const RIGHT_TABS = ['日程', '健康', '花销'];

type PageTabsProps = {
  current: string;
  onChange: (tab: string) => void;
};

export function PageTabs({ current, onChange }: PageTabsProps) {
  return (
    <nav className="bottom-nav" aria-label="页面导航">
      <div className="nav-group">
        {LEFT_TABS.map((tab) => (
          <button
            key={tab}
            className={tab === current ? 'nav-tab active' : 'nav-tab'}
            onClick={() => onChange(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        className={current === '语音' ? 'voice-fab active' : 'voice-fab'}
        onClick={() => onChange('语音')}
        type="button"
        aria-label="语音功能"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 15a3.5 3.5 0 0 0 3.5-3.5V7a3.5 3.5 0 1 0-7 0v4.5A3.5 3.5 0 0 0 12 15Zm6-3.5a1 1 0 1 0-2 0 4 4 0 0 1-8 0 1 1 0 1 0-2 0 6 6 0 0 0 5 5.91V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.59A6 6 0 0 0 18 11.5Z" />
        </svg>
      </button>

      <div className="nav-group">
        {RIGHT_TABS.map((tab) => (
          <button
            key={tab}
            className={tab === current ? 'nav-tab active' : 'nav-tab'}
            onClick={() => onChange(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
