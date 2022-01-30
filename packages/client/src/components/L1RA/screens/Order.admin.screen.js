import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Loader from "../../layout/Loader";

import Col from 'react-bootstrap/Col';
import {Table} from "react-bootstrap";

import {getAllOrdersForAdmin, adminCancelOrderById, adminMarkOrderShipped} from "../../../redux/actions/admin.actions";

const OrderScreen = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    allOrders = useSelector(state => state.allOrders),
    userLogin = useSelector(state => state.userLogin),
    {listOfOrders, loading} = allOrders,
    { auth } = userLogin;

  useEffect(() => {
    dispatch(getAllOrdersForAdmin(auth.token));
  }, [dispatch]);

  const handleMarkOrderShipped = async oid => {
    let confirmation =
      prompt(
        `Are You Sure You Want To Mark This Order As Shipped? 
        Copy & Paste The Following Id to continue: ${oid}`
      );
    if (confirmation === oid) {
      let token = auth.token; // TODO: Amend This
      console.log("Proceed With Shipping Update");
      await dispatch(adminMarkOrderShipped(token, oid));
      await dispatch(getAllOrdersForAdmin(token));
    }
  };

  const handleCancelOrder = async oid => {
    let confirmation =
      prompt(
        `Are You Sure You Want To Cancel This Order? 
        Copy & Paste The Following Id to continue: ${oid}`
      );
    let token = auth.token;
    if (confirmation === oid) {
      await dispatch(adminCancelOrderById(token, oid));
      await dispatch(getAllOrdersForAdmin(token));
    }
  };

  return (
    <>
      <h2 className={'text-center my-5'}>Admin Order Portal</h2>
      <Col md={6} className={"mb-2"}>
        <input placeholder={"Order Id Search"} className={"w-75"} maxLength={100}/>
      </Col>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <Table striped bordered hover responsive className={'table-sm bg-light'}>
            <thead>
            <tr>
              <th className={"bg-transparent"}>Order Id</th>
              <th className={"bg-transparent"}>Checkout Type</th>
              <th className={"bg-transparent"}>Order Placed On</th>
              <th className={"bg-transparent"}>Total Order Cost</th>
              <th className={"bg-transparent"}>Status</th>
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
                    <td>
                      {order.hasBeenCancelled ? ("Cancelled") : (
                        <>
                          {!order.hasBeenShipped ? 'Waiting To Be Shipped' : 'Shipped'}
                        </>
                      )}
                    </td>
                    <td style={{cursor: "pointer"}}>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"}
                                onClick={() => navigate(`/l1ra/orders/invoice/${order._id}`, {state: {oid: order._id, adminCall: true}})}
                        >
                          <i className="fas fa-list"/>{' '}
                          Review Invoice
                        </button>
                      </div>
                      {(!order.hasBeenCancelled && !order.hasBeenShipped) && (
                        <div className={"m-2"}>
                          <button type={"button"} className={"text-dark"}
                                  onClick={() => handleMarkOrderShipped(order._id)}
                                  disabled={auth.authLevel === 1000}
                          >
                            <i className="fas fa-truck"/>{' '}
                            Mark As Shipped
                          </button>
                        </div>
                      )}
                      {(!order.hasBeenCancelled && !order.hasBeenShipped) && (
                        <div className={"m-2"}>
                          <button type={"button"} className={"text-dark"}
                                  onClick={() => handleCancelOrder(order._id)}
                                  disabled={auth.authLevel === 1000}
                          >
                            <i className="fas fa-ban" />{' '}
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
                }
              </>
            ) : (
              <tr>
                <td>
                  No Orders To Display
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        )}

    </>
  );
};

export default OrderScreen;
