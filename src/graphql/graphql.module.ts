import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

// ✅ import your existing modules/services
import { CategoriesModule } from '../category/category.module';
import { ProductsModule } from '../product/product.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}