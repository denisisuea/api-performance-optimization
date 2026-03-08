const DataLoader = require("dataloader");
const pool = require("../db");

const orderItemsLoader = new DataLoader(async (orderIds) => {

  console.log("Batch loading items for orders:", orderIds);

  const result = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ANY($1)",
    [orderIds]
  );

  const items = result.rows;

  return orderIds.map(orderId =>
    items.filter(item => item.order_id === orderId)
  );

});

module.exports = orderItemsLoader;