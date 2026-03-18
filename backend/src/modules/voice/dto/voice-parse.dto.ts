import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoiceParseDto {
  @ApiProperty({ description: '语音会话ID', example: 'voice_abc_001' })
  @IsString()
  sessionId!: string;

  @ApiProperty({ description: '识别后的文本', example: '这个月到目前花了多少钱' })
  @IsString()
  text!: string;
}
