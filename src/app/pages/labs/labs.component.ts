import { Component, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio',
  ]);
  name = signal('Eugene'); 
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
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}