import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTwitterUserInput {
  @Field()
  twitterHandle: string

  @Field()
  followers: number
}
