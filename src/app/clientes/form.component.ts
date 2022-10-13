import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(private clientService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { } //inyeccion de dependencias

  ngOnInit(): void {// inicializacion
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){// si existe
        this.clientService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clientService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, `success`)
      }
      )
  }

  update():void{
    this.clientService.update(this.cliente)
    .subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, `success`)
    })
  }
}