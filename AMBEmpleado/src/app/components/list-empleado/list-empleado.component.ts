import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'estadoCivil', 'fechaIngreso', 'telefono', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>;
  listEmpleados: Empleado[] = [];
  



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(private _empleadoService: EmpleadoServiceService, public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  agregarEmpleado() {
    this.router.navigate(['add']); 
  }

  cargarEmpleados() {
    this.listEmpleados = this._empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editarEmpleado(index: number) {
    this.router.navigate(['edit/' + index]);

  }

  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      data: {mensaje: '¿Está seguro que desea eliminar el empleado?'},
    }); 

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this._empleadoService.eliminarEmpleado(index);

      this.cargarEmpleados();
      this.snackBar.open('El empleado fue eliminado exitosamente','', {
        duration: 3000
      });
      }
      
    });

    

  }

}
