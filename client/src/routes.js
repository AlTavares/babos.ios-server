
import Plants from './plants';
import PlantView from './plants/view'

export default [
  { path: '/', title: 'Home', component: Plants, nav: true },
  { path: '/plants', title: 'Plantas', component: Plants, nav: true },
  { path: '/plant/:id', title: 'Plantas', component: PlantView }
  
];
