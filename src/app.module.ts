import { MiddlewareConsumer, Module } from '@nestjs/common';
import helmet from 'helmet';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigModule } from './database/mongo.module';
import { SharedModule } from './shared/shared.module';
import { NoCacheMiddleware } from './shared/middleware/no-cache.middleware';
import { XContentTypeOptionsMiddleware } from './shared/middleware/content-type.middleware';
import { ExpectCTMiddleware } from './shared/middleware/expectCT.middleware';
import { HostMiddleware } from './shared/middleware/host.middleware';
import { CsrfProtectionMiddleware } from './shared/middleware/csrf-protection.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MongoConfigModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if(process.env.MODE === "prod"){
      consumer.apply(NoCacheMiddleware).forRoutes("*")
      .apply(XContentTypeOptionsMiddleware).forRoutes("*")
      .apply(ExpectCTMiddleware).forRoutes("*")
      .apply(HostMiddleware).forRoutes("*")
      .apply(CsrfProtectionMiddleware).forRoutes("*")
    }
    consumer.apply(helmet()).forRoutes('*')
}
}