/*const redis = require("redis");
const client = redis.createClient();*/
const server = require("./api/server");
const { PORT } = require("./config/config");
/*
// Redis bağlantısı başarıyla kurulduğunda
client.on("connect", function () {
  console.log("Redis bağlantısı başarıyla kuruldu.");
});

// Basit bir test işlemi gerçekleştir
client.set("testKey", "testValue", function (err, reply) {
  if (err) {
    console.error("Redis test işlemi hatası:", err);
  } else {
    console.log("Redis test işlemi başarılı:", reply);

    // Değeri getir
    client.get("testKey", function (err, reply) {
      if (err) {
        console.error("Redis getirme işlemi hatası:", err);
      } else {
        console.log("Redis getirme işlemi başarılı:", reply);
      }

      // Redis bağlantısını kapat
      client.quit();
    });
  }
});*/

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
