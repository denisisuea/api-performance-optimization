const express = require("express");
const router = express.Router();
const pool = require("../db");
const redisClient = require("../cache");

router.get("/", async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const cacheKey = `products:${page}:${limit}`;

    // 1️⃣ Buscar en cache
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      console.log("Datos desde CACHE ⚡");
      return res.json(JSON.parse(cacheData));
    }

    // 2️⃣ Consultar DB con paginación
    const result = await pool.query(
      "SELECT * FROM products LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    // 3️⃣ Guardar en cache
    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(result.rows)
    );

    console.log("Datos desde DATABASE 🗄️");

    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error en consulta" });

  }

});

module.exports = router;