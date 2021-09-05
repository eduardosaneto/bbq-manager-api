import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  static async createNew(email: string, name: string, password: string) {
    const existingEmail = await this.validateDuplicateEmail(email);
    if (existingEmail) return true;
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, name, password: hashedPassword });
    await newUser.save();
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });
    if (user) return true;
  }
}
