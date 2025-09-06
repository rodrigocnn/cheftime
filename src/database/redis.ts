// src/database/redis.ts
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379", // Redis local
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("🔌 Redis conectado"));
redisClient.on("ready", () => console.log("🚀 Redis pronto para uso"));

// Conectar ao Redis ao iniciar a aplicação
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Erro ao conectar no Redis:", err);
  }
})();

export default redisClient;
