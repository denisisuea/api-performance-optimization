const express = require("express");
const router = express.Router();
const pool = require("../db");
const orderItemsLoader = require("../loaders/orderItemsLoader");

router.get("/", async (req, res) => {

  try {

    const orders = await pool.query("SELECT * FROM orders");

    const result = [];

    for (const order of orders.rows) {

      const items = await orderItemsLoader.load(order.id);

      result.push({
        order_id: order.id,
        user_id: order.user_id,
        items: items
      });

    }

    res.json(result);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error obteniendo orders" });

  }

});

module.exports = router;