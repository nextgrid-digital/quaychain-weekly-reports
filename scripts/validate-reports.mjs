import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

const tableRowSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), linkSchema, z.array(z.string())]),
);

const sectionSchema = z.object({
  summary: z.string().min(1),
  columns: z.array(z.string().min(1)).min(1),
  rows: z.array(tableRowSchema),
});

const reportSchema = z.object({
  slug: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  weekOf: z.string().min(1),
  publishedAt: z.string().datetime(),
  executiveSummary: z.array(z.string().min(1)).min(3),
  marketSignals: sectionSchema,
  capitalFlow: sectionSchema,
  technologyDeployments: sectionSchema,
  risks: sectionSchema,
  narratives: sectionSchema,
  andrewLinkedInPost: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  }),
  quaychainPost: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  }),
  engagementTopics: sectionSchema,
  communities: sectionSchema,
  outreachTargets: sectionSchema,
  newsletterIdea: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    whyInvestorsShouldRead: z.string().min(1),
  }),
  executionChecklist: z.array(
    z.object({
      day: z.string().min(1),
      actions: z.array(z.string().min(1)).min(1),
    }),
  ),
  sources: z.array(linkSchema).min(1),
});

const reportsDir = path.join(process.cwd(), "content", "reports");
const seen = new Set();

for (const file of fs.readdirSync(reportsDir)) {
  if (!file.endsWith('.json')) continue;
  const fullPath = path.join(reportsDir, file);
  const report = reportSchema.parse(JSON.parse(fs.readFileSync(fullPath, 'utf8')));
  if (seen.has(report.slug)) throw new Error(`Duplicate slug detected: ${report.slug}`);
  seen.add(report.slug);
}

console.log(`Validated ${seen.size} reports.`);
