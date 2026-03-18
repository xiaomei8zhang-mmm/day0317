import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseSummaryDto } from './dto/get-expense-summary.dto';

@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: '新增支出记录' })
  @ApiBody({ type: CreateExpenseDto })
  @ApiOkResponse({ description: '创建成功' })
  @ApiBadRequestResponse({
    description: '参数校验失败',
    schema: {
      example: {
        statusCode: 400,
        message: ['amount must not be less than 0.01'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() payload: CreateExpenseDto) {
    return this.expenseService.createExpense(payload);
  }

  @Get('summary')
  @ApiOperation({ summary: '获取支出汇总' })
  @ApiQuery({ name: 'range', required: false, enum: ['month', 'quarter', 'year'] })
  @ApiOkResponse({ description: '查询成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  summary(@Query() query: GetExpenseSummaryDto) {
    return this.expenseService.getSummary(query);
  }
}
