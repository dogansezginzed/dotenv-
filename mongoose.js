const mongoose = require("mongoose");
const Kullanici = require("./Kullanici"); // Modeli içe aktarıyoruz


// MongoDB'ye bağlan
mongoose.connect("mongodb://localhost:27017/test")
    .then(async () => {
    console.log("MongoDB'ye bağlanıldı!");

    // Yeni kullanıcı oluştur
    const yeniKullanici = new Kullanici({
        ad: "Ayşe",
        yas: 25
    });

    // Kaydet ve sonucu ekrana yazdır
    await yeniKullanici.save();
    console.log("Kullanıcı kaydedildi:", yeniKullanici);

    const kullanicilar = await Kullanici.find();
    console.log("Kullanıcılar:", kullanicilar);

    const kullanici = await Kullanici.findById("67e8a7574fc1601f99e77e71");
    console.log("ID'ye Göre Kullanıcı:", kullanici);

    mongoose.connection.close(); // Bağlantıyı kapat
}).catch(err => console.log("Bağlantı hatası:", err));