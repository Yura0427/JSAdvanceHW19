import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  view:IProduct;

  constructor(private prServise: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getData()
  }

  getData():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.prServise.getOneProduct(id).subscribe(
      data =>{
        this.view = data;
      }
    )
  }
}
