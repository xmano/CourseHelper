import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import {Camera, File, Transfer, FilePath} from 'ionic-native';

declare var cordova: any;
 
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  title;
  description;
  type;
  lastImage: string = null;
  
  constructor(public navCtrl: NavController, public view: ViewController,
    public toastCtrl: ToastController) {
    this.type = 0;
  }
  
  clickPic() {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {

        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

    }, (err) => {
      console.log('Error while selecting image.');
    });

  }
  
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }  
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }  
  
 
  saveItem() {
    let newItem = {
      title: this.title,
      description: this.description,
      type: this.type
    };
 
    this.view.dismiss(newItem);
  }
 
  close(){
    this.view.dismiss();
  }
}