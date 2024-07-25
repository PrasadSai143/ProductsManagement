import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.BASE_URL;
  SERVICE_URL = `${this.baseUrl}/uploadfile`;
  constructor(private httpClient: HttpClient) { }

  loadProducts() {
    return this.httpClient.get(`${this.baseUrl}/getproducts`);
  }

  // http://127.0.0.1:8000/createproduct
  addProduct(product: any, file: File){
    const formData = new FormData();
    formData.append("fileup", file);
    formData.append("name", product.name);
    formData.append("price", product.price);
    return this.httpClient.post(`${this.baseUrl}/createproduct/`,formData);
  }

  uploadFile(file:File){
    let formParams = new FormData();
    formParams.append('file', file)
    return this.httpClient.post(this.SERVICE_URL, formParams)
  }

  getFile(filename: string){
    return this.httpClient.get(`${this.SERVICE_URL}/${filename}`);
  }
 
}
