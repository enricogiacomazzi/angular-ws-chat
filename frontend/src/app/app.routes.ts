import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Chat } from './features/chat/chat';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'chat/:username',
        component: Chat,
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
