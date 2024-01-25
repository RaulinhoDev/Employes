import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';



@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadosCiviles: string[] = ['Soltero/a', 'Casado/a', 'Divorciado/a'];
  accion = 'Crear';
  public idEmpleado: number = Number(this.aRoute.snapshot.paramMap.get('/id'));
  
   
  myForm: FormGroup
  constructor(private router: Router, private fb: FormBuilder, private _empleadoService: EmpleadoServiceService,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) {

    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['',[Validators.required]]

    }); 
   }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.editarEmpleado();
    }
  }

  onBack() {
    this.router.navigate(['list']);
  }
  
  guardarEmpleado() {

    const nombreCompleto = this.myForm.get('nombreCompleto')?.value;
  const correo = this.myForm.get('correo')?.value;
  const fechaIngreso = this.myForm.get('fechaIngreso')?.value;
  const telefono = this.myForm.get('telefono')?.value;
  const estadoCivil = this.myForm.get('estadoCivil')?.value;
  const sexo = this.myForm.get('sexo')?.value;

  if (nombreCompleto != null && correo != null && fechaIngreso != null && telefono != null && estadoCivil != null && sexo != null) {
    // Crea el objeto Empleado

    const empleado: Empleado = {
      nombreCompleto: nombreCompleto,
      correo: correo,
      fechaIngreso: fechaIngreso,
      telefono: telefono,
      estadoCivil: estadoCivil,
      sexo: sexo
    }

    if(this.idEmpleado !== undefined) {
      this.editEmpleado(empleado);
    } else {
      this.agregarEmpleado(empleado);

    }
    
    
  }
}

agregarEmpleado(empleado: Empleado) {
  this._empleadoService.agregarEmpleado(empleado);
  this.snackBar.open('El empleado fue registrado exitosamente','', {
    duration: 3000
  });
  this.router.navigate(['/']);
}

editEmpleado(empleado: Empleado) {
  this._empleadoService.editEmpleado(empleado, this.idEmpleado);
  this.snackBar.open('El empleado fue actualizado exitosamente','', {
    duration: 3000
  });
  this.router.navigate(['/']);

}

editarEmpleado() {
  const Empleado: Empleado = this._empleadoService.getEmpleadoEdit(this.idEmpleado);
  console.log(Empleado);
  this.myForm.patchValue({
    nombreCompleto: Empleado.nombreCompleto,
    correo: Empleado.correo,
    fechaIngreso: Empleado.fechaIngreso,
    telefono: Empleado.telefono,
    estadoCivil: Empleado.estadoCivil,
    sexo: Empleado.sexo,


  })
}

}
