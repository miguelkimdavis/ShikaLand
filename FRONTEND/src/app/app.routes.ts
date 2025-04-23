import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'user', loadChildren:() => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path:'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path:'', redirectTo:'/user', pathMatch:'full'
    }
];
