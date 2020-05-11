import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: "./server/.env",
});

const app = express();

app.set("port", process.env.PORT || 80);
app.use(express.static(path.resolve(__dirname, process.env.CLIENT)));

app.get(process.env.PRODUCTS_ENDPOINT, async (_, res) => {
  let response, data;
  try {
    response = await fetch(process.env.PRODUCTS_API);
    if (!response.ok) {
      res.status(response.status);
    }
    data = await response.json();
    res.send(data);
  } catch (e) {
    res.send("error");
  }
});

app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
