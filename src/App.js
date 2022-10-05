import './App.css';
import { BrowserRouter } from 'react-router-dom'
import RouteApp from './services/routes';
import AuthProvider from './Contexts/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ToastContainer autoClose={3000} position='top-center' theme='dark' />
        <BrowserRouter>
          <RouteApp></RouteApp>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
