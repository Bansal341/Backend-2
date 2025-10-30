const express = require("express");
const bodyParser = require("body-parser");
const bankingRoutes = require("./routes/bankingRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/", bankingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
