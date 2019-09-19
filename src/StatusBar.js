import React from "react";
import { NavLink} from 'react-router-dom';


const StatusBar = () => {
    return (
        <ul className="navBar">
        <li data-name="all" >
        <NavLink to="/" exact activeClassName="active">All</NavLink> 
        </li>
        <li data-name="done">
        <NavLink to="/completed" activeClassName="active">Completed</NavLink> 
        </li>
        <li data-name="new">
        <NavLink to="/pending" activeClassName="active">Pending</NavLink> 
        </li>
        </ul>
        )
    }
    
    export default StatusBar;
    
    
    
    