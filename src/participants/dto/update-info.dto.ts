import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateInfoDto {
  @IsString()
  @Matches(/^(19|2[0-2])(BCT|BCE|CSE)[0-9]{4}$/)
  regNum: string;

  @IsNumber()
  phone: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  uniName: string;

  @IsBoolean()
  fresher: boolean;
}
