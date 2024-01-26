import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import NewPage from "./pages/NewPage";
import ProgressPage from "./pages/ProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CanceledPage from "./pages/CanceledPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SendOTPPage from "./pages/AccountRecover/SendOTPPage";
import VerifyOTPPage from "./pages/AccountRecover/VerifyOTPPage";
import CreatePasswordPage from "./pages/AccountRecover/CreatePasswordPage";

const App = () => {
  return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage/>}/>
            <Route exact path="/Create" element={<CreatePage/>}/>
            <Route exact path="/All" element={<NewPage/>}/>
            <Route exact path="/Progress" element={<ProgressPage/>}/>
            <Route exact path="/Completed" element={<CompletedPage/>}/>
            <Route exact path="/Canceled" element={<CanceledPage/>}/>
            <Route exact path="/Profile" element={<ProfilePage/>}/>
            <Route path="*" element={<Page404/>}/>



              <Route path="/" element={<Navigate to="/Login" replace />}/>
              <Route exact path="/Login" element={<LoginPage />}/>
              <Route exact path="/Registration" element={<RegistrationPage />}/>

              <Route exact path="/SendOTP" element={<SendOTPPage/>}/>
              <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}/>
              <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}/>

          </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
      </Fragment>
  );
};

export default App;