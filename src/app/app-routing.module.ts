import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)},
  { path: 'adicionar-usuario', loadChildren: () => import('./adicionar-usuario/adicionar-usuario.module').then( m => m.AdicionarUsuarioPageModule)},
  { path: 'adicionar-usuario/:id/:nome/:descricao', loadChildren: () => import('./adicionar-usuario/adicionar-usuario.module').then( m => m.AdicionarUsuarioPageModule)},
  { path: 'mostrar-usuario/:id/:nome/:descricao', loadChildren: () => import('./mostrar-usuario/mostrar-usuario.module').then( m => m.MostrarUsuarioPageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'cadastro',loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
