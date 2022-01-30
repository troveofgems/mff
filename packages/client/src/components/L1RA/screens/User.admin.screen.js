import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Table} from "react-bootstrap";
import {getAllUsersForAdmin, adminDeleteUserById} from "../../../redux/actions/admin.actions";
import Loader from "../../layout/Loader";

const UserScreen = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    allUsers = useSelector(state => state.allUsers),
    userDeleted = useSelector(state => state.userDeleted),
    userLogin = useSelector(state => state.userLogin),
    {listOfUsers, loading} = allUsers,
    {loading: loadingDeleteUser} = userDeleted,
    { auth: { authLevel: loggedInUsersAuthLevel } } = userLogin;

  useEffect(() => {
    dispatch(getAllUsersForAdmin('someToken'));
  }, [dispatch, loadingDeleteUser]);

  const handleDeleteUser = uid => {
    let confirmation =
      prompt(
        `Are You Sure You Want To Delete This User? 
        Copy & Paste The Following Id to continue: ${uid}`
      );
    if (confirmation === uid) {
      console.log("Proceed With Delete");
      dispatch(adminDeleteUserById(uid));
    }
  };

  const handleEditUser = uid => navigate('/l1ra/users/edit', { state: uid });

  return (
    <>
      <h2 className={'text-center my-5'}>Admin User Portal</h2>
      <Row>
        <Col md={6}>
          <input placeholder={"User Search"} className={"w-75 mb-2"} maxLength={100}/>
        </Col>
      </Row>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
      <Table striped bordered hover responsive className={'table-sm bg-light'}>
        <thead>
        <tr>
          <th className={"bg-transparent"}>ID</th>
          <th className={"bg-transparent"}>NAME</th>
          <th className={"bg-transparent"}>EMAIL</th>
          <th className={"bg-transparent"}>USER TYPE</th>
          <th className={"bg-transparent"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {listOfUsers && listOfUsers.length > 0 ? (
          <>
            {listOfUsers.map(user => (
              <tr key={user.currentEmail}>
                <td>
                  {user.authLevel === 10 || user.authLevel === 100 ? "-" : `${user._id}`}
                </td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.currentEmail}</td>
                <td>
                  {
                    <>
                      {user.authLevel === 10 && "ASU"}
                      {user.authLevel === 100 && "ADMIN"}
                      {user.authLevel === 1000 && "AUDITOR"}
                      {user.authLevel === 2000 && "USER"}
                    </>
                  }
                </td>



                <td style={{cursor: "pointer"}}>
                  {/*Refine This*/}
                  {loggedInUsersAuthLevel === 10 && user.authLevel !== 10 && (
                    <>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"} onClick={() => handleEditUser(user._id)}>
                          <i className="fas fa-edit"/>{' '}
                          Edit User
                        </button>
                      </div>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"}
                                onClick={() => handleDeleteUser(user._id)}
                        >
                          <i className="fas fa-trash-alt" />{' '}
                          Delete User
                        </button>
                      </div>
                    </>
                  )}
                  {loggedInUsersAuthLevel === 100 && user.authLevel !== 10 && user.authLevel !== 100 && (
                    <>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"} onClick={() => handleEditUser(user._id)}>
                          <i className="fas fa-edit"/>{' '}
                          Edit User
                        </button>
                      </div>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"}
                                onClick={() => handleDeleteUser(user._id)}
                        >
                          <i className="fas fa-trash-alt" />{' '}
                          Delete User
                        </button>
                      </div>
                    </>
                  )}
                  {loggedInUsersAuthLevel === 1000 && user.authLevel !== 10 && user.authLevel !== 100 && (
                    <>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"} onClick={() => handleEditUser(user._id)}>
                          <i className="fas fa-edit"/>{' '}
                          Edit User
                        </button>
                      </div>
                      <div className={"m-2"}>
                        <button type={"button"} className={"text-dark"}
                                onClick={() => alert('Request Denied: You An Auditor.')}
                        >
                          <i className="fas fa-trash-alt" />{' '}
                          Delete User
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
            }
          </>
        ) : (
          <tr>
            <td>
              No Users To Display
            </td>
          </tr>
        )}
        </tbody>
      </Table>
        )}
    </>
  );
};

export default UserScreen;