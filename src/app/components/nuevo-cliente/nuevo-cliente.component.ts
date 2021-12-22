import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
})
export class NuevoClienteComponent implements OnInit {
  cliente = new ClienteModel();
  idCliente: any = '';
  constructor(
    private clienteServices: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.paramMap.get('id');

    if (this.idCliente !== 'nuevo') {
      this.clienteServices
        .obtenerCliente(this.idCliente)
        .subscribe((resp: any) => {
          this.cliente = resp;
          this.cliente.id = this.idCliente;
          console.log(resp);
        });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('fomrulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.isLoading();

    let peticion: Observable<any>;

    if (this.cliente.id) {
      peticion = this.clienteServices.actualizarCliente(this.cliente);
    } else {
      peticion = this.clienteServices.crearCliente(this.cliente);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.cliente.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success',
      });
    });
  }

  limpiarCampos(){
    this.cliente = new ClienteModel()
  }
}



