import Menu from './Menu';
import Restaurants from './Restaurants';
import OrderHistory from './OrderHistory';
import NotFound from './NotFound.jsx';

// TODO (shh): modify orderhistory route to include userID.
const routes = [
  { path: '/restaurants', component: Restaurants },
  { path: '/menu/:id', component: Menu },
  { path: '/orderhistory', component: OrderHistory },
  { path: '*', component: NotFound },
];

export default routes;
