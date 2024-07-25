import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild('closebutton', { static: true }) closebutton!: ElementRef;
  productList: Product[] = [];
  isVendorUser: boolean = false;
  file: any;
  productForm!: FormGroup;
  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      photo: []
    })
    let user: any = JSON.parse(localStorage.getItem("authUser") || '{}');
    if (user.isVendorUser === 1)
      this.isVendorUser = true;
    this.loadProducts();
  }

  loadProducts() {
    this.productList = [];
    this.productService.loadProducts().subscribe((data: any) => {
      console.log(data);
      data.forEach((item: any) => {
        let product = new Product(item.name, item.photo, item.price);
        this.productList.push(product);
      });
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }

  saveProduct() {
    console.log(this.productForm.value);
      this.productService.addProduct(this.productForm.value, this.file).subscribe(
        x => {
          this.closebutton.nativeElement.click();
          this.productForm.reset();
          this.loadProducts();
        }
      );
  }
}