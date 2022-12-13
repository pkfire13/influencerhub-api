import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Influencer } from "src/influencer/entities/influencer.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TwitchChannel {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column()
  @Field()
  broadcasterId: string

  @Column()
  @Field()
  displayName: string

  @Column()
  @Field()
  followerCount: number

  @Column()
  @Field()
  subscriberCount: number

  @OneToOne(() => Influencer, (influencer) => influencer.twitchChannel)
  @Field((type) => Influencer, {nullable: true})
  influencer: Influencer
}
