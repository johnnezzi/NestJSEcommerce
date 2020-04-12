import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
