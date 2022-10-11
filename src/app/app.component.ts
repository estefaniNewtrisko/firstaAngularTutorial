import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  curso:string ="Curso SPring 5 con ANgular 7";
  profesor: string = 'Estefani';
}
