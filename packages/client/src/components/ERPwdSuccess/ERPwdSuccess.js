import React from 'react';
import {Link} from "react-router-dom";

const ERPwdSuccess = () => {
  return (
    <>
      <div className={"text-center m-5 bg-dark bg-gradient"} style={{borderRadius: "15px"}}>
        <h2 className={"py-5 pb-0"}>You Have Successfully Reset Your Password</h2>
        <p>Login <Link to='/login'>Here</Link></p>
      </div>
    </>
  );
};

export default ERPwdSuccess;