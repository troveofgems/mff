import React, { /*useState, useEffect*/ } 	from 'react';
//import { /*useDispatch,*/ useSelector } from "react-redux";

import Notification from "../../layout/Notification";

const HomeFeature = () => {
  //const
    //dispatch = useDispatch(),
    //userLogin = useSelector(state => state.userLogin),
    //{ loading: authLoading, error: authError, auth } = userLogin;

  const notificationMessage = (`
    All Is Good, In The Application Neighborhood. Any News like site maintenance or major 
    oceanic conservation milestones will end up here!
  `);

  return (
    <>
      <div style={{minWidth: '1200px'}}>
        <h3>Welcome!</h3>
        <Notification children={notificationMessage} />
      </div>
    </>
  )
}

export default HomeFeature;