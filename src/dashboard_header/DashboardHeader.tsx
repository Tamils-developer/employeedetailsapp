import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import Logo from '../asssets/advento-logo-1.png'
import { useAuth } from '../login_dashboard/AuthProvider'
import { nextMenu } from '../reduxComp/slice'

const DashboardHeader = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "").username
  const { logout }: any = useAuth()
  const dispatch = useDispatch<any>();

  const userLogout = () => {
    logout()
    dispatch(nextMenu('Basic Details'))
  }

  return (
    <div>
      <Menu fixed='top' borderless color='red'  className="fixMenu">
          <Menu.Item as='a' header className='menu' >
            <Image size='mini' src={Logo} style={{ marginRight: '1.5em', width: '15em' }} />
          </Menu.Item>
          <Menu.Menu position='right' className="rowMenus">
            <Menu.Item position='right'>{userId}</Menu.Item>
            <Menu.Item position='right' className="rowMenus">
              <Dropdown icon='user'>
                <Dropdown.Menu>
                  <Dropdown.Item text='dashboard' as={NavLink} to="/loginDashboard"/>
                  {/* <Dropdown.Item text='My account' /> */}
                  {/* <Dropdown.Item text='settings' /> */}
                  <Dropdown.Item text='Logout' onClick={userLogout} />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    </div>
  )
}

export default DashboardHeader;