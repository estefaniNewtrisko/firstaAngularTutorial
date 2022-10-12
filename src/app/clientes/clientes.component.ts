import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from "./cliente.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  //atributos
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      cliente => this.clientes = cliente
    );
  }

}
