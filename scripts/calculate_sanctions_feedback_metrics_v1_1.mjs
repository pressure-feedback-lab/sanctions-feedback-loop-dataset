import fs from "node:fs";

const inputPath = process.argv[2] || "sanctions_feedback_loop_dataset_v0_1.csv";
const outputPath = process.argv[3] || "sanctions_feedback_loop_dataset_v0_1_phase_v1_1.csv";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      row.push(cell);
      if (row.some(v => v.length > 0)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function escapeCsv(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toInt(value) {
  const n = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isFinite(n) ? n : 0;
}

function classifyPhase(row) {
  const b = toInt(row.b_index);
  const r = toInt(row.r_fracture);
  const e = toInt(row.economic_stress);
  const p = toInt(row.protest_frequency);

  if (r >= 1 && b <= 4) return "S4_transition";
  if (r >= 0 && p >= 2) return "R_transition";
  if (e >= 2 && p >= 1) return "L_pressure";
  return "B_dominant";
}

const text = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");
const parsed = parseCsv(text);
const headers = parsed[0];
const records = parsed.slice(1).map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""])));

const outputHeaders = [
  "id","country","date","year","month",
  "sanction_intensity","military_pressure","external_threat_narrative",
  "protest_frequency","repression_intensity","economic_stress",
  "elite_fragmentation","civilian_relief_access",
  "b_index","r_fracture","phase","notes","source"
];

const changes = [];

for (const row of records) {
  const originalPhase = row.phase || "";
  row.b_index = String(toInt(row.sanction_intensity) + toInt(row.military_pressure) + toInt(row.external_threat_narrative));
  row.r_fracture = String(toInt(row.elite_fragmentation) - toInt(row.repression_intensity));
  row.phase = classifyPhase(row);

  if (originalPhase !== row.phase) {
    changes.push({ id: row.id, country: row.country, year: row.year, from: originalPhase, to: row.phase });
  }
}

const csv = [
  outputHeaders.join(","),
  ...records.map(row => outputHeaders.map(h => escapeCsv(row[h])).join(","))
].join("\n");

fs.writeFileSync(outputPath, csv + "\n", "utf8");

console.log(`records=${records.length}`);
console.log(`phase_changes=${changes.length}`);
if (changes.length) console.table(changes);
