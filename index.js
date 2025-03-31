
/*
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const ad = queryObject.ad || "Ziyaretçi";
    
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Merhaba, ${ad}!`);
});

server.listen(3000, () => console.log("Sunucu 3000 portunda çalışıyor"));
*/

 
/*
const express = require("express");
const app = express();

app.get("/merhaba/:ad", (req, res) => {
    const ad = req.params.ad;
    const yas = req.query.yas || "Bilinmiyor";
    res.send(`Merhaba, ${ad}! Yaşın: ${yas}`);
});

app.listen(3000, () => console.log("Sunucu 3000 portunda çalışıyor"));

*/

/**mongos 
  

const mongoose = require("mongoose");

// MongoDB'ye bağlan
mongoose.connect("mongodb://localhost:27017/Veritabanim", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Kullanıcı modelini tanımla
const Kullanici = mongoose.model("Kullanici", {
    ad: String
});

// Yeni kullanıcı ekle
async function yeniKullaniciEkle() {
    const yeniKullanici = new Kullanici({ ad: "Ali" });
    await yeniKullanici.save();
    console.log("Kullanıcı eklendi!");
}

yeniKullaniciEkle();

 
mongos end**/ 

/*
const sql = require("mssql");
// Bağlantı ayarları
const config = {
    user: "sa",
    password: "Abcd1234.,",
    server: "213.159.2.123",
    database: "haber_lgbt",
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

// Bağlantıyı oluştur ve sorgu çalıştır
async function getData() {
    try {
        await sql.connect(config);
        const result = await sql.query("SELECT top 3 * FROM yazilar");
        
        console.log(result.recordset); // Konsola yazdır
    } catch (err) {
        console.error("Hata:", err);
    } finally {
        sql.close();
    }
}

getData();
*/


const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "gizli_kelime", // Oturum için kullanılan gizli anahtar
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS kullanıyorsanız true yapabilirsiniz
}));

app.get("/", (req, res) => {
    req.session.sayac = (req.session.sayac || 0) + 1;
    res.send(`Sayfa ${req.session.sayac} kez ziyaret edildi.`); 
});

app.listen(3000, () => console.log("Sunucu 3000 portunda çalışıyor."));
