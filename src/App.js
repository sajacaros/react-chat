import {useEffect} from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import firebase from './firebase';

function App() {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        history.push('/')
      } else {
        history.push('/login')
      }
    });
  }, [history])
  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/register" component={RegisterPage}/>
    </Switch>
  );
}

export default App;
