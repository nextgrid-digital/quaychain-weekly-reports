import Link from "next/link";
import type { Report } from "@/lib/report-schema";
import { ReportTable } from "@/components/report-table";

export function ReportPage({ report }: { report: Report }) {
  return (
    <div className="page-shell">
      <header className="report-header">
        <span className="eyebrow">QuayChain weekly intelligence</span>
        <h1 className="report-title">{report.title}</h1>
        <div className="report-meta">
          <span>Week of {report.weekOf}</span>
          <span>
            Published{" "}
            {new Date(report.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      <section className="report-section">
        <div className="report-section-header">
          <span className="sec-label">Snapshot</span>
          <h2>Executive summary</h2>
        </div>
        <ul>
          {report.executiveSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Section
        label="Markets"
        title="Market signals"
        section={report.marketSignals}
      />
      <Section
        label="Capital"
        title="Capital flow tracker"
        section={report.capitalFlow}
      />
      <Section
        label="Technology"
        title="Technology deployment signals"
        section={report.technologyDeployments}
      />
      <Section
        label="Risk"
        title="Risk and disruption monitor"
        section={report.risks}
      />
      <Section
        label="Narrative"
        title="Investor narrative watch"
        section={report.narratives}
      />
      <Section
        label="Engagement"
        title="Where Andrew should engage"
        section={report.engagementTopics}
      />
      <Section label="Communities" title="Communities" section={report.communities} />
      <Section
        label="Outreach"
        title="Outreach targets"
        section={report.outreachTargets}
      />

      <section className="report-section">
        <div className="report-section-header">
          <span className="sec-label">Distribution</span>
          <h2>Distribution assets</h2>
        </div>
        <div className="two-column">
          <div className="summary-card">
            <div className="kicker">Andrew LinkedIn post</div>
            <strong>{report.andrewLinkedInPost.title}</strong>
            <p className="summary-copy" style={{ marginTop: 10 }}>
              {report.andrewLinkedInPost.body}
            </p>
          </div>
          <div className="summary-card">
            <div className="kicker">QuayChain company post</div>
            <strong>{report.quaychainPost.title}</strong>
            <p className="summary-copy" style={{ marginTop: 10 }}>
              {report.quaychainPost.body}
            </p>
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-header">
          <span className="sec-label">Newsletter</span>
          <h2>Newsletter idea</h2>
        </div>
        <p style={{ marginBottom: 8 }}>
          <strong>{report.newsletterIdea.title}</strong>
        </p>
        <p>{report.newsletterIdea.description}</p>
        <p className="muted" style={{ marginBottom: 0 }}>
          {report.newsletterIdea.whyInvestorsShouldRead}
        </p>
      </section>

      <section className="report-section">
        <div className="report-section-header">
          <span className="sec-label">Operations</span>
          <h2>Weekly execution checklist</h2>
        </div>
        <div className="two-column">
          {report.executionChecklist.map((item) => (
            <div className="summary-card" key={item.day}>
              <div className="kicker">{item.day}</div>
              <ul style={{ marginTop: 8 }}>
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-header">
          <span className="sec-label">Sources</span>
          <h2>Source list</h2>
        </div>
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

      <section className="report-section" style={{ background: "var(--gray-50)" }}>
        <p className="muted" style={{ margin: 0 }}>
          Looking for prior reports? Browse the <Link href="/archive">archive</Link>.
        </p>
      </section>
    </div>
  );
}

function Section({
  label,
  title,
  section,
}: {
  label: string;
  title: string;
  section: Report["marketSignals"];
}) {
  return (
    <section className="report-section">
      <div className="report-section-header">
        <span className="sec-label">{label}</span>
        <h2>{title}</h2>
      </div>
      <p>{section.summary}</p>
      <ReportTable section={section} />
    </section>
  );
}
