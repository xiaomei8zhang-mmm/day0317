import { Injectable } from '@nestjs/common';
import { VoiceParseDto } from './dto/voice-parse.dto';
import { VoiceExecuteDto } from './dto/voice-execute.dto';
import { ExpenseService } from '../expense/expense.service';
import { ExpenseCategory } from '../expense/dto/create-expense.dto';
import { ScheduleEventType } from '../schedule/dto/create-schedule-event.dto';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class VoiceService {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly scheduleService: ScheduleService,
  ) {}

  parse(payload: VoiceParseDto) {
    const normalized = payload.text.trim();

    if (normalized.includes('花') && normalized.includes('多少')) {
      return {
        intent: 'query_expense_total',
        confidence: 0.96,
        slots: { range: 'month_to_date' },
        needConfirm: false,
      };
    }

    if (normalized.includes('吃') && normalized.includes('什么')) {
      return {
        intent: 'query_today_food',
        confidence: 0.9,
        slots: {},
        needConfirm: false,
      };
    }

    if (normalized.includes('衣服') || normalized.includes('穿搭')) {
      return {
        intent: 'query_today_outfit',
        confidence: 0.9,
        slots: {},
        needConfirm: false,
      };
    }

    if (normalized.includes('学校')) {
      return {
        intent: 'query_nearby_school',
        confidence: 0.91,
        slots: { radius: 5000 },
        needConfirm: false,
      };
    }

    const expenseMatch = normalized.match(/记一笔.*?(\d+(?:\.\d+)?)元/);
    if (expenseMatch) {
      return {
        intent: 'create_expense',
        confidence: 0.88,
        slots: { amount: Number(expenseMatch[1]), category: 'other' },
        needConfirm: true,
      };
    }

    if (normalized.includes('提醒我') || normalized.includes('新增提醒')) {
      return {
        intent: 'create_schedule',
        confidence: 0.84,
        slots: { title: '语音新增提醒', eventTime: '2026-03-18 10:00:00' },
        needConfirm: true,
      };
    }

    return {
      intent: 'unknown',
      confidence: 0.52,
      slots: {},
      needConfirm: false,
    };
  }

  execute(payload: VoiceExecuteDto) {
    if (payload.intent === 'query_expense_total') {
      const summary = this.expenseService.getSummary({ range: 'month' });
      return {
        text: `这个月到目前总花销是${summary.total}元。`,
        tts: `这个月到目前总花销是${summary.total}元`,
        action: {
          type: 'open_page',
          target: 'expense_report',
        },
      };
    }

    if (payload.intent === 'query_nearby_school') {
      return {
        text: '附近推荐学校有京华幼儿园和朝阳实验小学。',
        tts: '附近推荐学校有京华幼儿园和朝阳实验小学',
        action: {
          type: 'open_page',
          target: 'school_recommend',
        },
      };
    }

    if (payload.intent === 'query_today_food') {
      return {
        text: '今天建议早餐南瓜小米粥，午餐番茄牛肉面，晚餐三文鱼粥。',
        tts: '今天建议早餐南瓜小米粥，午餐番茄牛肉面，晚餐三文鱼粥',
        action: {
          type: 'open_page',
          target: 'feeding',
        },
      };
    }

    if (payload.intent === 'query_today_outfit') {
      return {
        text: '今天建议内搭加针织中层和防风外层，品牌优先巴拉巴拉。',
        tts: '今天建议内搭加针织中层和防风外层，品牌优先巴拉巴拉',
        action: {
          type: 'open_page',
          target: 'outfit',
        },
      };
    }

    if (payload.intent === 'create_expense') {
      const amount = Number(payload.slots.amount || 0);
      const result = this.expenseService.createExpense({
        amount,
        category: ExpenseCategory.OTHER,
        paidAt: '2026-03-15 11:08:00',
        childId: 101,
      });
      return {
        text: `已为你记录一笔${amount}元支出，本月累计${result.monthTotal}元。`,
        tts: `已为你记录一笔${amount}元支出`,
        action: {
          type: 'refresh',
          target: 'expense_report',
        },
      };
    }

    if (payload.intent === 'create_schedule') {
      const result = this.scheduleService.createEvent({
        eventType: ScheduleEventType.CUSTOM,
        title: String(payload.slots.title || '语音提醒'),
        eventTime: String(payload.slots.eventTime || '2026-03-18 10:00:00'),
        remindOffsets: [10080, 4320, 1440, 0],
        childId: 101,
      });
      return {
        text: `已创建提醒：${String(payload.slots.title || '语音提醒')}。`,
        tts: `已创建提醒`,
        action: {
          type: 'open_page',
          target: `schedule:${result.eventId}`,
        },
      };
    }

    return {
      text: '暂时没有理解你的指令，请换一种说法。',
      tts: '暂时没有理解你的指令，请换一种说法',
      action: {
        type: 'none',
        target: '',
      },
    };
  }
}
