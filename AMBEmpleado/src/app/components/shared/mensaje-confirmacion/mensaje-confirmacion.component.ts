import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent implements OnInit {
  mensaje: string;
  btn = 'aceptar';

  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      this.mensaje = data.mensaje;

     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }   

}
