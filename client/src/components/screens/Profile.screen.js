import React from 'react';
//import Loader from "../layout/Loader";
import {useSelector} from "react-redux";
import HomeFeature from "../UserProfile/features/home.feature";
import ProfileFeature from "../UserProfile/features/profile.feature";
import LoginFeature from "../UserProfile/features/login.feature";
import SettingsFeature from "../UserProfile/features/settings.feature";

const ProfileScreen = () => {
  const
    userLogin = useSelector(state => state.userLogin),
    userViewProfile = useSelector(state => state.userViewProfile),
    {loading: loadingProfile, error: viewProfileError, success: viewProfileSuccess, user} = userViewProfile,
    {auth} = userLogin;

  return (
    <>
      <div className="d-flex align-items-start">
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button className="nav-link text-white active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
                  type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"
          >
            Home
          </button>
          <button
            className="nav-link text-white" id="v-pills-profile-tab" data-bs-toggle="pill"
            data-bs-target="#v-pills-profile" type="button" role="tab"
            aria-controls="v-pills-profile" aria-selected="false"
          >
            Profile
          </button>
          <button className="nav-link text-white" id="v-pills-messages-tab" data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
                  aria-selected="false"
          >
            Login
          </button>
          <button className="nav-link text-white" id="v-pills-settings-tab" data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                  aria-selected="false">Settings
          </button>
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
               aria-labelledby="v-pills-home-tab">
            <div className={"content-wrapper"} style={{width: '100%'}}>
              <HomeFeature />
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
               aria-labelledby="v-pills-profile-tab">
            <div className={"content-wrapper"} style={{width: '100%'}}>
              <ProfileFeature />
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-messages" role="tabpanel"
               aria-labelledby="v-pills-messages-tab">
            <div className={"content-wrapper"} style={{width: '100%'}}>
              <LoginFeature />
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-settings" role="tabpanel"
               aria-labelledby="v-pills-settings-tab">
            <div className={"content-wrapper"} style={{width: '100%'}}>
              <SettingsFeature />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
