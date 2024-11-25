import fs from "fs";

const generateLargePayload = (targetSizeInMB = 5) => {
  const targetBytes = targetSizeInMB * 1024 * 1024;
  const payload = {
    data: [],
  };

  // Pre-calculate approximate size per entry
  const sampleEntry = {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
    value: Math.random() * 1000,
    text: "Lorem ipsum dolor sit amet ".repeat(10),
    array: Array.from({ length: 20 }, () => Math.random()),
  };

  const bytesPerEntry = Buffer.byteLength(JSON.stringify(sampleEntry));
  const estimatedEntries = Math.ceil(targetBytes / bytesPerEntry);

  // Generate all entries at once
  for (let i = 0; i < estimatedEntries; i++) {
    payload.data.push({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      value: Math.random() * 1000,
      text: "Lorem ipsum dolor sit amet ".repeat(10),
      array: Array.from({ length: 20 }, () => Math.random()),
    });
  }

  return payload;
};

console.time("Payload Generation");
const payload = generateLargePayload();
fs.writeFileSync("large-payload.json", JSON.stringify(payload, null, 2));
console.timeEnd("Payload Generation");
console.log(
  "Generated payload size:",
  Buffer.byteLength(JSON.stringify(payload)) / (1024 * 1024),
  "MB"
);
