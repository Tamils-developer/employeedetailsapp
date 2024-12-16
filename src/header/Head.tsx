import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import Logo from '../asssets/advento-logo-1.png'
import "./HeadCss.css";

const Head = () => {
    return(
  <div>
    <Menu fixed='top' borderless color='red' className="fixMenu" >    
        <Menu.Item as='a' header className='menu' id="imageDiv">
          <Image size="mini" src={Logo} style={{ marginRight: '1.5em', width:'15em' }}  />
        </Menu.Item>
        <Menu.Menu position='right' className="rowMenus">
            <Menu.Item as={NavLink} to='/'>Home</Menu.Item>
            <Menu.Item as='a'>ABOUT US</Menu.Item>
            <Menu.Item as='a'>Services</Menu.Item>
            <Menu.Item as='a'>Contact Us</Menu.Item>
            <Menu.Item as={NavLink} to='/login'>Login</Menu.Item>
        </Menu.Menu>   
    </Menu>
    </div>
    )
}

export default Head;