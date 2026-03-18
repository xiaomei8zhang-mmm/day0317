import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoiceExecuteDto {
  @ApiProperty({ description: '语音会话ID', example: 'voice_abc_001' })
  @IsString()
  sessionId!: string;

  @ApiProperty({ description: '意图名', example: 'query_expense_total' })
  @IsString()
  intent!: string;

  @ApiProperty({ description: '槽位参数', example: { range: 'month_to_date' } })
  @IsObject()
  slots!: Record<string, unknown>;
}
