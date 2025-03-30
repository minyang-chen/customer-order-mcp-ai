import express from "express";
import cors from "cors";
import printers from "./printer-data";

const PORT = process.env.PORT || 8082;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("images"));

app.get("/products", (req, res) => {
  res.json(
    printers.map((printer) => ({
      ...printer,
      image: `${req.protocol}://${req.get("host")}${printer.image}`,
    }))
  );
});

app.listen(PORT, () => {
  console.log(
    `Printer Store Products API Server is running on port http://localhost:${PORT}`
  );
  console.log("/products")
});
