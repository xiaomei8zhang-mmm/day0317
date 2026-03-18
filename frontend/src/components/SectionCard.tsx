import { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  children: ReactNode;
  right?: ReactNode;
};

export function SectionCard({ title, children, right }: SectionCardProps) {
  return (
    <section className="card">
      <header className="card-header">
        <h3>{title}</h3>
        {right}
      </header>
      {children}
    </section>
  );
}
