/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  products: any
  productsFire: any
  cantidad: number
  total: number
  copia: any
  private proCarrito2: Product[] = []
  producto: Product = new Product()
  constructor(private productsService: ProductsService,private router: Router) {
    this.cantidad=1
  }
  ngOnInit() {
    this.products=this.productsService.getCarrito();

  }
  borrar(pro: Product){
    this.productsService.borrarCarrito(pro)

  }
  data(event: any, product: Product){


    this.cantidad=event.target.value
    console.log(this.cantidad)

    this.copia=product
    product.cantidad=this.cantidad
    console.log(product)
    console.log(this.products)

  }
  comprar(){
    this.proCarrito2=this.products
    this.proCarrito2.forEach((element,index)=>{
      element.stock=element.stock-element.cantidad
      element.cantidad=0

   });
   console.log(this.products)
   console.log(this.proCarrito2)
   this.proCarrito2.forEach((element,index)=>{
    this.productsService.updateProduct(element)
 });
 Swal.fire({
  heightAuto: false,
  position: 'center',
  icon: 'success',
  title: 'Se a relizado con exito la compra',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonColor: '#3085d6',

  confirmButtonText: 'OK'
}).then((result) => {
  if (result.isConfirmed) {
    this.productsService.limpiar()
    console.log("redirigir")
    this.router.navigate(['/list']);
  }
})

  }





}
