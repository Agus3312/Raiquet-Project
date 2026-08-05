import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { prisma } from '@raiquet/database';
import { CreateReviewDto } from './dto/create-review.dto';
import { OrderStatus } from '@raiquet/core';

@Injectable()
export class ReputationService {
  async createReview(authorId: string, createReviewDto: CreateReviewDto) {
    const order = await prisma.order.findUnique({
      where: { id: createReviewDto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.buyerId !== authorId) {
      throw new BadRequestException('Only the buyer can review this order');
    }

    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException('Can only review DELIVERED orders');
    }

    const existingReview = await prisma.review.findUnique({
      where: { orderId: order.id },
    });

    if (existingReview) {
      throw new BadRequestException('Order has already been reviewed');
    }

    const review = await prisma.review.create({
      data: {
        orderId: order.id,
        authorId: authorId,
        targetId: order.sellerId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
    });

    // Recalculate reputation
    const userReviews = await prisma.review.findMany({
      where: { targetId: order.sellerId },
    });
    const totalRating = userReviews.reduce((sum, r) => sum + r.rating, 0);
    const newScore = totalRating / userReviews.length;

    await prisma.user.update({
      where: { id: order.sellerId },
      data: { reputationScore: newScore },
    });

    return review;
  }

  async getUserReviews(userId: string) {
    return prisma.review.findMany({
      where: { targetId: userId },
      include: {
        author: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
