import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Layout } from "antd";

import "./App.css"

import AuthRoute from "./util/AuthRoute";
import AppHeader from "./components/Header";
import Home from "./pages"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Post from "./pages/Post"
import { AuthProvider } from './context/auth';



const {Header, Content, Footer} = Layout;
export default function App() {
    return(<AuthProvider>
    <Router>
        <Layout>
            <Header>
                <AppHeader />  
            </Header>
            <Content className="container" >
                <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    <Route exact path="/posts/:postId" component={Post} />
                </Switch>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    </Router>
    </AuthProvider>
    )
}
