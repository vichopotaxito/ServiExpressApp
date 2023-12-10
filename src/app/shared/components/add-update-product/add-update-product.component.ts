import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  @Input() product: product

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  firebaseSbc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
    if(this.product) this.form.setValue(this.product);
  }

  //========== Toma/Selecciona una foto ==========

async  takeImage(){
    const DataUrl = (await this.utilsSvc.takePicture('Imagen del Producto')).dataUrl;
    this.form.controls.image.setValue(DataUrl);
  }

  submit(){
    if (this.form.valid) {
      
      if(this.product) this.updateProduct();
      else this.createProduct()
    }
  }

  //==== Convierte Valores de tipo string a number ====
  setNumberInputs(){
    
    let { soldUnits, price } =this.form.controls;
    if(soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value));
    if(price.value) price.setValue(parseFloat(price.value));
  }

// ==== Crear Producto ====

 async createProduct() {

      let path = `users/${this.user.uid}/products`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      // == Subir la imagen y obtener url ==

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSbc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id

    this.firebaseSbc.addDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Producto creado exitosamente',
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

// ==== Actualizar Producto ====
  async updateProduct() {

      let path = `users/${this.user.uid}/products/${this.product.id}`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      // == Si cambio imagen, subir nueva y obtener url ==
      if(this.form.value.image !== this.product.image){
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSbc.getFilePath(this.product.image);
        let imageUrl = await this.firebaseSbc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);
      }

      delete this.form.value.id

    this.firebaseSbc.updateDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Producto actualizado exitosamente',
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
