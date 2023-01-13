import { Request, Response } from "express";
import { Movimento } from "../entity/Movimento";
import moment from 'moment';
moment.locale('pt-br');

export const getTodas = async (req: Request, res: Response) => {
  try {
    const movimentos = await Movimento.find();
    const data: { id: number; descricao: string; valor: string; data: any; status: string; }[] = [];  
    movimentos.map(result => {

      const item = {
        'id': result.id,
        'descricao': result.descricao,
        'valor': Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(result.valor),
        'data': moment(result.data).format('L'),
        'status': result.status
      }

      data.push(item);

    })
    return res.json(data);

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getResumo = async (req: Request, res: Response) => {
  try {
    const { mes } = req.params;

    const entradas = await Movimento
    .createQueryBuilder("movimento")
    .select("SUM(movimento.valor)", "total")
    .where("movimento.tipo = :tipo", { tipo: "entrada" })
    .andWhere("MONTH(movimento.data) = :data", { data: mes })
    .getRawOne()

    const despesas = await Movimento
    .createQueryBuilder("movimento")
    .select("SUM(movimento.valor)", "total")
    .where("movimento.tipo = :tipo", { tipo: "despesa" })
    .andWhere("MONTH(movimento.data) = :data", { data: mes })
    .getRawOne()

    const despesasPagas = await Movimento
    .createQueryBuilder("movimento")
    .select("SUM(movimento.valor)", "total")
    .where("movimento.tipo = :tipo", { tipo: "despesa" })
    .andWhere("movimento.status = :status", { status: "paga" })
    .andWhere("MONTH(movimento.data) = :data", { data: mes })
    .getRawOne()

    const despesasAbertas = await Movimento
    .createQueryBuilder("movimento")
    .select("SUM(movimento.valor)", "total")
    .where("movimento.tipo = :tipo", { tipo: "despesa" })
    .andWhere("movimento.status = :status", { status: "aberto" })
    .andWhere("MONTH(movimento.data) = :data", { data: mes })
    .getRawOne()

    const data = []
    const saldo = entradas.total - despesas.total
    const iten = {
      "entradas": Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(entradas.total),
      "despesas": Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(despesas.total),
      "saldo": Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(saldo),
      "despesasPagas": Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(despesasPagas.total),
      "despesasAbertas": Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(despesasAbertas.total)
    }

    data.push(iten)

    return res.json(data);

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getEntradas = async (req: Request, res: Response) => {
  try {
    const { mes } = req.params;
    const movimentos = await Movimento
    .createQueryBuilder("movimento")
    .where("MONTH(movimento.data) = :data", { data: mes })
    .andWhere("movimento.tipo = :tipo", { tipo: "entrada" })
    .getMany()

    const data: { id: number; descricao: string; valor: string; data: any; status: string; }[] = [];  
    movimentos.map(result => {

      const item = {
        'id': result.id,
        'descricao': result.descricao,
        'valor': Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(result.valor),
        'data': moment(result.data).format('L'),
        'status': result.status
      }

      data.push(item);

    })

    return res.json(data);

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getDespesas = async (req: Request, res: Response) => {
  try {
    const { mes } = req.params;
    const movimentos = await Movimento
    .createQueryBuilder("movimento")
    .where("MONTH(movimento.data) = :data", { data: mes })
    .andWhere("movimento.tipo = :tipo", { tipo: "despesa" })
    .getMany()

    const data: { id: number; descricao: string; valor: string; data: any; status: string; }[] = [];  
    movimentos.map(result => {

      const item = {
        'id': result.id,
        'descricao': result.descricao,
        'valor': Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(result.valor),
        'data': moment(result.data).format('L'),
        'status': result.status
      }

      data.push(item);

    })
    
    return res.json(data);

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUnique = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movimento = await Movimento.findOneBy({ id: parseInt(id) });

    if (!movimento) return res.status(404).json({ message: "Registro não encontrado" });

    return res.json(movimento);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const create = async (req: Request, res: Response) => {
  const { descricao, tipo, valor, status, data } = req.body;
  const movimento = new Movimento();
  movimento.descricao = descricao;
  movimento.tipo = tipo;
  movimento.valor = valor;
  movimento.status = status;
  movimento.data = data;
  await movimento.save();
  return res.json(movimento);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movimento = await Movimento.findOneBy({ id: parseInt(id) });
    if (!movimento) return res.status(404).json({ message: "Registro não encontrado" });

    await Movimento.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const clean = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Movimento.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Registro não encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
