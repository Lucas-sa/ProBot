import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Acao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  opt: string;

  @Column()
  tipo: string;

  @Column()
  descricao: string;

  @Column("decimal", { precision: 20, scale: 2 })
  valor: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  data: Date;

  @Column()
  executada: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
