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

  static async checkPayment(personId: number, barbecueId: number) {
    await this.update({ id: personId }, { payed: true });
    const barbecue = await Barbecues.findOne({ where: { id: barbecueId } });
    const participant = await this.findOne({ where: { id: personId } });
    const updatedAmount = barbecue.amountCollected + participant.amountToPay;
    await Barbecues.update({ id: barbecueId }, { amountCollected: updatedAmount });
  }

  static async uncheckPayment(personId: number, barbecueId: number) {
    await this.update({ id: personId }, { payed: false });
    const barbecue = await Barbecues.findOne({ where: { id: barbecueId } });
    const participant = await this.findOne({ where: { id: personId } });
    const updatedAmount = barbecue.amountCollected - participant.amountToPay;
    await Barbecues.update({ id: barbecueId }, { amountCollected: updatedAmount });
  }
}
