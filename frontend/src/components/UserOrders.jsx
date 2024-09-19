import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const UserOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/user/orders', {
          withCredentials: true
        })
        setOrders(response.data)
      } catch (error) {
        console.error('Error al obtener las órdenes:', error)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div>
      <h2>Mis Compras</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Orden ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Productos</th>
            <th>Método de Pago</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id_order}>
              <td>{order.id_order}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.total_amount}</td>
              <td>
                {order.items.map(item => (
                  <div key={item.id_product}>
                    {item.name} x{item.quantity} - ${item.price}
                  </div>
                ))}
              </td>
              <td>{order.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserOrders
