import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles:[]
})
export class ConfirmarComponent {

  constructor(private dialogRef:MatDialogRef<ConfirmarComponent>, @Inject(MAT_DIALOG_DATA) public data: Heroe){ //Para pasarle la info del heroe del componente Agregar para que muestre el nombre del heroe que queremos borrar
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data);
  }

  borrar(){
    this.dialogRef.close(true);
  }
  cerrar(){
    this.dialogRef.close();
  }
}
