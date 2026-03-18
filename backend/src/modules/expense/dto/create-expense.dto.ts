import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ExpenseCategory {
  FOOD = 'food',
  DIAPER = 'diaper',
  CLOTHING = 'clothing',
  MEDICAL = 'medical',
  EDUCATION = 'education',
  TOY = 'toy',
  TRAVEL = 'travel',
  OTHER = 'other',
}

export class CreateExpenseDto {
  @ApiPropertyOptional({ description: '孩子ID', example: 101 })
  @IsOptional()
  @IsNumber()
  childId?: number;

  @ApiProperty({ description: '金额（元）', minimum: 0.01, example: 89 })
  @IsNumber()
  @Min(0.01)
  amount!: number;

  @ApiProperty({ description: '消费分类', enum: ExpenseCategory, example: ExpenseCategory.DIAPER })
  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @ApiProperty({ description: '支付时间', example: '2026-03-15 11:08:00' })
  @IsString()
  paidAt!: string;

  @ApiPropertyOptional({ description: '备注', example: '尿不湿L码' })
  @IsOptional()
  @IsString()
  note?: string;
}
