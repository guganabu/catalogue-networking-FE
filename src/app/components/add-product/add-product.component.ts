import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onAddProduct(addProductForm) {
    console.log('addProductForm', addProductForm);
    const productData = addProductForm.value;
    productData.owner = '15510443';
    this.productService.addProduct(productData).subscribe((addedProduct) => {
      console.log('addedProduct', addedProduct);
    })
  }

}
