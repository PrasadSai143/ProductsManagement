import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `${environment.BASE_URL}product`;
  constructor(private httpClient: HttpClient) { }

  loadProducts() {
    return this.httpClient.get(`${this.baseUrl}/getproducts`);
  }

  addProduct(product: any, file: File){
    const formData = new FormData();
    formData.append("fileup", file);
    formData.append("name", product.name);
    formData.append("price", product.price);
    return this.httpClient.post(`${this.baseUrl}/createproduct`,formData);
  }
 
}
