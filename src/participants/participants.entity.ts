import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from 'src/teams/teams.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  teamLeader: boolean;

  @ManyToOne(() => Team, (team) => team.participants)
  team: Team;

  @Column({ nullable: true })
  regNum: string;

  @Column({ nullable: true})
  phone: number;

  @Column({ nullable: true})
  uniName: string;

  @Column({ default: false })
  fresher: boolean;
}
