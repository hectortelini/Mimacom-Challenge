import store from '@/store'
import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators'
import ProductsService from '@/services/productsService'

import IProduct from '@/interfaces/IProduct'

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
  public async loadProducts(): Promise<any> {
    await ProductsService.getAll().then((response: any) => {
      this.context.commit('setProducts', response.data)
      console.log(response.data)
    }).catch((error: any) => {
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
  public async loadFavoriteProducts(): Promise<any> {
    console.log('favorites')
    await ProductsService.getFavorites().then((response: any) => {
      this.context.commit('setProducts', response.data)
      console.log(response.data)
    }).catch((error: any) => {
      console.log(error)
    })
  }

  @Action
  public async loadProduct(id: string): Promise<any> {
    await ProductsService.get(id).then((response: any) => {
      this.context.commit('setProduct', response.data)
      console.log(response.data)
    }).catch((error: any) => {
      console.log(error)
    })
  }
}
export default ProductsModule