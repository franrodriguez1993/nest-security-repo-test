import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { Auth0ClientService } from './services/auth0.service'; 

const SERVICES = [
    Auth0ClientService
];

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: SERVICES,
  exports: SERVICES,
})
export class SharedModule {}