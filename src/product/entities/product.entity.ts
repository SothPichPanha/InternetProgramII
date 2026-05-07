import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('product')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'float' })
  rating?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  promotionAsPercentage?: number;

  @Field()
  @Column()
  categoryId: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  instock: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  countSold: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  group?: string;
}
