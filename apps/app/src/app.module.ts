import { Module, OnModuleInit, ValidationPipe } from "@nestjs/common";
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { FrameworkModule } from 'apps/framework/src/framework.module';
import { SystemModule } from 'apps/system/src/system.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { CommonModule } from 'apps/common/src/common.module';
import { GenModule } from "apps/gen/src/gen.module";
import { DemoModule } from "apps/demo/src/demo.module";
@Module({
  imports: [
    FrameworkModule,
    SystemModule,
    AuthModule,
    CommonModule,
    GenModule,
    DemoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements OnModuleInit{
  onModuleInit(): any {
    console.log("app onModuleInit");
  }
}
