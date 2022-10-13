import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
          }
        )
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}