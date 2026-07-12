const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const previewTag = html.match(/<iframe[^>]+id="previewFrame"[^>]*>/i)?.[0] || "";
const checks = {
  previewIsSandboxed: /sandbox="allow-scripts allow-forms"/i.test(previewTag),
  previewCannotShareCreatorOrigin: !/allow-same-origin/i.test(previewTag),
  localScriptsStillSupported: /allow-scripts/i.test(previewTag),
  fullscreenStillSupported: /allow="fullscreen"/i.test(previewTag) && /allowfullscreen/i.test(previewTag),
  allPreviewContentPassesPolicy: app.includes("els.previewFrame.srcdoc = applyPreviewSecurityPolicy(content);"),
  policyDefaultsToDeny: app.includes('"default-src \'none\'"'),
  policyBlocksExternalConnections: app.includes('"connect-src blob:"'),
  policyBlocksNestedFramesAndSubmissions: app.includes('"frame-src \'none\'"') && app.includes('"form-action \'none\'"'),
};

const failed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
console.log(JSON.stringify(checks, null, 2));
if (failed.length) {
  console.error(`Preview security test failed: ${failed.join(", ")}`);
  process.exit(1);
}
