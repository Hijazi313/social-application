require('dotenv/config');
const {createServer} = require("http")
const {ApolloServer, gql, PubSub} = require("apollo-server-express");
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers")

const port  = process.env.PORT
const app = express();

const pubsub = new PubSub()

app.use(cors());

const httpServer = createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req, pubsub})
});

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true, 
        useCreateIndex: true
    })
.then(()=>{
    server.applyMiddleware({app});
    server.installSubscriptionHandlers(httpServer)
    return httpServer.listen(port, ()=>{
        console.log(`Server is running at port ${port}`);
        console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
    })
})
.catch((error)=> console.error(error))



