import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { dashboardRoutes } from './dashboard/dashboard.routes';
import { LoginGuard } from './guards/login.guard';
import { DashGuard } from './guards/dash.guard';


const routes: Routes = [

    { path: 'login', component: LoginComponent,canActivate:[LoginGuard] },
    { path: 'register', component: RegisterComponent,canActivate:[LoginGuard] },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate:[DashGuard]
    },
    { path: '**', redirectTo: '' }
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
