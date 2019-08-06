import React from 'react';

import { Link } from 'react-router-dom';

import RevLogo from '../../assets/trvlchnl-logo.png';



export class NavComponent extends React.Component {

  render() {

    return (

      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">

        <div className="navbar-header c-pointer shift-left">

          <Link to="/home" className="unset-anchor">

            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />

          </Link>

        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>

        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">

          <ul className="navbar-nav ml-auto margin-nav">

            <li className="nav-item active">

              <Link to="/home" className="unset-anchor nav-link">Home</Link>

            </li>

            <li className="nav-item active">

              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>

            </li>

            <li className="nav-item active">

              <Link to="/allusers" className="unset-anchor nav-link">All Users</Link>

            </li>

            <li className="nav-item active">

              <Link to="/reimbursements" className="unset-anchor nav-link">View Reimbursements</Link>

            </li>

            <li className="nav-item active">

              <Link to="/profile" className="unset-anchor nav-link">Profile</Link>

            </li>

            <li className="nav-item active dropdown">

              <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reimbursements</div>

              <div className="dropdown-menu" aria-labelledby="examples-dropdown">

                <div className="dropdown-item"><Link to="/pending" className="unset-anchor nav-link active">View By Status</Link></div>

                <div className="dropdown-item"><Link to="/byuser" className="unset-anchor nav-link active">View By Employee</Link></div>

                <div className="dropdown-item"><Link to="/newrequest" className="unset-anchor nav-link active">New Request</Link></div>

              </div>

            </li>

          </ul>

        </div>

      </nav>

    );

  }

}