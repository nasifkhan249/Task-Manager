import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import NewPage from "./pages/NewPage";
import ProgressPage from "./pages/ProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CanceledPage from "./pages/CanceledPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
// import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";

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
          </Routes>
        </BrowserRouter>
        {/*<FullscreenLoader/>*/}
      </Fragment>
  );
};

export default App;