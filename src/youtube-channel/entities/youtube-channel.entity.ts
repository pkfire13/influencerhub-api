import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class YoutubeChannel {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  subscriberCount: string;

  @OneToOne(() => Influencer, (influencer) => influencer.youtubeChannel)
  @Field((type) => YoutubeChannel, { nullable: true })
  influencer: Influencer;
}
