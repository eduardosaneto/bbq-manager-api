import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BarbecueData } from "../interfaces/BarbecueData";
import { ParticipantData } from "../interfaces/ParticipantData";
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
  foodValue: number;

  @Column()
  drinkValue: number;

  @Column()
  amountCollected: number;

  @Column()
  totalParticipants: number;

  @Column()
  userId: number;

  @OneToMany(() => Participants, p => p.barbecue)
  participants: Participants[];

  static async saveBarbecue(data: BarbecueData) {
    const newBarbecue = this.create(data);
    await newBarbecue.save();
  }

  static async getBarbecueById(barbecueId: number) {
    const barbecue = await this.find({ where: { id: barbecueId } });
    return barbecue;
  }

  static async increasePeople(data: ParticipantData) {
    const barbecue = await this.findOne({ where: { id: data.barbecueId } });
    const newNumberOfPeople = barbecue.totalParticipants + 1;
    await this.update({ id: data.barbecueId }, { totalParticipants: newNumberOfPeople });
  }

  static async increaseAmount(data: ParticipantData) {
    const barbecue = await this.findOne({ where: { id: data.barbecueId } });
    const updatedAmount = barbecue.amountCollected + data.amountToPay;
    await this.update({ id: data.barbecueId }, { amountCollected: updatedAmount });
  }
}
