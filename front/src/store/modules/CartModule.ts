import vue from 'vue';
import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators'

import IProduct from '@/interfaces/IProduct'

config.rawError = true;

@Module({ namespaced: true})
class CartModule extends VuexModule {
  public cartProducts: IProduct[] = [];

  @Mutation
  public addProductCart(product: IProduct): void {
    const productIndex = this.cartProducts.findIndex(item => item.id === product.id);

    if( productIndex === -1 ) {
        product.amount = 1;
        this.cartProducts.push(product)
        return;
    }
    const itemToUpdate = this.cartProducts[productIndex];
    if( itemToUpdate && itemToUpdate.amount ) {
        itemToUpdate.amount ++;
        vue.set(this.cartProducts, productIndex, itemToUpdate)
    }
    
  }

  @Mutation
  public removeProductCart(product: IProduct): void {
    const productIndex = this.cartProducts.findIndex(item => item.id === product.id);

    if( productIndex === -1 ) {
        return;
    }
    const itemToUpdate = this.cartProducts[productIndex];
    if( itemToUpdate && itemToUpdate.amount) {
        if(itemToUpdate.amount === 1){
            itemToUpdate.amount --;
            vue.delete(this.cartProducts, productIndex)
            return;
        }
        itemToUpdate.amount --;
        vue.set(this.cartProducts, productIndex, itemToUpdate)
    }
    
  }


  get allCartProducts(): IProduct[] {
    return this.cartProducts;
  }

  @Action
  public addProduct(product: IProduct): void {
    this.context.commit('addProductCart', product);
  }

  @Action
  public removeProduct(product: IProduct): void {
    this.context.commit('removeProductCart', product);
  }

}
export default CartModule