import React from 'react';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const OrderSuccess = () => {
  const
    createOrder = useSelector(state => state.createOrder),
    userLogin = useSelector(state => state.userLogin),
    {order: {orderRefId}} = createOrder,
    { auth } = userLogin;

  return (
    <>
      <div className={"text-center m-5 bg-dark bg-gradient"} style={{borderRadius: "15px"}}>
        <h2 className={"py-5 pb-0"} style={{letterSpacing: ".15rem"}}>Your Order Has Been Successfully Placed!!</h2>
        <div className={"w-50 m-auto d-flex justify-content-around mb-1"}>
          <span style={{fontSize: '2rem'}}>🎉{' '}</span>
          <span style={{fontSize: '1.75rem'}}>🎉{' '}</span>
          <span style={{fontSize: '2rem'}}>🎉{' '}</span>
        </div>
        <p style={{fontSize: "1.5rem", letterSpacing: ".15rem"}}>Next Steps:</p>
        <p className={"m-2"} style={{fontSize: "1.5rem", letterSpacing: ".15rem"}}>Your Order Has Been Received And Will Soon Be Processed.</p>
        <div className={"m-2"}>
            <div className={"mb-3"}
                 style={{fontSize: "1.5rem", letterSpacing: ".15rem"}}
            >
              Your Order Reference Id Is:
            </div>
            <div>
              <span style={{fontSize: "3rem", letterSpacing: ".25rem"}}>{orderRefId}</span>
            </div>
            <div className={"my-3"} style={{fontSize: "1.5rem", letterSpacing: ".25rem"}}>
              Please Keep The above Reference Id For Your Records.
            </div>
          </div>
          <p className={"m-2 pb-4"}
             style={{fontSize: "1.5rem", letterSpacing: ".25rem"}}
          >Thank you For Supporting the Frickn' Fish Team <span style={{fontSize: "1.5rem"}}>😊</span></p>
        {auth && auth.token && (
          <p className={"m-2 pb-4"}
             style={{fontSize: "1.5rem", letterSpacing: ".25rem"}}
          >
            You Can View The Status Of All Of Your Orders{' '}
            <NavLink className={"text-info"} to={"/myOrders"}>Here</NavLink>.
          </p>
        )}
      </div>
    </>
  );
};

export default OrderSuccess;