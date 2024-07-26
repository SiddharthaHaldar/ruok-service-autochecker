import { Outlet } from 'react-router-dom'
import {
  GcdsHeader,
  GcdsContainer,
  GcdsFooter,
} from '@cdssnc/gcds-components-react'
import '@cdssnc/gcds-components-react/gcds.css'
import './Layout.css'
import BreadCrumb from '../components/Breadcrumbs'

export default function Layout() {
  return (
    <div className="layout-container">
      <GcdsHeader skipToHref="#main-content" padding="150px" height="auto">
        <div slot="skip-to-nav">
          <a className="skip-to-content-link" href="#main-content">
            Skip to main content
          </a>
        </div>
        <nav slot="menu" style={{ backgroundColor: '#f1f2f3' }}></nav>
      </GcdsHeader>

      <GcdsContainer
        size="xl"
        centered
        color="black"
        style={{
          flexGrow: '1',
        }}
        padding="400"
        id="main-content"
      >
        <BreadCrumb />
        <Outlet />
      </GcdsContainer>

      <GcdsFooter />
    </div>
  )
}
