const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".mp3":  "audio/mpeg",
    ".m4a":  "audio/mp4",
    ".webp": "image/webp",
    ".css":  "text/css",
    ".js":   "application/javascript",
};

const PUB = "D:/wangye/Mizuki-master/public/music-wall";
const ASSETS = "D:/wangye/Mizuki-master/public/assets";

http.createServer((req, res) => {
    let filePath;
    if (req.url.startsWith("/assets/")) {
        filePath = path.join(ASSETS, decodeURIComponent(req.url.slice(8)).split("?")[0]);
    } else if (req.url === "/" || req.url === "/index.html") {
        filePath = path.join(PUB, "index.html");
    } else {
        filePath = path.join(PUB, decodeURIComponent(req.url).split("?")[0]);
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME[ext] || "application/octet-stream";

    fs.stat(filePath, (err, stats) => {
        if (err) { res.writeHead(404); res.end("Not Found"); return; }

        const fileSize = stats.size;
        const range = req.headers.range;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Accept-Ranges", "bytes");

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + fileSize,
                "Content-Length": chunkSize,
                "Content-Type": mimeType,
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Type": mimeType,
                "Content-Length": fileSize,
                "Cache-Control": "public, max-age=3600",
            });
            fs.createReadStream(filePath).pipe(res);
        }
    });
}).listen(8765, () => console.log("Server on http://localhost:8765"));
