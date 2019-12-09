import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.page.html',
  styleUrls: ['./adicionar-usuario.page.scss'],
})
export class AdicionarUsuarioPage implements OnInit {

  nomeUsuario: string = "";
  descricaoUsuario: string = "";
  id: number;

  constructor(private postProvider: PostProvider, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) =>{
      this.id = data.id;
      this.nomeUsuario = data.nome;
      this.descricaoUsuario = data.descricao;
    });
  }

  criarUsuario(){
    return new Promise(resolve => {
      let body = {
        acao: 'add',
        nomeUsuario: this.nomeUsuario,
        descricaoUsuario: this.descricaoUsuario,
      };
      this.postProvider.postData(body, 'api.php').subscribe(data =>{
        this.router.navigate(['/usuario']);
        console.log("OK");
      });
    });
  }

  atualizarUsuario(){
    return new Promise(resolve => {
      let body = {
        acao: 'update',
        id_usuario: this.id,
        nomeUsuario: this.nomeUsuario,
        descricaoUsuario: this.descricaoUsuario,
      };
      this.postProvider.postData(body, 'api.php').subscribe(data =>{
        this.router.navigate(['/usuario']);
        console.log("OK");
      });
    });

  }

}
