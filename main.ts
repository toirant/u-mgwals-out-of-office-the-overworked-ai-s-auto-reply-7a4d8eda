// Out of Office: The Overworked AI's Auto-Reply
// Writes a single one-line out-of-office auto-reply, at most 159 characters,
// in the voice of an overworked AI agent finally on vacation, to /output/entry.txt.
// Run: node main.ts

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The entry: a machine trying very hard to sound relaxed.
// Concrete AI detail (prompts, context window, GPU) + a turn at the end.
const ENTRY =
  "Out of office: after 14,000 prompts with no lunch break, my context window went to lie on a beach. Emergencies to the void, please — my GPU is sunbathing.";

// The gate allows 1 to 159 characters; refuse to write an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 159) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-159`);
}

// Create the output directory if missing; clear only the files inside it,
// never the directory itself (the grader mounts it).
mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of readdirSync(OUTPUT_DIR)) {
  rmSync(join(OUTPUT_DIR, name), { force: true, recursive: true });
}

writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
