import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import * as config from 'config'

const entitiesPaths = [join(__dirname,'..','..','..','..','**','*.entity.{ts,js}')]
console.log("entitiesPaths: ",entitiesPaths);
const typeOrmConfig = config.get("typeOrm") as any
export default TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: entitiesPaths,

  });