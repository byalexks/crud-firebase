import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { map } from 'rxjs/operators';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = 'https://crud-example-26fbe-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearCliente(cliente: ClienteModel) {
    return this.http.post(`${this.url}/Customers.json`, cliente).pipe(
      map((resp: any) => {
        cliente.id = resp.name;
        return cliente;
      })
    );
  }

  actualizarCliente(cliente: ClienteModel) {
    const clienteTemp = {
      ...cliente,
    };

    delete clienteTemp.id;

    return this.http.put(
      `${this.url}/Customers/${cliente.id}.json`,
      clienteTemp
    );
  }

  borrarCliente(id: String){
    return this.http.delete(`${this.url}/Customers/${id}.json`)
  }

  obtenerClientes() {
    return this.http
      .get(`${this.url}/Customers.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(clientesObj: any) {
    const clientes: ClienteModel[] = [];

    Object.keys(clientesObj).forEach((key) => {
      const cliente: ClienteModel = clientesObj[key];
      cliente.id = key;
      clientes.push(cliente);
    });

    if (clientesObj === null) {
      return [];
    }
    return clientes;
  }

  obtenerCliente( id : String) {
    return this.http
      .get(`${this.url}/Customers/${id}.json`)
  
  }
}
