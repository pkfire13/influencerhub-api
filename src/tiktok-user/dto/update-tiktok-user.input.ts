import { CreateTiktokUserInput } from './create-tiktok-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTiktokUserInput extends PartialType(CreateTiktokUserInput) {
  @Field(() => Int)
  id: number;
}
