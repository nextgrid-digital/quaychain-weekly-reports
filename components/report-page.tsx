import Link from "next/link";
import type { Report } from "@/lib/report-schema";
import { ReportTable } from "@/components/report-table";

export function ReportPage({ report }: { report: Report }) {
  return (
    <div className="page-shell">
      <header className="report-header">
        <span className="eyebrow">QuayChain Weekly Intelligence</span>
        <h1 className="report-title">{report.title}</h1>
        <div className="report-meta muted">
          <span>Week of {report.weekOf}</span>
          <span>Published {new Date(report.publishedAt).toLocaleDateString()}</span>
        </div>
      </header>

      <section className="report-section">
        <h2>Executive Summary</h2>
        <ul>
          {report.executiveSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Section title="Market Signals" section={report.marketSignals} />
      <Section title="Capital Flow Tracker" section={report.capitalFlow} />
      <Section title="Technology Deployment Signals" section={report.technologyDeployments} />
      <Section title="Risk and Disruption Monitor" section={report.risks} />
      <Section title="Investor Narrative Watch" section={report.narratives} />
      <Section title="Where Andrew Should Engage" section={report.engagementTopics} />
      <Section title="Communities" section={report.communities} />
      <Section title="Outreach Targets" section={report.outreachTargets} />

      <section className="report-section">
        <h2>Distribution Assets</h2>
        <div className="two-column">
          <div className="summary-card">
            <div className="kicker">Andrew LinkedIn Post</div>
            <strong>{report.andrewLinkedInPost.title}</strong>
            <p className="summary-copy">{report.andrewLinkedInPost.body}</p>
          </div>
          <div className="summary-card">
            <div className="kicker">QuayChain Company Post</div>
            <strong>{report.quaychainPost.title}</strong>
            <p className="summary-copy">{report.quaychainPost.body}</p>
          </div>
        </div>
      </section>

      <section className="report-section">
        <h2>Newsletter Idea</h2>
        <p>
          <strong>{report.newsletterIdea.title}</strong>
        </p>
        <p>{report.newsletterIdea.description}</p>
        <p className="muted">{report.newsletterIdea.whyInvestorsShouldRead}</p>
      </section>

      <section className="report-section">
        <h2>Weekly Execution Checklist</h2>
        <div className="two-column">
          {report.executionChecklist.map((item) => (
            <div className="summary-card" key={item.day}>
              <div className="kicker">{item.day}</div>
              <ul>
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="report-section">
        <h2>Source List</h2>
        <ul>
          {report.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="report-section">
        <p className="muted">
          Looking for prior reports? Browse the <Link href="/archive">archive</Link>.
        </p>
      </section>
    </div>
  );
}

function Section({
  title,
  section,
}: {
  title: string;
  section: Report["marketSignals"];
}) {
  return (
    <section className="report-section">
      <h2>{title}</h2>
      <p>{section.summary}</p>
      <ReportTable section={section} />
    </section>
  );
}
