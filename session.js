const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "gizliAnahtar",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // HTTP kullanımı için secure:false olmalı
}));

app.get("/giris", (req, res) => {
    req.session.kullanici = "Ali";
    res.send("Giriş yapıldı, hoş geldin Ali!");
});

app.get("/profil", (req, res) => {
    if (req.session.kullanici) {
        res.send(`Hoş geldin, ${req.session.kullanici}`);
    } else {
        res.send("Lütfen giriş yapınız.");
    }
});

app.get("/cikis", (req, res) => {
    req.session.destroy();
    res.send("Çıkış yapıldı.");
});

app.listen(3000, () => console.log("Sunucu çalışıyor"));