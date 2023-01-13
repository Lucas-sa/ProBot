import express         from "express";
import morgan          from "morgan";
import cors            from "cors";
import movimentoRoutes from "./routes/movimento.routes";
import acaoRoutes      from "./routes/acao.routes";

const app = express();
import path from 'path';

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", movimentoRoutes);
app.use("/acao", acaoRoutes);

app.use('/', express.static(path.join(__dirname, '../public')))

export default app;
