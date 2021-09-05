import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Barbecues from "./Barbecues";

@Entity("participants")
export default class Participants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  drinks: boolean;

  @Column()
  amountToPay: number;

  @Column()
  payed: boolean;

  @Column()
  barbecueId: number;

  @Column()
  totalParticipants: string;

  @ManyToOne(() => Barbecues, b => b.barbecue)
  participant: Barbecues;
}
