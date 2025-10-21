import { Routes } from '@angular/router';
import { PatientComponent } from './pages/patient-component/patient-component';
import { PatientEditComponent } from './pages/patient-component/patient-edit-component/patient-edit-component';
import { MedicComponent } from './pages/medic-component/medic-component';
import { ProductComponent } from './pages/product/product';
import { ProductEditComponent } from './pages/product-edit/product-edit';

export const routes: Routes = [
    // Rutas de pacientes
    { 
        path: 'pages/patient', 
        component: PatientComponent 
    },
    { 
        path: 'pages/patient/new', 
        component: PatientEditComponent 
    },
    { 
        path: 'pages/patient/edit/:id', 
        component: PatientEditComponent 
    },

    // Rutas de médicos
    { 
        path: 'pages/medic', 
        component: MedicComponent 
    },

    // Rutas de productos
    { 
        path: 'products', 
        component: ProductComponent 
    },
    { 
        path: 'products/new', 
        component: ProductEditComponent 
    },
    { 
        path: 'products/edit/:id', 
        component: ProductEditComponent 
    },

    // Redirecciones
    { 
        path: '', 
        redirectTo: 'pages/patient', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: 'pages/patient' 
    }
];