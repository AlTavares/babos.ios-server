import App from './app';
import routes from './routes';
import Layout from './layout';
import environment from './services/environment'

environment.setup()

export const reducers = {
  title: state => state
};

export const initialState = {
  title: 'WebPlantas'
};

App({ reducers, initialState, Layout, routes }).render();
