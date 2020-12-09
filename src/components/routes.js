import Menu from './Menu';
import Restaurants from './Restaurants';
import Orders from './Orders';
import NotFound from './NotFound.jsx';
import Checkout from './Checkout.jsx';

// TODO (shh): modify orderhistory route to include userID.
const routes = [
  { path: '/restaurants', component: Restaurants },
  { path: '/menu/:id', component: Menu },
  { path: '/checkout', component: Checkout },
  { path: '/orders', component: Orders },
  { path: '*', component: NotFound },
];

export default routes;
