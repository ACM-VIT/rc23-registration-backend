import { IsString, Length, Matches } from 'class-validator';

export class ConfirmTeamDto {
  @IsString()
  @Matches(/^[A-Z]{8}$/)
  teamcode: string;
}
