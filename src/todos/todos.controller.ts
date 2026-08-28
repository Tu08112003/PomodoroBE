import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, ParseObjectIdPipe } from '../common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@CurrentUser('sub') userId: string) {
    return this.todosService.findAllByUser(userId);
  }

  @Post()
  create(@CurrentUser('sub') userId: string, @Body() dto: CreateTodoDto) {
    return this.todosService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseObjectIdPipe) todoId: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todosService.update(userId, todoId, dto);
  }

  @Delete(':id')
  async delete(@CurrentUser('sub') userId: string, @Param('id', ParseObjectIdPipe) todoId: string) {
    await this.todosService.delete(userId, todoId);
    return { message: 'Todo deleted successfully' };
  }
}
