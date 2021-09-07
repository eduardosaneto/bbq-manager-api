import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ParticipantData } from "../interfaces/ParticipantData";
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

  @ManyToOne(() => Barbecues, b => b.participants)
  barbecue: Barbecues;

  static async getParticipants(barbecueId: number) {
    const participants = await this.find({ where: { barbecueId } });
    return participants;
  }

  static async addParticipant(data: ParticipantData) {
    const newParticipant = this.create(data);
    await newParticipant.save();
  }

  static async checkPayment(personId: number) {
    await this.update({ id: personId }, { payed: true });
  }

  static async uncheckPayment(personId: number) {
    await this.update({ id: personId }, { payed: false });
  }
}
