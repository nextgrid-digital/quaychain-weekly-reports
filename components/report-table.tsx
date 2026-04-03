import type { ReactNode } from "react";
import type { Report } from "@/lib/report-schema";

type Section = Report["marketSignals"];

function renderCell(value: Section["rows"][number][string]): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return (
      <div className="pill-list">
        {value.map((item) => (
          <span className="pill" key={item}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <a href={value.url} target="_blank" rel="noreferrer">
      {value.label}
    </a>
  );
}

export function ReportTable({ section }: { section: Section }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {section.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr key={index}>
              {section.columns.map((column) => (
                <td key={column}>{renderCell(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
