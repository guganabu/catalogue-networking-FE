import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Service method to fetch users by given query
  fetchUsers(userQuery = '') {
    return this.http.get(this.server + '/user/list' + userQuery);
  }

  //Service method to add selected items into personal wishlist
  addItemsToWishlist(wishlistItems) {
    return this.http.post(this.server + '/user/wishlist',wishlistItems);
  }
}
