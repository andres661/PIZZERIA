import { Component ,Input} from '@angular/core';
import { ServicioService } from '../services/servicio.service';
import { NgForm } from '@angular/forms';
import { pizza } from '../interface/pizza';



@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
 
})
export class CounterComponent {

  imageSrc;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  sellersPermitString: string;
  DriversLicenseString: string;
  InteriorPicString: string;
  ExteriorPicString: string;
  //json
  finalJson = {};

  constructor(private producto: ServicioService) {}

  Enviar(form: NgForm) {
    if (form.value.id == null) {
      form.value.foto = this.sellersPermitString;
      this.producto.Add(form.value);
    }
    else {
      console.log('entro con id');
     if (this.sellersPermitString) {
         console.log('cargo imagen');
         form.value.foto = this.sellersPermitString;
      }
      this.producto.Update(form.value);

    }
    this.resetForm(form);
  }

  resetForm(form?: NgForm) {

    if (form != null)
          form.reset();
    this.producto.seleccionarProducto = new pizza();
  }

 
/*BASE64  */

  currentId: number = 0;

  addPictures() {
    this.finalJson = {
      "sellersPermitFile": this.ExteriorPicString,
      "DriversLicenseFile": this.DriversLicenseString,
      "InteriorPicFile": this.InteriorPicString,
      "ExteriorPicFile": this.ExteriorPicString
    }
  }
  public picked(event, field, files) {

    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
    
    }
    else {
      alert("No file selected");
    }
  }


  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;
        break;
    }
  }

}
