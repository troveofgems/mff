import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
// Routes
import setMainRoutes from "./router/routes/main.routes";
import setL1RARoutes from "./router/routes/l1ra.routes";
// Pages
import LostPage from "./components/404page/404Page";
// Component Styles
import './styles/App.css';

const AppRoutes = () => {
  const ADMIN_MARKER = "appAdmin";
  const
    [isLoggedIn, setIsLoggedIn] = useState(false),
    [isAdmin, setIsAdmin] = useState(false),
    userLoginData = useSelector(state => state.userLogin),
    {loading: loadingUser, error: errorLoadingUser, auth: userDetails} = userLoginData;

  useEffect(() => {
    if (!loadingUser && !errorLoadingUser) {
      setIsLoggedIn(true);
      if (userDetails && userDetails.userRole === ADMIN_MARKER) {
        setIsAdmin(true);
      }
    }
  }, [loadingUser, errorLoadingUser, userDetails]);

  return (
   <Routes>
     {/*MAIN*/ setMainRoutes(isLoggedIn)}
     {/*L1RA*/ setL1RARoutes(isLoggedIn, isAdmin)}
     {/*E-404*/}
     <Route path="*" element={<LostPage />}/>
   </Routes>
  );
};

export default AppRoutes;