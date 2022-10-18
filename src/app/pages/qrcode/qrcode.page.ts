import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  clase: any = [
    {
      id_clase: 1,
      nombre: 'Doctrina social de la iglesia',
      sigla: 'PFC040',
      profesor: 'Profesor'
    },

    {
      id_clase: 2,
      nombre: 'Calidad de software',
      sigla: 'CSY4111',
      profesor: 'Profesor'
    },
    {
      id_clase: 3,
      nombre: 'Programacion de APP',
      sigla: 'PGY4121',
      profesor: 'Profesor'
    }

    ];
  clases: any[] = [];
  //VAMOS A CREAR LAS VARIABLES PARA NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';
  dateDay = '';
  
  constructor() { }

  ngOnInit() {
    
  }

  //método para generar un código unico para el codigo QR:
  generarCodigo(value){
  
      this.value =  value;
    
  }
  obtenerDia(){
    const today = new Date();
    const date = today.toDateString();
    return date;
}
}
