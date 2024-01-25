import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  listEmpleado: Empleado[] = [
    { nombreCompleto: 'Raul Eduardo Quiroz', correo: 'raul.quiroz@reqm.com', telefono: 89604614,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Soltero/a'  },

      { nombreCompleto: 'Julio Cesar de Leon', correo: 'julio.leon@reqm.com', telefono: 89600000,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Casado/a'  },

      { nombreCompleto: 'David Suazo', correo: 'david.suazo@reqm.com', telefono: 89668227,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Casado/a'  },

      { nombreCompleto: 'Ana Maria Suazo', correo: 'maria.suazo@reqm.com', telefono: 89660000,
      sexo: 'Femenino', fechaIngreso: new Date(), estadoCivil: 'Casado/a'  },

      { nombreCompleto: 'Nelson Osmany Quiroz', correo: 'nelson.quiroz@reqm.com', telefono: 99879900,
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Soltero/a'  },
  ];

  getEmpleados() {
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleado.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleado.push(empleado);
  }

  getEmpleadoEdit(index: number) {
    return this.listEmpleado[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number) {
    this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto,
    this.listEmpleado[idEmpleado].correo = empleado.correo,
    this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso,
    this.listEmpleado[idEmpleado].telefono = empleado.telefono,
    this.listEmpleado[idEmpleado].estadoCivil = empleado.estadoCivil,
    this.listEmpleado[idEmpleado].sexo = empleado.sexo

  }

  constructor() { }
}
