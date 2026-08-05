import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReputationModule } from './reputation/reputation.module';

@Module({
  imports: [AuthModule, ReputationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
