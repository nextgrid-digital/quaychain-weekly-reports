import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function run(command, args, cwd, options = {}) {
  return execFileSync(command, args, {
    cwd,
    stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit",
    encoding: options.capture ? "utf8" : undefined,
  });
}

function parseArgs(argv) {
  const args = {
    sourcePath: "",
    commitMessage: "",
    skipBuild: false,
    skipPush: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];

    if (!args.sourcePath && !value.startsWith("--")) {
      args.sourcePath = value;
      continue;
    }

    if (value === "--skip-build") {
      args.skipBuild = true;
      continue;
    }

    if (value === "--skip-push") {
      args.skipPush = true;
      continue;
    }

    if (value === "--commit-message") {
      args.commitMessage = argv[i + 1] ?? "";
      i += 1;
      continue;
    }

    throw new Error("Unknown argument: " + value);
  }

  if (!args.sourcePath) {
    throw new Error(
      'Usage: node scripts/publish-weekly-report.mjs <path-to-report.json> [--commit-message "..."] [--skip-build] [--skip-push]',
    );
  }

  return args;
}

function ensureCleanGitState(repoRoot) {
  const status = run("git", ["status", "--porcelain"], repoRoot, { capture: true }).trim();
  if (status) {
    throw new Error(
      "Refusing to publish from a dirty working tree. Commit, stash, or discard local changes first.",
    );
  }
}

const repoRoot = process.cwd();
const { sourcePath, commitMessage, skipBuild, skipPush } = parseArgs(process.argv.slice(2));

ensureCleanGitState(repoRoot);

const absoluteSourcePath = path.resolve(repoRoot, sourcePath);
const source = JSON.parse(fs.readFileSync(absoluteSourcePath, "utf8"));
const slug = source.slug;

if (typeof slug !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(slug)) {
  throw new Error("Report JSON must contain a valid ISO-date slug.");
}

const reportPath = path.join("content", "reports", slug + ".json");
const message = commitMessage || "Add weekly report for " + slug;

run("node", ["scripts/publish-report.mjs", absoluteSourcePath], repoRoot);
run("node", ["scripts/validate-reports.mjs"], repoRoot);

if (!skipBuild) {
  run("npm", ["run", "build"], repoRoot);
}

run("git", ["add", reportPath], repoRoot);
run("git", ["commit", "-m", message], repoRoot);

if (!skipPush) {
  run("git", ["push", "origin", "main"], repoRoot);
}

console.log("Published weekly report " + slug + ".");
