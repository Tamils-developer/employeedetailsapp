import React, { useEffect, useState } from 'react';
import { createMedia } from '@artsy/fresnel';
import { Container, Menu } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { activeMenu, nextMenu } from '../reduxComp/slice';
import SubmissionComp from '../component/EmployeeDataBase/SubmissionComp';
import EmployeeDetailsComponent from '../component/EmployeeDataBase/EmployeeDetailsComponent';
import ContactDetailsComponent from '../component/EmployeeDataBase/ContactDetailsComponent';
import BankDetailsComp from '../component/EmployeeDataBase/BankDetailsComp';
import EducationalComp from '../component/EmployeeDataBase/EducationalComp';
import ExperienceComp from '../component/EmployeeDataBase/ExperienceComp';
import NomineeComp from '../component/EmployeeDataBase/NomineeComp';
import DocumentsUpload from '../Document_upload/DocumentsUpload';


const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});

const menuList = new Set();
const MenuItem = () => {
  const active = useSelector(activeMenu)
  const dispatch = useDispatch<any>()

  // const handleItemClick = (e: any, {name}:any) => setActiveItem(name);
  const [activeItem, setActiveItem] = useState('Basic Details')
  menuList.add(active)

  const menuEnable = (e: any, { name }: any) => {
    var selected = name;
    {
      menuList.forEach((val: any) => {
        var key = val;
        if (selected === key) {
          setActiveItem(selected)
          dispatch(nextMenu(selected))
        }
      })
    }
  }

  useEffect(() => {
    setActiveItem(active)
  }, [active])

  return (
    <div >
      <Container>
      <div className="scrolling content">
        <Menu  pagination pointing secondary fluid >
          <Menu.Item
            name='Basic Details'
            active={activeItem === 'Basic Details'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Contact Details'
            active={activeItem === 'Contact Details'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Education Details'
            active={activeItem === 'Education Details'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Bank Details'
            active={activeItem === 'Bank Details'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Documents Upload'
            active={activeItem === 'Documents Upload'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Work Experiece'
            active={activeItem === 'Work Experiece'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Nominee Details'
            active={activeItem === 'Nominee Details'}
            onClick={menuEnable}
            color='red'
          />
          <Menu.Item
            name='Submission'
            active={activeItem === 'Submission'}
            onClick={menuEnable}
            color='red'
          />
        </Menu>
  </div>
        <div>
          {activeItem === 'Basic Details' ? <EmployeeDetailsComponent /> : ''}
          {activeItem === 'Contact Details' ? <ContactDetailsComponent /> : ''}
          {activeItem === 'Documents Upload' ? <DocumentsUpload /> : ''}
          {activeItem === 'Work Experiece' ? <ExperienceComp /> : ''}
          {activeItem === 'Education Details' ? <EducationalComp /> : ''}
          {activeItem === 'Bank Details' ? <BankDetailsComp /> : ''}
          {activeItem === 'Nominee Details' ? <NomineeComp /> : ''}
          {activeItem === 'Submission' ? <SubmissionComp /> : ''}
        </div>
      </Container>
    </div>
  )
}

export default MenuItem