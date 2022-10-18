import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  //VARIABLES PARA PROBAR EL STORAGE:
  clase: any = [
    {id_clase: 1,
    nombre: 'Doctrina social de la iglesia',
    sigla:'AA11',
    profesor: 'Profesor' },

    {id_clase: 2,
      nombre: 'Matematicas',
      sigla:'AA12',
      profesor: 'Profesor' }

    ];
  clases: any[] = [];

   //LLAVE:
   KEY_CLASES = 'clases';  

   elementType = 'canvas';
   value = '';
  constructor(private storage: StorageService) { }

  async  ngOnInit() {
    await this.cargarPersonas();
    
  }

    //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
    async cargarPersonas(){
      this.clases = await this.storage.getClases(this.KEY_CLASES);
    }

    async buscar(dato){
      this.clase = await this.storage.getDatoPersona(this.KEY_CLASES, dato);
    }

    // iniciar clase

  //método para generar un código unico para el codigo QR:
  generarCodigo(value){
    
      this.value = v4();
    
  }

  
}
