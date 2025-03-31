const mongoose = require("mongoose");

const KullaniciSchema = new mongoose.Schema({
    ad: String,
    yas: Number
});

module.exports = mongoose.model("Kullanici", KullaniciSchema);