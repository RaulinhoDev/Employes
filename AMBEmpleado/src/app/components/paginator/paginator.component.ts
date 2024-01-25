import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ListEmpleadoComponent } from '../list-empleado/list-empleado.component';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor(private _listEmpleadoComponent : ListEmpleadoComponent) {
   
   }

  ngOnInit(): void {
    //ListEmpleadoComponent.dataSource. = this.paginator;
  }

}
