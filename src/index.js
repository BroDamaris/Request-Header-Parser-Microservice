const express = require("express");
const app = express();

// Middleware untuk mendapatkan IP address
function getIpAddress(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;
  return ip;
}

app.get("/api/whoami", (req, res) => {
  // Ambil data IP, language, dan software dari header request
  const ipAddress = getIpAddress(req);
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  // Format output sesuai contoh
  const response = {
    ipaddress: ipAddress,
    language: language,
    software: software,
  };

  // Kirim respons ke client
  res.json(response);
});

// Jalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
