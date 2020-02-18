import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { Product } from 'src/app/shared/classes/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  adminData: string;

  adminProducts: Array<IProduct> = [];
  productID: number;
  productCategoryID: number = 1;
  productCategoryName: string = 'pizza';
  productName: string;
  productDescription: string;
  productPrice: number;
  editStatus: boolean;

  constructor(private prService: ProductsService) { }

  ngOnInit() {
    // this.getAdminData();
    this.getProducts();
  }

  private getProducts(): void {
    this.prService.getJSONProducts().subscribe(
      data => {
        this.adminProducts = data;
      }
    );
  }

  addProduct(): void {
    const newP: IProduct = new Product(1,
      this.productCategoryID,
      this.productCategoryName,
      this.productName,
      this.productDescription,
      this.productPrice);
    if (this.adminProducts.length > 0) {
      newP.id = this.adminProducts.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {
      this.prService.postJSONProducts(newP).subscribe(
        () => {
          this.getProducts();
        }
      );

    }
    else {
      newP.id = this.productID;
      this.prService.updateJSONProduct(newP).subscribe(
        () => {
          this.getProducts();
        }
      );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteProduct(product: IProduct): void {
    this.prService.deleteJSONProducts(product.id).subscribe(
      () => {
        this.getProducts();
      }
    );
  }

  editProduct(product: IProduct): void {
    console.log(product)
    this.productName = product.name;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productID = product.id;
    this.editStatus = true;
  }
  resetForm(): void {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
  }



  // private getAdminData(): void {
  //   this.adminData = this.prService.getData();
  // }

}
