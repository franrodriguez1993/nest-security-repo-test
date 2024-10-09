import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { ApplicationJSONMiddleware, MultiPartFormDataMiddleware,  } from 'src/shared/middleware/content-type.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  // protection agains csfr
  configure(consumer: MiddlewareConsumer) {
    if(process.env.MODE === "prod"){
      consumer
      .apply(ApplicationJSONMiddleware).forRoutes({path:"users",method:RequestMethod.POST})
      .apply(MultiPartFormDataMiddleware).forRoutes({path:"users/upload",method:RequestMethod.POST})
    }
}
}