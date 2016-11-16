
import Plants from './plants/list';
import PlantView from './plants/view'
import PlantEdit from './plants/edit'
import FormLogin from './forms/login'

export default [
  { path: '/', title: 'Home', component: Plants, nav: true },
  { path: '/plants', title: 'Plantas', component: Plants, nav: true },
  { path: '/plant/:id', component: PlantView },
  { path: '/plant/:id/edit', component: PlantEdit },
  { path: '/login', component: FormLogin }
];
