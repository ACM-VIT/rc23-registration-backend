import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateInfoDto {
  @IsString()
  @Matches(/^(19|2[0-2])([A-Z]{3})[0-9]{4}$/)
  regNum: string;

  @IsNumber()
  @Min(0)
  @Max(922337203685477)
  phone: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  uniName: string;

  @IsBoolean()
  fresher: boolean;
}
