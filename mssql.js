
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