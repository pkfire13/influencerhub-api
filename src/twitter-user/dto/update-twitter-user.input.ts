import { CreateTwitterUserInput } from './create-twitter-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTwitterUserInput extends PartialType(CreateTwitterUserInput) {
  @Field(() => Int)
  id: number;
}
