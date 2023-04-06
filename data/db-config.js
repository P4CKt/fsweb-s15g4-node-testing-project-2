// ./data/dbConfig.js
const knex = require("knex");

const config = require("../knexfile.js");

// eğer ortam değişkeni tanımlı değil ise, default olarak 'development'ı kullanır
// bu değişken sadece npm betiği olarak ayarladığımız "test" çalışınca(npm run test) ayarlanır
const dbEnv = process.env.DB_ENV || "development";

// dbEnv'nin değeri 'development' veya 'testing' olabilir
// knexfile.js'de
// karşılık gelen ayarları seçmek için köşeli parantezler içinde göndereceğiz
module.exports = knex(config[dbEnv]);
