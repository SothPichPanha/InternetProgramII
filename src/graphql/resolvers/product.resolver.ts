import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from '../../product/product.service';
import { CategoriesService } from '../../category/category.service';
import { Product } from '../../product/entities/product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  async getProducts() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  async getProduct(@Args('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId', { type: () => Number }) categoryId: number,
    @Args('rating', { nullable: true }) rating?: number,
    @Args('size', { nullable: true }) size?: string,
    @Args('images', { nullable: true }) images?: string,
    @Args('promotionAsPercentage', { nullable: true }) promotionAsPercentage?: number,
  ) {
    return this.productService.create({
      title: name,
      price,
      categoryId: categoryId,
      rating: rating ?? 0,
      size: size ?? '',
      image: images ?? '',
      promotionAsPercentage: promotionAsPercentage ?? 0,
      instock: 0,
      countSold: 0,
    });
  }

  @ResolveField('category')
  async category(@Parent() product: Product) {
    return this.categoryService.findOne(product.categoryId);
  }
}