const http = require("http");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("data.json", "utf-8");
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.setHeader("content-Type", "text/html");
      res.end(index);
      break;
    case "/data":
      res.setHeader("content-Type", "application/json");
      res.end(data);
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
});
server.listen(8080, () => {
  console.log("sercer is started!!!");
});