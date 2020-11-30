import './App.css';
import DeliveriesList from './components/DeliveriesList';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Menus from './components/Menus';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <DeliveriesList />
      <Menus />
    </Provider>
  );
}

export default App;
