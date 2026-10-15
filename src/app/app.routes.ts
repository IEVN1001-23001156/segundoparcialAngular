import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'formularios',
        children:[
            {
                path:'usuarios',
                loadComponent:()=>
                    import('./formularios/usuarios/usuarios').then(
                        (c)=>c.Usuarios
                    ),
            },
           {
                path: 'zodiaco',
                loadComponent: () => import('./formularios/zodiaco/zodiaco').then(c => c.ZodiacoComponent)
           },
           {
                path: 'zodiaco-lista',
                loadComponent: () => import('./formularios/zodiaco-lista/zodiaco-lista').then(c => c.ZodiacoListaComponent)
           }
            ]
    },
    {
        path: 'escuela',
        children:[
            {
                path:'listaAlumnos',
                loadComponent:()=>
                    import('./escuela/lista-alumnos/lista-alumnos').then(
                        (c)=>c.ListaAlumnos
                    ),
            },
        ]
    },
    {
        path:'', redirectTo: 'formularios/zodiaco', pathMatch:'full'
    },
    {
        path:'**', redirectTo: 'formularios/zodiaco'
    },
];