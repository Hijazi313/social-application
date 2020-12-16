import React,{useState, useContext} from "react"
import { Menu } from 'antd';

import {Link, useHistory} from "react-router-dom"

import {AuthContext} from "../../context/auth";



const Header = ()=>{
  let history = useHistory()
    const {user, logout} = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substring(1);
    const [currentItem, setCurrentItem] = useState(path)

  const handleClick = e => {
    setCurrentItem(e.key)
  };
  const logoutUser = ()=> {
    history.push('/')
    logout()
  } 
const menuBar = user  ? ( <Menu onClick={handleClick} selectedKeys={currentItem} mode="horizontal"  >
        <Menu.Item key="home"  >
          <Link to="/" >Home</Link>
        </Menu.Item>
        <Menu.Item key="profile" >
            <Link to="/profile" >Profile</Link>
        </Menu.Item>
        <Menu.Item key="Logout" onClick={logoutUser}  >
            Logout
        </Menu.Item>
      </Menu>):( <Menu onClick={handleClick} selectedKeys={currentItem} mode="horizontal"  >
<Menu.Item key="home"  >
  <Link to="/" >Home</Link>
</Menu.Item>
<Menu.Item key="register" >
    <Link to="/register" >Register</Link>
</Menu.Item>
<Menu.Item key="login"  >
    <Link to="/login"  >Login</Link>
</Menu.Item>
</Menu>);

    return menuBar
  }
export default Header