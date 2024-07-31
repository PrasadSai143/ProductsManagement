import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('closebutton', { static: true }) closebutton!: ElementRef;
  productList: Product[] = [];
  isVendorUser: boolean = false;
  file: any;
  productForm!: FormGroup;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      photo: [],
    });
    let user = JSON.parse(this.authService.getUser());
    this.isVendorUser = JSON.parse(user).isVendorUser;
    this.loadProducts();
  }

  loadProducts() {
    this.productList = [];
    this.productService.loadProducts().subscribe({
      next: (data: any) => {
        console.log(data.data);
        const productsObj = data.data;
        productsObj.forEach((item: any) => {
          let product = new Product(
            item.id,
            item.name,
            item.photo,
            item.price,
            item.isBidClosed
          );
          this.productList.push(product);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  saveProduct() {
    console.log(this.productForm.value);
    this.productService
      .addProduct(this.productForm.value, this.file)
      .subscribe((x) => {
        this.closebutton.nativeElement.click();
        this.productForm.reset();
        this.loadProducts();
      });
  }
}