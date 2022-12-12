import { CreateInfluencerInput } from './create-influencer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { TwitterUser } from "src/twitter-user/entities/twitter-user.entity";

@InputType()
export class UpdateInfluencerInput extends PartialType(CreateInfluencerInput) {
  @Field(() => Int)
  id: number;
}
