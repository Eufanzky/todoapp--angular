import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  person = signal({
    name: 'Eugene',
    age: 19,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  })

  colorCtrl = new FormControl();

  constructor () {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
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
  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }
  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {...prevState,
      age: parseInt(newValue)}
    });
  }
}