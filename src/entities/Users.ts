import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
