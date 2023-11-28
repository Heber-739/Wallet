import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { DashGuard } from './guards/dash.guard';


const routes: Routes = [
    { path: 'login',canMatch:[LoginGuard], loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule) },
    {
        path: 'dashboard',
        canMatch:[DashGuard],
        loadChildren: ()=> import('./main/main.module').then((m)=>m.MainModule)
    },
    { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
