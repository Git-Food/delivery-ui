import Menu from './Menu';
import Restaurants from './Restaurants';
import NotFound from './NotFound.jsx';

const routes = [
  { path: '/restaurants', component: Restaurants },
  { path: '/restaurants/:id', component: Menu },
  { path: '*', component: NotFound },
];

export default routes;
