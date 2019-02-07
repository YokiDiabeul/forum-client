import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import {PostComponent} from './post/post.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {RegisterComponent} from './register/register.component';
import {TopicPostsComponent} from './topic-posts/topic-posts.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'p/:slug',
    component: PostComponent
  },
  {
    path: 't/:name',
    component: TopicPostsComponent
  },
  {
    path: 'create-post',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

export const routing = RouterModule.forRoot(appRoutes, routerOptions);
