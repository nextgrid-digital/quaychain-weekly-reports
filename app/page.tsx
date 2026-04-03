import Link from "next/link";
import { getAllReports, getLatestReport } from "@/lib/reports";

export default function HomePage() {
  const latest = getLatestReport();
  const archive = getAllReports().slice(1, 5);

  return (
    <div className="page-shell">
      <div className="sec-label">Latest issue</div>
      <section className="hero-outer" aria-label="Featured report">
        <div className="hero-band" aria-hidden />
        <div className="hero-inner">
          <div className="hero-main">
            <span className="eyebrow">Weekly intelligence</span>
            <h1>{latest.title}</h1>
            <p className="lede">
              Weekly intelligence for infrastructure investors focused on ports,
              terminals, private 5G, AI in logistics, and freight-network risk.
            </p>
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>
              Week of {latest.weekOf}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={"/reports/" + latest.slug}>
                Read full report
              </Link>
              <Link className="btn btn-ghost" href="/archive">
                Browse archive
              </Link>
            </div>
          </div>
          <div className="hero-side">
            <div className="metric-card">
              <span className="kicker">Publishing model</span>
              <strong>Content-driven</strong>
              <span className="muted">
                Each weekly run adds one immutable report file to the repo.
              </span>
            </div>
            <div className="metric-card">
              <span className="kicker">Archive</span>
              <strong>{getAllReports().length} reports</strong>
              <span className="muted">
                Rendered automatically from JSON in <code>content/reports/</code>.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid" aria-label="Overview and summary">
        <div className="stack">
          <div className="card">
            <span className="sec-label" style={{ marginBottom: 12 }}>
              About this site
            </span>
            <h2>Why this site exists</h2>
            <p>
              The site is built for autonomous weekly publishing. Automation can
              generate a report file, commit it to GitHub, and deploy the latest
              issue without hand-tuning the layout.
            </p>
          </div>

          <div className="card">
            <span className="sec-label" style={{ marginBottom: 12 }}>
              Recent issues
            </span>
            <h2>Archive preview</h2>
            <div className="archive-list">
              {archive.map((report) => (
                <Link
                  className="archive-item summary-card"
                  key={report.slug}
                  href={"/reports/" + report.slug}
                >
                  <div className="kicker">Week of {report.weekOf}</div>
                  <strong>{report.title}</strong>
                  <span className="muted">{report.executiveSummary[0]}</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 16, marginBottom: 0 }}>
              <Link href="/archive">View full archive →</Link>
            </p>
          </div>
        </div>

        <div className="stack">
          <div
            className="card"
            style={{
              background: "var(--dots) 0 0 / 18px 18px, var(--gray-50)",
            }}
          >
            <span className="sec-label" style={{ marginBottom: 12 }}>
              This week
            </span>
            <h2>Executive summary</h2>
            <ul>
              {latest.executiveSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
