const fs = require("fs");

const csvToJson = (csv) => {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",").map(h => h.trim());

  return lines.map(line => {
    const values = line.split(",").map(v => v.trim());
    return Object.fromEntries(headers.map((key, i) => [key, values[i]]));
  });
};

const convertFile = (inputPath, outputPath) => {
  const csv = fs.readFileSync(inputPath, "utf8");
  const json = csvToJson(csv);
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
};

const files = [
  { input: "../data/USZIPCodes.csv", output: "../json/us_zipcodes.json" },
  { input: "../data/CanadianPostalCodes_AtoM.csv", output: "../json/ca_postal_a_m.json" },
  { input: "../data/CanadianPostalCodes_NtoZ.csv", output: "../json/ca_postal_n_z.json" },
  { input: "../data/airports.csv", output: "../json/airports.json" },
];

if (!fs.existsSync("../json")) fs.mkdirSync("../json");

files.forEach(({ input, output }) => {
  console.log(`Converting ${input} → ${output}`);
  convertFile(input, output);
});

console.log("All files converted!");
