import React, { useState } from 'react'
import UserCRUD from '../components/UserCrud'
import ProductCRUD from '../components/ProductCrud'
import Report from '../components/Report'
import { Container, Row, Col, Nav } from 'react-bootstrap'


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <Container className='my-5'>
      <Row>
        <Col>
          <h2>Panel de Administración</h2>
          <Nav
            variant='tabs'
            defaultActiveKey='users'
            onSelect={selectedKey => setActiveTab(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey='users'>Usuarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='products'>Productos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='report'>Reporte</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className='mt-4'>
            {activeTab === 'users' && <UserCRUD />}
            {activeTab === 'products' && <ProductCRUD />}
            {activeTab === 'report' && <Report />}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
