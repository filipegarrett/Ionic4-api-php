import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  usuarios: any = [];
  limit: number = 15;
  start: number = 0;
  stuff: any;
  login: string;

  constructor(private postProvider: PostProvider, private router: Router, private storageHome: Storage, public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storageHome.get('session_storage').then((res) => {
      this.stuff = res;
      this.login = this.stuff.login;

    });
    this.usuarios = [];
    this.start = 0;
    this.carregarUsuario();
    
  }

  async logout() {
    this.storageHome.clear();
    const toast = await this.toastController.create({
      message: 'Sessão encerrada',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/login'])
  }

  adicionarUsuario(){
    this.router.navigate(['/adicionar-usuario']);
  }

  atualizarUsuario(id, nome, descricao){
    this.router.navigate(['/adicionar-usuario/'+ id + '/' + nome + '/' + descricao]);
  }

  mostrarUsuario(id, nome, descricao){
    this.router.navigate(['/mostrar-usuario/'+ id + '/' + nome + '/' + descricao]);
  }

  doRefresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any){
    this.start += this.limit;
    setTimeout(() => {
      this.carregarUsuario().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  excluirUsuario(id){

    let body = {
      acao: 'delete',
      id_usuario: id,

    };
    this.postProvider.postData(body, 'api.php').subscribe(data =>{
      this.ionViewWillEnter();         
    });

  }

  carregarUsuario(){
    return new Promise(resolve => {
      let body = {
        acao: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postProvider.postData(body, 'api.php').subscribe(data =>{
        for(let usuario of data.result){
          this.usuarios.push(usuario);
        }
        resolve(true);         
      });
    });
  }
}
