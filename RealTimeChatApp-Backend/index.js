import { app } from "./app.js";
import { databaseConnection } from "./db.js";

const port = process.env.PORT;

databaseConnection();

app.listen(port, () => {
  console.log(`The Port is running at http://localhost:${port}`);
});
