import Menu from './Menu';
import Restaurants from './Restaurants';
import NotFound from './NotFound.jsx';
import Checkout from './Checkout.jsx';

const routes = [
  { path: '/restaurants', component: Restaurants },
  { path: '/menu/:id', component: Menu },
  { path: '/checkout', component: Checkout },
  { path: '*', component: NotFound },
];

export default routes;
