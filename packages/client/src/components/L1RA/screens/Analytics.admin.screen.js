import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HomeFeature from "../../UserProfile/features/home.feature";
import ProfileFeature from "../../UserProfile/features/profile.feature";
import LoginFeature from "../../UserProfile/features/login.feature";
import SettingsFeature from "../../UserProfile/features/settings.feature";
import Demographics from "../../Analytics/Demographics";


const AnalyticsScreen = () => {
  return (
    <>
      <h2 className={'text-center my-5'}>App Analytics</h2>
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
              Demographics
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
                <Demographics />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AnalyticsScreen;