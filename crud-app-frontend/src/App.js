import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TutorialList from './components/TutorialList';
import Tutorial from './components/Tutorial';
import AddTutorial from './components/AddTutorial';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <p className="h3 text-white mr-3">CRUD APP</p>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/tutorials" className="nav-link h5">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link h5">
              Add Tutorial
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/tutorials/:id" component={Tutorial} />
          <Route exact path={["/", "/tutorials"]} component={TutorialList} />
          <Route exact path="/add" component={AddTutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
