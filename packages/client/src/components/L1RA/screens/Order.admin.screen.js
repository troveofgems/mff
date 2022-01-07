import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Table} from "react-bootstrap";

import {getAllOrdersForAdmin} from "../../../redux/actions/admin.actions";

const handleMarkOrderShipped = oid => {
  let confirmation =
    prompt(
      `Are You Sure You Want To Mark This Order As Shipped? 
        Copy & Paste The Following Id to continue: ${oid}`
    );
  if (confirmation === oid) {
    console.log("Proceed With Shipping Update");
  }
};

const handleCancelOrder = oid => {
  let confirmation =
    prompt(
      `Are You Sure You Want To Cancel This Order? 
        Copy & Paste The Following Id to continue: ${oid}`
    );
  if (confirmation === oid) {
    console.log("Proceed With Delete");
  }
};

const OrderScreen = () => {
  const
    dispatch = useDispatch(),
    allOrders = useSelector(state => state.allOrders),
    {listOfOrders} = allOrders;

  useEffect(() => {
    dispatch(getAllOrdersForAdmin('someToken'));
  }, [dispatch]);

  return (
    <>
      <h2 className={'text-center my-5'}>Admin Order Portal</h2>
      <Col md={6} className={"mb-2"}>
        <input placeholder={"Order Id Search"} className={"w-75"} maxLength={100}/>
      </Col>
      <Table striped bordered hover responsive className={'table-sm bg-light'}>
        <thead>
        <tr>
          <th className={"bg-transparent"}>Order Id</th>
          <th className={"bg-transparent"}>Checkout Type</th>
          <th className={"bg-transparent"}>Order Placed On</th>
          <th className={"bg-transparent"}>Total Order Cost</th>
          <th className={"bg-transparent"}>Shipped On</th>
          <th className={"bg-transparent"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {listOfOrders && listOfOrders.length > 0 ? (
          <>
          {listOfOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.isGuestCheckout ? 'Guest Checkout' : 'Authenticated'}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalCost}</td>
                <td>{!order.isDelivered ? 'Not Shipped' : order.deliveredAt}</td>
                <td style={{cursor: "pointer"}}>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                            onClick={() => handleMarkOrderShipped(order._id)}
                    >
                      <i className="fas fa-list"/>{' '}
                      Review Invoice
                    </button>
                  </div>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                            onClick={() => handleMarkOrderShipped(order._id)}
                    >
                      <i className="fas fa-truck"/>{' '}
                      Mark As Shipped
                    </button>
                  </div>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                            onClick={() => handleCancelOrder(order._id)}
                    >
                      <i className="fas fa-ban" />{' '}
                      Cancel Order
                    </button>
                  </div>
                </td>
              </tr>
          ))
          }
          </>
        ) : (
          <h3>No Orders To Display</h3>
        )}
        </tbody>
      </Table>
    </>
  );
};

export default OrderScreen;
