import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ReputationService } from './reputation.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@raiquet/core';

@Controller('reviews')
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Post()
  createReview(@CurrentUser() user: any, @Body() createReviewDto: CreateReviewDto) {
    return this.reputationService.createReview(user.id, createReviewDto);
  }

  @Get('user/:userId')
  getUserReviews(@Param('userId') userId: string) {
    return this.reputationService.getUserReviews(userId);
  }
}
