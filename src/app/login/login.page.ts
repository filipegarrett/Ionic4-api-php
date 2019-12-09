import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;
  senha: string;

  constructor(private postProvider: PostProvider, private router: Router, public toastController: ToastController, private storage: Storage) { }

  ngOnInit() {
  }

  criarContaUsuario(){
    this.router.navigate(['/cadastro']);
  }

  async realizaLogin(){

    if(this.login != "" && this.senha != ""){
      let body = {
        acao: 'login',
        login: this.login,
        senha: this.senha,
      };
      this.postProvider.postData(body, 'api.php').subscribe(async data => {
        var mensagemAlerta = data.msg;
        console.log(data.success);
        if(data.success){
          this.storage.set('session_storage', data.result);

          this.router.navigate(['/usuario']);
          const toast = await this.toastController.create({
            message: 'Login realizado com sucesso',
            duration: 2000
          });
          toast.present();
          this.login = "";
          this.senha = "";
        }else{
          const toast = await this.toastController.create({
            message: mensagemAlerta,
            duration: 2000
          });
          toast.present();
        }
      });
    }else{
      const toast = await this.toastController.create({
        message: 'Você precisa informar login e senha!',
        duration: 2000
      });
      toast.present();
    }
    this.login = "";
    this.senha = "";
  }
}
