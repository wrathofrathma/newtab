import { execSync, execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const targetArg = process.argv[2] ?? "all";
const validTargets = new Set(["all", "chrome", "firefox"]);

if (!validTargets.has(targetArg)) {
  console.error(
    `Invalid target '${targetArg}'. Use one of: all, chrome, firefox.`,
  );
  process.exit(1);
}

const targets = targetArg === "all" ? ["chrome", "firefox"] : [targetArg];

const distDir = path.join(rootDir, "dist");
const extensionDir = path.join(rootDir, "dist-extension");
const artifactsDir = path.join(rootDir, "artifacts");
const baseManifestPath = path.join(rootDir, "public", "manifest.json");

function ensureZipAvailable() {
  try {
    execSync("zip -v", { stdio: "ignore" });
  } catch {
    console.error("The 'zip' command is required but was not found on PATH.");
    process.exit(1);
  }
}

function createManifest(target, baseManifest) {
  if (target === "firefox") {
    return {
      ...baseManifest,
      browser_specific_settings: {
        gecko: {
          id: "newtab@kyso.dev",
          strict_min_version: "109.0",
          data_collection_permissions: {
            required: ["none"],
          },
        },
      },
    };
  }

  const manifest = { ...baseManifest };
  delete manifest.browser_specific_settings;
  return manifest;
}

function buildSite() {
  execSync("pnpm build", {
    cwd: rootDir,
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_APP_TARGET: "extension",
    },
  });

  if (!existsSync(distDir)) {
    console.error("Build output not found at dist/.");
    process.exit(1);
  }
}

function bundleTarget(target, baseManifest) {
  const targetDir = path.join(extensionDir, target);
  const zipPath = path.join(artifactsDir, `newtab-${target}.zip`);

  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  cpSync(distDir, targetDir, { recursive: true });

  const manifest = createManifest(target, baseManifest);
  writeFileSync(
    path.join(targetDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  rmSync(zipPath, { force: true });
  execFileSync("zip", ["-qr", zipPath, "."], {
    cwd: targetDir,
    stdio: "inherit",
  });

  console.log(`Built ${target} extension:`);
  console.log(`  unpacked: ${path.relative(rootDir, targetDir)}`);
  console.log(`  zip: ${path.relative(rootDir, zipPath)}`);
}

function main() {
  ensureZipAvailable();
  buildSite();

  mkdirSync(extensionDir, { recursive: true });
  mkdirSync(artifactsDir, { recursive: true });

  const baseManifest = JSON.parse(readFileSync(baseManifestPath, "utf8"));

  for (const target of targets) {
    bundleTarget(target, baseManifest);
  }
}

main();
