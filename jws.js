const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "supergizlianahtar";  // 🔑 Güvenli bir anahtar belirleyin

// Giriş yapan kullanıcıya JWT token oluştur
app.post("/giris", (req, res) => {
    const { kullanici, sifre } = req.body;

    if (kullanici === "admin" && sifre === "1234") {
        const token = jwt.sign({ kullanici }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ mesaj: "Geçersiz kullanıcı adı veya şifre!" });
    }
});

// Token ile korunan bir route
app.get("/profil", authenticateToken, (req, res) => {
    res.json({ mesaj: `Hoş geldin, ${req.kullanici}` });
});


// Token doğrulama middleware fonksiyonu
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ mesaj: "Token gerekli!" });

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ mesaj: "Geçersiz token!" });
        req.kullanici = decoded.kullanici;
        next();
    });
};

app.listen(3000, () => console.log("Sunucu 3000 portunda çalışıyor"));
