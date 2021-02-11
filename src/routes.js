import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import queryform from "./components/queryform";
import postanswer from "./components/post_answer";
import getanswer from "./components/getanswer";
import Login from "./components/login";
import Nav1 from "./components/header";
import home from "./components/main";
import querylist from "./components/querylist";
import ans_query from "./components/ans_query";
import dropdown from "./components/dropdown";
import register from "./components/register";
import RouterGuard from "./routerGuard";
import { AuthContext } from "./contextapi/authContext";
import st_button from "./components/st_button";
import st_answeredlist from "./components/st_answeredlist";
import st_querylist from "./components/st_querylist";
import st_register from "./components/st_register";
import st_role from "./components/st_role";
import st_query from "./components/st_query";
import st_login from "./components/st_login";
import button from "./components/button";

const Routes = () => {
  const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;
  // const [isAdmin, setIsAdmin] = useContext(AuthContext).is_admin;

  return (
    <BrowserRouter>
      {isLoggedin ? <Nav1 /> : null}

      <RouterGuard
        path="/queryform"
        exact
        component={queryform}
        auth={!isLoggedin}
        redirect="/login"
      />
      <RouterGuard
        path="/postanswer/:id"
        exact
        component={postanswer}
        auth={!isLoggedin}
        redirect="/login"
      />
      <Route path="/getanswer/:id" exact component={getanswer} />
      <Route
        path="/login"
        exact
        component={Login}
        auth={!isLoggedin}
        redirect="/login"
      />
      <RouterGuard
        path="/"
        exact
        component={home}
        auth={!isLoggedin}
        redirect="/login"
      />
      <RouterGuard
        path="/button"
        exact
        component={button}
        auth={!isLoggedin}
        redirect="/login"
      />
      <Route path="/st_querylist/" exact component={st_querylist} />
      <Route path="/st_answeredlist/" exact component={st_answeredlist} />
      <Route path="/st_button/" exact component={st_button} />
      <Route path="/st_register" exact component={st_register} />
      <Route path="/st_role" exact component={st_role} />
      <Route path="/st_login" exact component={st_login} />
      <Route path="/st_query" exact component={st_query} />
      <Route path="/dropdown" exact component={dropdown} />
      <Route path="/register" exact component={register} />
      <Route path="/querylist" exact component={querylist} />
      <Route path="/ans_query" exact component={ans_query} />
    </BrowserRouter>
  );
};

export default Routes;
