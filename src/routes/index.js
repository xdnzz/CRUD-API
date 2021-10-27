import {Switch} from 'react-router-dom';

import Route from './Route'

import Login from '../pages/login'
import Cadastrar from '../pages/cadastrar'
import Recuperar from '../pages/recuperar';
import Renderizar from '../pages/renderizar'



export default function Routes(){
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/cadastrar" component={Cadastrar}/>
            <Route exact path="/recuperar" component={Recuperar}/>
            <Route exact path="/feed" component={Renderizar} />
        </Switch>
    )
}