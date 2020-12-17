import Menu from './Menu';
import Restaurants from './Restaurants';
import Orders from './Orders';
import NotFound from './NotFound';
import Checkout from './Checkout';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

// Requires user to be logged in to view
export const privateRoutes = [
  { path: '/checkout', component: Checkout },
  { path: '/orders', component: Orders },
  { path: '/update-profile', component: UpdateProfile },
];

// Does not require user to be logged in to view
export const regularRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/restaurants', component: Restaurants },
  { path: '/menu/:id', component: Menu },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '*', component: NotFound },
];
