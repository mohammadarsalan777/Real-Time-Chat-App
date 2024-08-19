import { app } from "./app.js";
import { databaseConnection } from "./config/db.js";

const port = process.env.PORT;

app.listen(port, () => {
  databaseConnection();
  console.log(`The Port is running at http://localhost:${port}`);
});
