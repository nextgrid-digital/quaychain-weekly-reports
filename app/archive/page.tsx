import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export const metadata = {
  title: "Report Archive | QuayChain Weekly Intelligence",
};

export default function ArchivePage() {
  const reports = getAllReports();

  return (
    <div className="page-shell">
      <div className="sec-label">All issues</div>
      <section className="card" style={{ marginBottom: 20 }}>
        <span className="eyebrow">Archive</span>
        <h1 className="report-title">Weekly report archive</h1>
        <p className="summary-copy" style={{ marginBottom: 0 }}>
          Every report is stored as an immutable content file and published to a
          permanent URL.
        </p>
      </section>

      <section className="section-block archive-list" aria-label="Report list">
        {reports.map((report) => (
          <Link
            className="archive-item"
            href={"/reports/" + report.slug}
            key={report.slug}
          >
            <div className="kicker">Week of {report.weekOf}</div>
            <strong>{report.title}</strong>
            <span className="muted">{report.executiveSummary[0]}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
