import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Movimento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  tipo: string;

  @Column("decimal", { precision: 20, scale: 2 })
  valor: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  data: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
