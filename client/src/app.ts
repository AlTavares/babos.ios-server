import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Home';
    config.map([
      { route: ['', 'plants'], name: 'plants', moduleId: './plants', nav: true, title: 'Plantas' }
    ]);

    this.router = router;
  }
}
