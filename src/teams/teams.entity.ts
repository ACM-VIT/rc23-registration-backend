import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Participant } from 'src/participants/participants.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  teamcode: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @OneToMany(() => Participant, (participant) => participant.team)
  participants: Participant[];
}
