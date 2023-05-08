import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'items',
        loadChildren: () => import('../items/items.module').then(m => m.ItemsPageModule)
      },
      {
        path: 'start',
        loadChildren: () => import('../start/start.module').then(m => m.StartPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../items/items.module').then(m => m.ItemsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/start',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
