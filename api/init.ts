import app from "./app";
import { PORT } from "./config";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT);
    console.log("Server iniciado -> http://191.252.192.168:3000", PORT);

  } catch (error) {
    console.error(error);
  }
}

main();
