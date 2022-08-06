/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { element } from 'protractor';
import { Product } from '../domain/product';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { docSnapshots, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsCollection: AngularFirestoreCollection<Product>;
  private products: any;
  private prod: Product = new Product()
  private proCarrito: Product[] = []

  constructor(private afs: AngularFirestore,private firestore: Firestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
  }
  addProduct(product: Product) {
    this.productsCollection.add(Object.assign({}, product));
  }
  updateProduct(product: Product): Promise<void>{
    const documento =  doc(this.firestore, 'products', product?.id);
    const { ...data} = product; // Eliminamos el id
    return setDoc(documento, data);
  }
  addProduct2(product: Product) {
    const id = this.afs.createId();
    product.id = id;
    this.productsCollection.doc(id).set(Object.assign({}, product));
  }

  getProducts() {
    return this.products;
  }

  getProductPrice(price: number) {
    return this.afs.collection<Product>('products',
      ref => ref.where('price', '>', price)).valueChanges();
  }

  //carrito
  saveCarrito(product: Product){
    console.log("Servicio")
    this.proCarrito.push(product)

  }
  getCarrito(){
    return this.proCarrito
  }
  borrarCarrito(product: Product){
    this.proCarrito.forEach((element,index)=>{
      if(element==product){
        this.proCarrito.splice(index,1);
      }

   });

    }
  limpiar(){
    this.proCarrito= []
  }



}
