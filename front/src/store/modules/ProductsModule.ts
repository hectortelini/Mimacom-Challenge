import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators'
import ProductsService from '@/services/productsService'

import IProduct from '@/interfaces/IProduct'
import IServerResponse from '@/interfaces/IServerResponse'

config.rawError = true;

@Module({ namespaced: true})
class ProductsModule extends VuexModule {
  public products: IProduct[] = [];
  public product?: IProduct | null = null;

  @Mutation
  public setProducts(newValue: IProduct[]): void {
    this.products = newValue
  }

  @Mutation
  public setProduct(newValue: IProduct): void {
    this.product = newValue
  }

  get allProducts(): IProduct[] {
    return this.products
  }


  @Action
  public async loadProducts(): Promise<void> {
    await ProductsService.getAll().then((response: IServerResponse) => {
      this.context.commit('setProducts', response.data)
    }).catch((error: Error) => {
      console.log(error)
    })
  }

  @Action
  public decreaseStockProduct(id: string): void {
    const product= this.products.find(item => item.id === id);
    if(product) {
      if( product.stock > 0){
        product.stock --
      }
    }
  }

  @Action
  public increaseStockProduct(id: string): void {
    const product= this.products.find(item => item.id === id);
    if(product) {
        product.stock ++
    }
  }

  @Action
  public async loadFavoriteProducts(): Promise<void> {
    await ProductsService.getFavorites().then((response: IServerResponse) => {
      this.context.commit('setProducts', response.data)
    }).catch((error: Error) => {
      console.log(error)
    })
  }

  @Action
  public async loadProduct(id: string): Promise<void> {
    await ProductsService.get(id).then((response: IServerResponse) => {
      this.context.commit('setProduct', response.data)
    }).catch((error: Error) => {
      console.log(error)
    })
  }

  @Action
  public async favoriteProduct(product: IProduct): Promise<void> {
    product.favorite = product.favorite === 0 ? 1 : 0;
    await ProductsService.update(product.id,product).catch((error: Error) => {
      console.log(error)
    })
  }
}
export default ProductsModule