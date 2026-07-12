const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const rootPath = path.resolve(root);
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
  ".epub": "application/epub+zip",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".xhtml": "application/xhtml+xml; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".fb2": "application/xml; charset=utf-8",
  ".cbz": "application/vnd.comicbook+zip"
};

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch (_) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  let filePath = path.join(rootPath, pathname);
  if (pathname.endsWith("/")) filePath = path.join(filePath, "index.html");
  filePath = path.resolve(filePath);

  if (!isInsideRoot(filePath)) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer"
    });
    response.end(data);
  });
});

function isInsideRoot(filePath) {
  return filePath === rootPath || filePath.startsWith(`${rootPath}${path.sep}`);
}

server.listen(port, host, () => {
  console.log(`Edu Ebook Reader: http://${host}:${port}/`);
});
