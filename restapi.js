const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json()); // JSON verilerini işleyebilmek için

const kullanicilar = [
    { id: 1, ad: "Ali", yas: 30 },
    { id: 2, ad: "Veli", yas: 25 }
];

const SECRET_KEY = "supergizlianahtar";  // 🔑 Güvenli bir anahtar belirleyin

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

// Giriş yapan kullanıcıya JWT token oluştur
app.post("/token", (req, res) => {
    const { kullanici, sifre } = req.body;

    if (kullanici === "admin" && sifre === "1234") {
        const token = jwt.sign({ kullanici }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ mesaj: "Geçersiz kullanıcı adı veya şifre!" });
    }
});

// 1. GET: Tüm kullanıcıları listele
app.get("/api/kullanicilar", authenticateToken, (req, res) => {
    res.json(kullanicilar);
});

// 2. GET: Belirli bir kullanıcıyı getir
app.get("/api/kullanicilar/:id", (req, res) => {
    const kullanici = kullanicilar.find(k => k.id == req.params.id);
    if (!kullanici) return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });
    res.json(kullanici);
});

// 3. POST: Yeni kullanıcı ekle
app.post("/api/kullanicilar", (req, res) => {
    const yeniKullanici = { id: kullanicilar.length + 1, ...req.body };
    kullanicilar.push(yeniKullanici);
    res.status(201).json(yeniKullanici);
});

// 4. PUT: Kullanıcıyı güncelle
app.put("/api/kullanicilar/:id", (req, res) => {
    const kullanici = kullanicilar.find(k => k.id == req.params.id);
    if (!kullanici) return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });

    kullanici.ad = req.body.ad || kullanici.ad;
    kullanici.yas = req.body.yas || kullanici.yas;
    res.json(kullanici);
});

// 5. DELETE: Kullanıcıyı sil
app.delete("/api/kullanicilar/:id", (req, res) => {
    const index = kullanicilar.findIndex(k => k.id == req.params.id);
    if (index === -1) return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });

    kullanicilar.splice(index, 1);
    res.json({ mesaj: "Kullanıcı silindi!" });
});

app.listen(3000, () => console.log("API 3000 portunda çalışıyor"));
