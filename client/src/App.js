import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter , Switch , Route} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'
import Target from './components/Target';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path = '/home' component = {HomePage}/>
          <Route exact path = '/' component = {LoginPage} />
          <Route path = '/register' component = {RegisterPage} />  
          <Route path = '/title/:id' component = {Target} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
