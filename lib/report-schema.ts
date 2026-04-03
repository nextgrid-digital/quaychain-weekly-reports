import { z } from "zod";

export const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const tableRowSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), linkSchema, z.array(z.string())]),
);

export const reportSectionSchema = z.object({
  summary: z.string().min(1),
  columns: z.array(z.string().min(1)).min(1),
  rows: z.array(tableRowSchema),
});

export const contentAssetSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const newsletterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  whyInvestorsShouldRead: z.string().min(1),
});

export const reportSchema = z.object({
  slug: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  weekOf: z.string().min(1),
  publishedAt: z.string().datetime(),
  executiveSummary: z.array(z.string().min(1)).min(3),
  marketSignals: reportSectionSchema,
  capitalFlow: reportSectionSchema,
  technologyDeployments: reportSectionSchema,
  risks: reportSectionSchema,
  narratives: reportSectionSchema,
  andrewLinkedInPost: contentAssetSchema,
  quaychainPost: contentAssetSchema,
  engagementTopics: reportSectionSchema,
  communities: reportSectionSchema,
  outreachTargets: reportSectionSchema,
  newsletterIdea: newsletterSchema,
  executionChecklist: z.array(
    z.object({
      day: z.string().min(1),
      actions: z.array(z.string().min(1)).min(1),
    }),
  ),
  sources: z.array(linkSchema).min(1),
});

export type Report = z.infer<typeof reportSchema>;
