import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ValidacionesService } from './validaciones.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variables a utilizar:
  datos: any[] = [];
  dato: any;

  clase: any = [
    {
      id_clase: 1,
      nombre: 'Doctrina social de la iglesia',
      sigla: 'AA11',
      profesor: 'Profesor'
    },

    {
      id_clase: 2,
      nombre: 'Matematicas',
      sigla: 'AA12',
      profesor: 'Profesor'
    },
    {
      id_clase: 2,
      nombre: 'Otra Clase',
      sigla: 'AA13',
      profesor: 'Profesor'
    }

  ];

  usuarios: any[] = [
    {
      rut: '11.222.333-4',
      nombre: 'Admin',
      ap_paterno: 'istrador',
      fecha_nac: '1990-12-24',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    },{
      rut: '18.888.333-3',
      nombre: 'Alumno',
      ap_paterno: 'Uno',
      fecha_nac: '1990-06-10',
      correo: 'alumno@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    },
    {
      rut: '18.541.304-7',
      nombre: 'Profesor',
      ap_paterno: 'Uno',
      fecha_nac: '1994-06-12',
      correo: 'profesor@duocuc.cl',
      clave: 'profesor',
      tipo_usuario: 'profesor'
    }
  ];

  asistencia: any = [
    {
      id_asistencia: '',
      id_clase: this.clase.id_clase,
      fecha: new Date(),
      alumno: []
    }
  ]
 //VAMOS A CREAR UNA VARIABLE QUE SE ENCARGUE DE SABER SI ESTOY LOGUEADO O NO:
 isAuthenticated = new BehaviorSubject(false);
  constructor(private storage: Storage, private validaciones: ValidacionesService) {
    storage.create();

    var admin = {
      rut: '11.222.333-4',
      nombre: 'Admin',
      ap_paterno: 'istrador',
      fecha_nac: '1990-12-24',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    };

    this.agregarPersona("personas", admin);
/* 
    var clase1 = 
      {
        id_clase: 1,
        nombre: 'Doctrina social de la iglesia',
        sigla: 'AA11',
        profesor: 'Profesor'
      };
      this.agregarClase("clases", clase1); */
    }
  
  
  //métodos del crud del storage:

  //metodos de persona
  async agregarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoPersona(key, dato.rut);
    if (this.dato == undefined) {

      this.datos.push(dato)
      await this.storage.set(key, this.datos)
      return true;
    }
    return false;
  }

  async getDatoPersona(key, identificador) {
    this.dato = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.rut == identificador);
    return this.dato;
  }

  async eliminarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.rut == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }

  async getDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }
  
  async actualizarPersona(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  //metodos de clase

  async agregarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoClase(key, dato.id_clase);
    if (this.dato == undefined) {

      this.datos.push(dato)
      await this.storage.set(key, this.datos)
      return true;
    }
    return false;
  }

  async getDatoClase(key, identificador) {
    this.dato = await this.storage.get(key) || [];
    this.dato = this.datos.find(clase => clase.id_clase == identificador);
    return this.dato;
  }



  //profesor
  async getClases(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }


  
//METODO PARA VALIDAR LOGIN


loginUsuario(correo, clave) {
  var usuarioLogin: any;
  usuarioLogin = this.usuarios.find(usu => usu.correo == 'administrador@duoc.cl' && usu.clave == 'administrador');
  if (usuarioLogin != undefined) {
    
    this.isAuthenticated.next(true);
    return usuarioLogin;
  }

  
}
getAuth(){
  return this.isAuthenticated.value;
}
validarCorreo(correo){
  return this.usuarios.find(usu => usu.correo == correo);
}

}
