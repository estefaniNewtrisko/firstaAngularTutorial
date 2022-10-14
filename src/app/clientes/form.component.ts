import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  errores: string[];

  constructor(private clientService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { } //inyeccion de dependencias

  ngOnInit(): void {// inicializacion
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {// si existe
        this.clientService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  
  create(): void {
    this.clientService.create(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }




  update(): void {
    this.clientService.update(this.cliente)
      .subscribe({
        next: (json) => {
          this.router.navigate(['/clientes'])
          Swal.fire('Cliente actualizado', `${json.mensaje} : ${json.cliente.nombre}`, `success`)
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('codigo del error desde el backend : ' + err.status);
          console.error(err.error.errors);
        }
      })
  }
}