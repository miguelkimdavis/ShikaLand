import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      { path: '**', redirectTo: '' }
];
