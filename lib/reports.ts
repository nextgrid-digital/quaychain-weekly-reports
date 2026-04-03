import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { notFound } from "next/navigation";
import { reportSchema, type Report } from "@/lib/report-schema";

const reportsDir = path.join(process.cwd(), "content", "reports");

function readReportFile(filePath: string): Report {
  const content = fs.readFileSync(filePath, "utf8");
  return reportSchema.parse(JSON.parse(content));
}

export const getAllReports = cache((): Report[] => {
  if (!fs.existsSync(reportsDir)) {
    return [];
  }

  return fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readReportFile(path.join(reportsDir, file)))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export function getLatestReport(): Report {
  const reports = getAllReports();
  if (reports.length === 0) {
    notFound();
  }
  return reports[0];
}

export function getReportBySlug(slug: string): Report {
  const report = getAllReports().find((item) => item.slug === slug);
  if (!report) {
    notFound();
  }
  return report;
}
