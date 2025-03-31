const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Cookie oluşturma
app.get("/cookie-olustur", (req, res) => {
    res.cookie("kullanici", "Ali", { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 gün geçerli
    res.send("Cookie oluşturuldu.");
});

// Cookie okuma
app.get("/cookie-oku", (req, res) => {
    const kullanici = req.cookies.kullanici || "Bilinmiyor";
    res.send(`Hoş geldin, ${kullanici}`);
});

// Cookie silme
app.get("/cookie-sil", (req, res) => {
    res.clearCookie("kullanici");
    res.send("Cookie silindi.");
});

app.listen(3000, () => console.log("Sunucu çalışıyor"));