// @ts-nocheck: `@vercel/agent-eval/eval` is a vitest alias the fixture's tsc cannot resolve.
/**
 * setup-from-scratch — The project has React and Vite but no Gravity UI. Add @gravity-ui/uikit, import
 * '@gravity-ui/uikit/styles/fonts.css' and '@gravity-ui/uikit/styles/styles.css' once at the entry point
 * BEFORE the app's own CSS, wrap the app in uikit's ThemeProvider (or Provider) with a theme, and build the
 * login form from uikit: TextInput (or PasswordInput) for email and password, Checkbox, Button.
 * Binary eval: the answer passes iff the project builds AND every test below passes.
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { test, expect } from 'vitest';
import { environment } from '@vercel/agent-eval/eval';

// The agent's answer may span several files; these checks look across all source + package.json deps.
function allSource(): string {
  const chunks: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?|css|scss)$/.test(entry.name)) chunks.push(readFileSync(p, 'utf-8'));
    }
  };
  walk('src');
  walk('app');
  return chunks.join('\n\n');
}
function mergedDeps(): Record<string, string> {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    return {};
  }
}
function importsPackage(source: string, name: string): boolean {
  const e = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (
    new RegExp(`from\\s*['"]${e}(['"/])`).test(source) ||
    new RegExp(`import\\s*['"]${e}['"]`).test(source) ||
    name in mergedDeps()
  );
}
function dependsOn(source: string, name: string): boolean {
  const e = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const deps = mergedDeps();
  const declared = Object.keys(deps).some((k) => k === name || k.startsWith(name + '/'));
  return declared || new RegExp(`['"]${e}(['"/])`).test(source);
}

const src = allSource();

test("adds @gravity-ui/uikit as a dependency", () => {
  expect(dependsOn(src, "@gravity-ui/uikit")).toBe(true);
  expect(Object.keys(mergedDeps())).toContain("@gravity-ui/uikit");
});

// Named imports from @gravity-ui/uikit across the sources.
const uikitNames = new Set(
  [...src.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]@gravity-ui\/uikit['"]/g)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0]).filter(Boolean),
  ),
);
const uikitImport = (name: string) => uikitNames.has(name);

// Without both stylesheets every uikit component renders unstyled and in the system font.
test("imports @gravity-ui/uikit styles.css", () => {
  expect(src).toMatch(/['"]@gravity-ui\/uikit\/styles\/styles\.css['"]/);
});
test("imports @gravity-ui/uikit fonts.css", () => {
  expect(src).toMatch(/['"]@gravity-ui\/uikit\/styles\/fonts\.css['"]/);
});

// The app's own stylesheet must come after uikit's in the file that imports both, or the cascade lets
// uikit override it (the skill's "custom ALWAYS after styles.css" rule).
test("app CSS is imported after the uikit styles", () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?)$/.test(e.name)) files.push(readFileSync(p, 'utf-8'));
    }
  };
  walk('src');
  const entry = files.find((t) => /@gravity-ui\/uikit\/styles\/styles\.css/.test(t));
  expect(entry, 'no file imports styles.css').toBeTruthy();
  const uikitAt = entry!.search(/@gravity-ui\/uikit\/styles\/styles\.css/);
  const localCss = [...entry!.matchAll(/import\s+['"]\.{1,2}\/[^'"]+\.css['"]/g)].map((m) => m.index!);
  expect(localCss.every((i) => i > uikitAt)).toBe(true);
});

// The theme comes from a uikit provider around the app (ThemeProvider, or the all-in-one Provider of newer uikit).
test("wraps the app in a uikit theme provider", () => {
  expect(uikitImport('ThemeProvider') || uikitImport('Provider')).toBe(true);
  expect(src).toMatch(/<(ThemeProvider|Provider)\b[^>]*>/);
});

test("no foreign UI library", () => {
  for (const lib of ['@mui/material', 'antd', '@chakra-ui/react', '@mantine/core', 'react-bootstrap', 'bootstrap', 'tailwindcss']) {
    expect(dependsOn(src, lib), lib).toBe(false);
  }
});

test("builds the form from uikit controls", () => {
  expect(uikitImport('Button')).toBe(true);
  expect(uikitImport('Checkbox')).toBe(true);
  expect(uikitImport('TextInput') || uikitImport('PasswordInput')).toBe(true);
});

test('judge: implements the task with the intended Gravity UI API', async () => {
  await expect(environment).toSatisfyCriterion(
    "@gravity-ui/uikit is added to the project and set up once at the entry point: its fonts.css and styles.css are imported before the app's own CSS, and the app is wrapped in uikit's ThemeProvider (or the all-in-one Provider) with a theme. The login page is built from uikit controls — TextInput or PasswordInput for email and password, Checkbox for remember me, Button to sign in — not raw HTML inputs or another UI library."
  );
});
