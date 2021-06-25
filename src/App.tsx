import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {NewRoom} from "./pages/NewRoom";
import {Home} from "./pages/Home";

import {AuthContextProvider} from '../src/contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/> {/*//o exact indica q essa pagina só vai abrir caso seja digitado exatamente "/"*/}
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
