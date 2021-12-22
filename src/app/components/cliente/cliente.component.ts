import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {

  clientes :ClienteModel[]=[];

  constructor( private clienteServices: ClienteService) { }

  ngOnInit(): void {
    this.clienteServices.obtenerClientes().subscribe(resp =>{
    this.clientes = resp;
    })
  }
  

  borradCliente( cliente: ClienteModel, i:number){
      Swal.fire({
        title:'Estas seguro?',
        text:`Estas seguro de querer borrar a ${cliente.nombre}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then( resp =>{
        if (resp.value) {
           this.clientes.splice(i, 1);
           this.clienteServices.borrarCliente(cliente.id).subscribe();
        }
      })

  }
   
}
