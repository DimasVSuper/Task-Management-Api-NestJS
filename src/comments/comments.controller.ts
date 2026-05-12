import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tasks')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id/comments')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateCommentDto,
  ) {
    return this.commentsService.create(id, payload);
  }

  @Get(':id/comments')
  findByTask(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findByTask(id);
  }
}
