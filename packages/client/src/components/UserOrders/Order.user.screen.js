import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import {Table} from "react-bootstrap";

import {getAllOrdersForUser} from "../../redux/actions/order.actions";

const UserOrderScreen = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    listUserOrders = useSelector(state => state.listUserOrders),
    userLogin = useSelector(state => state.userLogin),
    {userOrderList} = listUserOrders,
    { auth: { token } } = userLogin;

  useEffect(() => {
    dispatch(getAllOrdersForUser(token));
  }, [dispatch]);

  return (
    <>
      <h2 className={'text-center my-5'}>My Orders</h2>
      <Col md={6} className={"mb-2"}>
        <input placeholder={"Order Id Search"} className={"w-75"} maxLength={100}/>
      </Col>
      <Table striped bordered hover responsive className={'table-sm bg-light'}>
        <thead>
        <tr>
          <th className={"bg-transparent"}>Order Id</th>
          <th className={"bg-transparent"}>Order Placed On</th>
          <th className={"bg-transparent"}>Total Order Cost</th>
          <th className={"bg-transparent"}>Shipped On</th>
          <th className={"bg-transparent"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {userOrderList && userOrderList.length > 0 ? (
          <>
          {userOrderList.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalCost}</td>
                <td>{!order.isDelivered ? 'Not Shipped' : order.deliveredAt}</td>
                <td style={{cursor: "pointer"}}>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                      onClick={() => navigate(`/myOrders/invoice/${order._id}`, {state: order._id})}
                    >
                      <i className="fas fa-list"/>{' '}
                      Review Invoice
                    </button>
                  </div>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}>
                      <i className="far fa-question-circle"/>{' '}
                      Contact Support
                    </button>
                  </div>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}>
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
          <h3 className={"text-center"}>You Have No Orders To Display</h3>
        )}
        </tbody>
      </Table>
    </>
  );
};

export default UserOrderScreen;
