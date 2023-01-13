import { Movimento } from "./api/entity/Movimento";
import moment from 'moment';
moment.locale('pt-br');

const movimentos = await Movimento
.createQueryBuilder("movimento")
.select("SUM(movimento.valor)", "valor")
.where("MONTH(movimento.data) = :data", { data: "01" })
.andWhere("movimento.tipo = :tipo", { tipo: "entrada" })
.getRawOne()

console.log(movimentos)

