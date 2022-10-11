import { Component } from "@angular/core";

@Component({
    selector:'app-footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.scss']
})
export class FooterComponent {

    public autor:any = {nombre:'Estefani', apellido:'Paredes'};
}
