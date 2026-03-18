import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VoiceService } from './voice.service';
import { VoiceParseDto } from './dto/voice-parse.dto';
import { VoiceExecuteDto } from './dto/voice-execute.dto';

@ApiTags('voice')
@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post('parse')
  @ApiOperation({ summary: '语音文本解析' })
  @ApiBody({ type: VoiceParseDto })
  @ApiOkResponse({ description: '解析成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  parse(@Body() payload: VoiceParseDto) {
    return this.voiceService.parse(payload);
  }

  @Post('execute')
  @ApiOperation({ summary: '执行语音意图' })
  @ApiBody({ type: VoiceExecuteDto })
  @ApiOkResponse({ description: '执行成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  execute(@Body() payload: VoiceExecuteDto) {
    return this.voiceService.execute(payload);
  }
}
