import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(500)
  content?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
