/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  products: any
  producto: Product = new Product()
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products=this.productsService.getProducts();
  }

  guardar(pro: Product){
    this.productsService.saveCarrito(pro)
    console.log(pro)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se ha agregado al carrito',
      showConfirmButton: false,
      timer: 1500,
      heightAuto: false
    })
  }



}
