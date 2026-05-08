import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from '../../category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])  
  async getCategories(id?: number) {
    return await this.categoriesService.findAll();
  }

  @Mutation('createCategory')
  async createCategory(
    @Args('name') name: string,
    @Args('productCount') productCount?: number,
    @Args('color') color?: string,
    @Args('image') image?: string,
  ) {
    try {
      const result = await this.categoriesService.create({
        name,
        productCount: productCount ?? 0,
        color: color ?? '',
        image: image ?? '',
      });
      
      console.log('Created category result:', result);
      
      if (!result) {
        throw new Error('Service returned null');
      }
      
      return result;
    } catch (error) {
      console.error('Error in createCategory:', error);
      throw error;
    }
  }
}