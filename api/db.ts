import { DataSource } from "typeorm";
import { Movimento } from "./entity/Movimento";
import { Acao } from "./entity/Acao";
import { DBHOST, DBNAME, DBPASS, DBUSER } from "./config";

export const AppDataSource = new DataSource({
  type: 'mysql',
    host: DBHOST,
    port: 3306,
    username: DBUSER,
    password: DBPASS,
    database: DBNAME,
  synchronize: true,
  // logging: true,
  entities: [Movimento, Acao],
});
