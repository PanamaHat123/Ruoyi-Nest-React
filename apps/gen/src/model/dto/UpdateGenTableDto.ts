import { ApiProperty } from "@nestjs/swagger";
import { CreateGenTableDto } from "./CreateGenTableDto";


export class UpdateGenTableDto extends CreateGenTableDto {
  @ApiProperty({ type: Number, description: '编号' })
  public tableId: number;
}