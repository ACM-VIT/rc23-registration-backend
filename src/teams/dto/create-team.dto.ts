import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  name: string;
}
