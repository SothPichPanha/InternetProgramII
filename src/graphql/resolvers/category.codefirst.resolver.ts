import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CategoriesService } from '../../category/category.service';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoryType])
  categories() {
    return this.categoriesService.findAll();
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    return this.categoriesService.create({ name } as any);
  }
}