import React from 'react';
import './App.css';
import  AllUsers  from './components/all-users/all-users.component';
import Reimbursements from './components/all-reimbursements/all-reimbursements.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import { SignIn } from './components/sign-in/signin.component';
import  ReimbursementsByStatus  from './components/status-reimbursements/status-reimbursements.components';
import { SubmitReimbursements } from './components/submit-reimbursement/submit-reimbursement.component';
import { Pokemon } from './components/pokemon/pokemon.component';
import  ReimbursementsById  from './components/userid-reimbursements/userid-reimbursements.component';
import Profile from './components/profile.component/profile.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="App">
    <NavComponent />
    {/* The switch will only render the first route to match */}
    <Switch>
      <Route path ="/home" component = {HomeComponent}/>
      <Route path ="/sign-in" component = {SignIn}/>
      <Route path ="/allusers" component = {AllUsers}/>
      <Route path ="/profile" component = {Profile}/>
      <Route path ="/reimbursements" component = {Reimbursements}/>
      <Route path ="/byuser" component = {ReimbursementsById}/>
      <Route path ="/pending" component = {ReimbursementsByStatus}/>
      <Route path ="/newrequest" component = {SubmitReimbursements}/>
      <Route path ="/pokemon" component = {Pokemon}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
