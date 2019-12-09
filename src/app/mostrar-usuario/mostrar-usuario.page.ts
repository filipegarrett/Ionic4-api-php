import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.page.html',
  styleUrls: ['./mostrar-usuario.page.scss'],
})
export class MostrarUsuarioPage implements OnInit {

  nomeUsuario: string;
  descricaoUsuario: string;
  id: number;

  constructor(private postProvider: PostProvider, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) =>{
      this.id = data.id;
      this.nomeUsuario = data.nome;
      this.descricaoUsuario = data.descricao;
    });
  }

}
