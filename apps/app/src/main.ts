import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from "apps/framework/src/config/CustomLogger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new CustomLogger()
  });
  console.log("conf",config);
   //  swagger config
  if(config.get("swagger.enable")){

    const options = new DocumentBuilder()
      .setTitle(config.get("swagger.title"))
      .setDescription(config.get("swagger.desc"))
      .setVersion(config.get("swagger.version"))
      .build();
    const document = SwaggerModule.createDocument(app, options,{

    });
    SwaggerModule.setup('docs', app, document);
  }


  await app.listen(config.get('server.port'));

}
// DEV ENV  need copy i18n to dist package
if(process.env.NODE_ENV === "development"){
  const copyAssets = require("../../../../scripts/copyI18nAssets")
}
bootstrap();
