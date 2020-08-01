import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ hello: "typescript" });
});

app.listen(process.env.PORT || 3333);
