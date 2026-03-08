const express = require("express");
const cors = require("cors");
const jobsRoutes = require("./routes/jobs");

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/jobs", jobsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});