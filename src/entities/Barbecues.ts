import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Participants from "./Participants";

@Entity("barbecues")
export default class Barbecues extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  observations: string;

  @Column()
  amountCollected: string;

  @Column()
  totalParticipants: string;

  @Column()
  userId: number;

  @OneToMany(() => Participants, p => p.participant)
  barbecue: Participants[];
}
