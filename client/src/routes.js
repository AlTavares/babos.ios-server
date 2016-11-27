
import Plants from './plants/list';
import PlantView from './plants/view'
import PlantEdit from './plants/edit'
import FormLogin from './forms/login'
import PlantNew from './plants/edit'

export default [
  { path: '/', title: 'Home', component: Plants, nav: true },
  { path: '/plants', title: 'Plantas', component: Plants, nav: true },
  { path: '/plant/:id', component: PlantNew },
  { path: '/plant/view/:id', component: PlantView },
  { path: '/plant/edit/:id', component: PlantEdit },
  { path: '/login', component: FormLogin }
];
