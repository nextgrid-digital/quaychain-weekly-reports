import type { Metadata } from "next";
import { ReportPage } from "@/components/report-page";
import { getAllReports, getReportBySlug } from "@/lib/reports";

export function generateStaticParams() {
  return getAllReports().map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  return {
    title: report.title + " | QuayChain Weekly Intelligence",
    description: report.executiveSummary[0],
  };
}

export default async function ReportRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  return <ReportPage report={report} />;
}
