import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BarbecueData } from "../interfaces/BarbecueData";
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
  amountCollected: number;

  @Column()
  totalParticipants: number;

  @Column()
  userId: number;

  @OneToMany(() => Participants, p => p.participant)
  barbecue: Participants[];

  static async saveBarbecue(data: BarbecueData) {
    const newBarbecue = this.create(data);
    await newBarbecue.save();
  }

  static async getBarbecueById(barbecueId: number) {
    const barbecue = await this.find({ where: { id: barbecueId } });
    return barbecue;
  }
}
