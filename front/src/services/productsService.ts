import http from "@/http/axios";
import IProduct from '@/interfaces/IProduct'

class ProductsService {
  getAll() {
    return http.get("/grocery");
  }

  getFavorites() {
    return http.get(`/grocery?favorite=1`);
  }

  get(id: string) {
    return http.get(`/grocery/${id}`);
  }

  create(data: IProduct) {
    return http.post("/grocery", data);
  }

  update(id: string, data: IProduct) {
    return http.put(`/grocery/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/grocery/${id}`);
  }

  deleteAll() {
    return http.delete(`/grocery`);
  }
}

export default new ProductsService();