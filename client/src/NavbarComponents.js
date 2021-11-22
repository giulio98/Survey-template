import {Navbar, Nav, Button} from 'react-bootstrap' ;
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Logo = (props) => {
    return (
            <Navbar.Brand className="text-light" style={{fontWeight:"bold"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
            </svg>
            Survey
            
            </Navbar.Brand>
            
            ) ;
} ;

const UserIcon = (props) => {
    const [showUserMenu, setShowUserMenu] = useState(false) ;
    return (
            <div id="navbarDropdown" onClick={()=>setShowUserMenu(oldState => !oldState)}>
            <Nav className="ml-sm-auto user-icon">
                <svg className="text-light bi bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </Nav>
            <div className={`dropdown-menu ${showUserMenu?"show":""} dropdown-menu-right`} aria-labelledby="navbarDropdown">
            
            <Link to="/main" style={{ textDecoration: 'none' }}><div className="dropdown-item validity-error" onClick={props.logout}>Logout</div></Link>
            </div>
            </div>
           ) ;
} ;
const SurveyNavbar = (props) => {
    return (
            <Navbar className="d-flex justify-content-between color-nav" variant="dark" sticky="top">
                
                <Link to={`/admin`} style={{ textDecoration: 'none' }} onClick={()=>{ props.cleanAdmin();}}>
                <Logo></Logo>  
                </Link>
                 
                
                <div className="d-flex">
                <UserIcon logout={props.logout}></UserIcon>
                </div>
                
            </Navbar>  
            ) ;
} ;
const UserNavbar = (props) => {
    return (
            <Navbar className="d-flex justify-content-between color-nav" variant="dark" sticky="top">
                
                <Link to={`/main`} style={{ textDecoration: 'none' }}  onClick={()=>{ props.cleanUser();}}>
                <Logo></Logo>  
                </Link>
                
                
                
            </Navbar>  
            ) ;
} ;
const MainPageNavbar = (props) => {
    return (
            <Navbar className="d-flex justify-content-between" variant="light" style={{ border:"0.5px solid black",boxShadow:"0 0 5px black", backgroundColor:"#fafafa!important"}} sticky="top">
                
            <Link to={`/main`} style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{color:"#db4c3f",fontWeight:"bold"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
            </svg>
            Survey
            
            </Navbar.Brand>
            </Link>
                 
                
                <div className="d-flex">
                <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button variant="light" style={{color:"#db4c3f",fontWeight:"bold"}}>Login</Button>
                    </Link>
                </div>
                
            </Navbar>  
            ) ;
} ;
export {SurveyNavbar,MainPageNavbar, UserNavbar} ;