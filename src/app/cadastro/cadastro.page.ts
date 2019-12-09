import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  login: string = "";
  senha: string = "";
  confirmar_senha: string = "";

  constructor(private postProvider: PostProvider, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  navegaLogin(){
    this.router.navigate(['/login']);
  }

  async cadastrarUsuario(){

    if(this.login == ""){
      const toast = await this.toastController.create({
        message: 'Insira um login válido',
        duration: 2000
      });
      toast.present();
    
    }else if(this.senha == ""){
      const toast = await this.toastController.create({
        message: 'Você precisa informar uma senha',
        duration: 2000
      });
      toast.present();

    }else if(this.senha != this.confirmar_senha){
      const toast = await this.toastController.create({
        message: 'As senhas precisam ser iguais!',
        duration: 2000
      });
      toast.present();
    }else{
      let body = {
        login: this.login,
        senha: this.senha,
        acao: 'register',
      };
      this.postProvider.postData(body, 'api.php').subscribe(async data => {
        var mensagemAlerta = data.msg;
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toastController.create({
            message: 'Conta criada com sucesso',
            duration: 2000
          });
          toast.present();
        }else{
          const toast = await this.toastController.create({
            message: mensagemAlerta,
            duration: 2000
          });
          toast.present();
        }
      });
    }
  }
}
