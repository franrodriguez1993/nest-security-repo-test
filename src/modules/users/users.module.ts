import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { CsrfProtectionMiddleware } from 'src/shared/middleware/csrf-protection.middleware';
import { ApplicationJSONMiddleware, MultiPartFormDataMiddleware, XContentTypeOptionsMiddleware } from 'src/shared/middleware/content-type.middleware';
import { HostMiddleware } from 'src/shared/middleware/host.middleware';
import { NoCacheMiddleware } from 'src/shared/middleware/no-cache.middleware';
import { ExpectCTMiddleware } from 'src/shared/middleware/expectCT.middleware';

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
    consumer
      .apply(HostMiddleware).forRoutes("*")
      .apply(CsrfProtectionMiddleware).forRoutes("*")
      // .forRoutes(
      //   { path: 'users', method: RequestMethod.POST }, 
      //   { path: 'users', method: RequestMethod.PUT },
      //   { path: 'users', method: RequestMethod.DELETE },
      // );
      .apply(ApplicationJSONMiddleware).forRoutes({path:"users",method:RequestMethod.POST})
      .apply(MultiPartFormDataMiddleware).forRoutes({path:"users/upload",method:RequestMethod.POST})
      .apply(NoCacheMiddleware).forRoutes("*")
      .apply(XContentTypeOptionsMiddleware).forRoutes("*")
      .apply(ExpectCTMiddleware).forRoutes("*")
}
}