import fs from "fs";
import zlib from "zlib";
import readline from "readline";
import crypto from "crypto";

const INPUT_FILE = "basic-ac-db.json.gz";
const OUTPUT_DIR = "data";
const OUTPUT_FILE = `${OUTPUT_DIR}/aircraft-slim.json.gz`;
const META_FILE = `${OUTPUT_DIR}/metadata.json`;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const gunzip = zlib.createGunzip();
const gzip = zlib.createGzip({ level: 9 });

const input = fs.createReadStream(INPUT_FILE).pipe(gunzip);
const output = fs.createWriteStream(OUTPUT_FILE);
gzip.pipe(output);

const rl = readline.createInterface({
  input,
  crlfDelay: Infinity,
});

let recordCount = 0;
const hash = crypto.createHash("sha256");

console.log("🔧 Building slim aircraft database...");

for await (const line of rl) {
  if (!line) continue;

  let r;
  try {
    r = JSON.parse(line);
  } catch {
    continue;
  }

  const slim = {
    icao24: r.icao?.toUpperCase(),
    reg: r.reg ? r.reg.toUpperCase() : null,
    type:
      r.short_type || r.icaotype
        ? (r.short_type || r.icaotype).toUpperCase()
        : null,
  };

  if (!slim.icao24) continue;

  const outLine = JSON.stringify(slim) + "\n";
  gzip.write(outLine);
  hash.update(outLine);

  recordCount++;
}

gzip.end();

await new Promise((resolve) => output.on("finish", resolve));

const metadata = {
  dataset: "Aircraft Database (Slim)",
  version: new Date().toISOString().slice(0, 7), // YYYY-MM
  generatedAt: new Date().toISOString(),
  source: "ADS-B Exchange basic-ac-db",
  format: "NDJSON + gzip",
  records: recordCount,
  schema: {
    icao24: "ICAO 24-bit hex address (uppercase)",
    reg: "Aircraft registration (uppercase or null)",
    type: "ICAO aircraft type designator (uppercase or null)",
  },
  file: "aircraft-slim.json.gz",
  sha256: hash.digest("hex"),
};

fs.writeFileSync(META_FILE, JSON.stringify(metadata, null, 2));

console.log(`✅ Done`);
console.log(`📦 Records: ${recordCount}`);
console.log(`📁 Output: ${OUTPUT_FILE}`);
