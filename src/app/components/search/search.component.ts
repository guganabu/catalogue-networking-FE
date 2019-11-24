import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searchBy: String = 'title';
  private searchResults: Array<any>;
  private isShowAddWishlist: Boolean = false;
  constructor(private productService: ProductService, private userService: UserService) {

  }

  ngOnInit() {
    this.fetchProducts();
    this.findUser();
  }

  // Action triggered while selecting search by selector
  onSelectSearchBy(searchBy) {
    this.searchBy = searchBy;
    console.log('this.searchBy', this.searchBy)
  }

  //Action triggered when select a product item
  onSelectProduct(product) {
    product.isSelected = !product.isSelected;
    this.isShowAddWishlist = this.searchResults.filter( product => product.isSelected).length ? true : false;
  }

  //Acton triggered when add products into personal wishlist
  onAddPersonalWishlist() {
    const component = this;
    const products = component.searchResults;
    console.log('products in add', products)
    const productsToAddWishlist = products.filter(product => product.isSelected);
    console.log('productsToAddWishlist', productsToAddWishlist);
    const userWishlistItems = []
    productsToAddWishlist.map(product => {
      userWishlistItems.push({
        product_key: product.product_key,
        title: product.title,
        user_id: '',
        user_name: ''
      });
    });
    console.log('userWishlistItems', userWishlistItems)
    component.userService.addItemsToWishlist(userWishlistItems).subscribe();
  }

  //key press event handler
  onKeyDown(event) {
    const component = this;
    if(event.keyCode == 13) {
      let searchKey = event.target.value;
      component.fetchProducts(searchKey)
    }
  }

  //Method to fetch products based on the given key
  fetchProducts(searchKey = null) {
    const component = this;
    const searchBy = this.searchBy;
    let filterQuery = null;
    if (searchKey !== null && searchKey !== '') {
      filterQuery = `${searchBy === 'isbn' ? 'product_key' : 'title'}=${searchKey}`;
    }
    component.productService.searchProducts(filterQuery).subscribe((products: Array<any>) => {
      console.log('products', products);
      component.searchResults = products;
    })
  }

  //method to fetch an user
  findUser() {
    const component = this;
    const userQuery = `?user_id=18227295`;
    component.userService.fetchUsers(userQuery).subscribe((user) => {
      const userData = user[0];
      const localStorage = window.localStorage;
      localStorage.setItem('active_user', JSON.stringify(userData));
    })
  }

}
