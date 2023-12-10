import { Component, OnInit, inject } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy, where } from 'firebase/firestore'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  firebaseSbc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: product[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  //==== Obtener Ganancias ====
  getProfits(){
    return this.products.reduce((index, product) => index + product.price * product.soldUnits, 0);
  }

  //==== Obtener productos ====
  getProducts(){
    let path = `users/${this.user().uid}/products`;

    this.loading = true;

    let query = [
      orderBy('soldUnits', 'desc'),
      //where('soldUnits', '>', 50)
    ]
    

    let sub = this.firebaseSbc.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })

  }

  //==== Agregar o actualizar producto ====
  async addUpdateProduct(product?: product){

    let success = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })

    if(success) this.getProducts();
  }

  //==== Confirmar la eliminacion ====
  async confirmDeleteProduct(product: product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar producto',
      message: '¿Quieres eliminar este producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });
  
  }

// ==== Eliminar Producto ====
async deleteProduct(product: product) {

  let path = `users/${this.user().uid}/products/${product.id}`

  const loading = await this.utilsSvc.loading();
  await loading.present();

  let imagePath = await this.firebaseSbc.getFilePath(product.image);
  await this.firebaseSbc.deleteFile(imagePath);

this.firebaseSbc.deleteDocument(path).then(async res => {

  this.products = this.products.filter(p => p.id !== product.id);

  this.utilsSvc.presentToast({
    message: 'Producto eliminado exitosamente',
    duration: 1500,
    color: 'success',
    position: 'middle',
    icon: 'checkmark-circle-outline'
  })


}).catch(error =>{
  console.log(error);

  this.utilsSvc.presentToast({
    message: error.message,
    duration: 2500,
    color: 'primary',
    position: 'middle',
    icon: 'alert-circle-outline'
  })

}).finally(() =>{
  loading.dismiss();

})

}

}
