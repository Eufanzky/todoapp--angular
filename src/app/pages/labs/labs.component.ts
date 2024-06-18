import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio',
  ];
  name = 'Eugene'; 
  age = 18;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person = {
    name: 'Eugene',
    age: '18',
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  }

  clickHandler() {
    alert('hi there :D');
  }

  changeHandler(event: Event) {
    console.log(event);
  }
}