import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"


const AuthLink = setContext((_, {headers})=>{
  const token = localStorage.getItem('jwt');
  return {
    headers:{
      ...headers,
      Authorization: token ? `Bearer ${token}` :''
    }
  }

})
const httpLink = createHttpLink({
  uri:"http://localhost:5000/graphql",
})
const client = new ApolloClient({
  link:AuthLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools:true
})



ReactDOM.render(
    <ApolloProvider client={client} >
      <App />
      </ApolloProvider> ,
  document.getElementById('root')
);
