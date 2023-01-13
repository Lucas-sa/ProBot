import { Request, Response } from "express";
import { Acao } from "../entity/Acao";
import moment from 'moment';
moment.locale('pt-br');

export const create = async (req: Request, res: Response) => {
    try {
      const acao = await Acao.findOneBy({ id: 1 });  
      await Acao.update({ id: 1 }, req.body);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const acao = await Acao.findOneBy({ id: parseInt(id) });  
      await Acao.update({ id: parseInt(id) }, req.body);
  
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
      const result = await Acao.delete({ id: parseInt(id) });
  
      if (result.affected === 0)
        return res.status(404).json({ message: "Registro não encontrado" });
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

