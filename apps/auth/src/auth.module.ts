import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TokenController } from './controller/TokenController';
import { SysLoginService } from './service/SysLoginService';
//@ts-ignore
import * as config from 'config'
import { SystemModule } from "apps/system/src/system.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthStrategy } from "./auth.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/Auth.guard";
import { RoleGuard } from "./guards/Role.guard";
import { PermissionGuard } from "./guards/Permission.guard";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SystemModule,
    JwtModule.registerAsync({
      imports:[],
      useFactory: async () => ({
        secret: config.get('jwt.secretkey')
      }),
    }),
  ],
  controllers: [TokenController],
  providers: [SysLoginService,AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports:[PassportModule]
})
export class AuthModule {}
