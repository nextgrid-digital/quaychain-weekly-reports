import Link from "next/link";
import { getAllReports, getLatestReport } from "@/lib/reports";

export default function HomePage() {
  const latest = getLatestReport();
  const archive = getAllReports().slice(1, 5);

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Latest Report</span>
            <h1>{latest.title}</h1>
            <p>
              Weekly intelligence for infrastructure investors focused on ports,
              terminals, private 5G, AI in logistics, and freight-network risk.
            </p>
            <p className="muted">Week of {latest.weekOf}</p>
            <p>
              <Link href={"/reports/" + latest.slug}>Read the full report</Link>
            </p>
          </div>
          <div className="hero-meta">
            <div className="metric-card">
              <span className="kicker">Publishing model</span>
              <strong>Content-driven</strong>
              <span className="muted">Each weekly run adds one immutable report file.</span>
            </div>
            <div className="metric-card">
              <span className="kicker">Archive</span>
              <strong>{getAllReports().length} reports</strong>
              <span className="muted">Rendered automatically from content files in the repo.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="stack">
          <div className="card">
            <h2>Why this site exists</h2>
            <p>
              The site is designed for autonomous weekly publishing. The automation
              generates a report file, commits it to GitHub, and Vercel deploys the
              latest report automatically.
            </p>
          </div>

          <div className="card">
            <h2>Archive Preview</h2>
            <div className="archive-list">
              {archive.map((report) => (
                <Link className="archive-item summary-card" key={report.slug} href={"/reports/" + report.slug}>
                  <div className="kicker">Week of {report.weekOf}</div>
                  <strong>{report.title}</strong>
                  <span className="muted">{report.executiveSummary[0]}</span>
                </Link>
              ))}
            </div>
            <p>
              <Link href="/archive">View full archive</Link>
            </p>
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <h2>Latest Executive Summary</h2>
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
