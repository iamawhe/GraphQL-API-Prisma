const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

//2 - Resolver fnc (implementation)
const resolvers = {
	Query,
	Mutation,
	User,
	Link,
	Subscription,
	Vote
};

//3
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: request => {
		return { ...request, prisma };
	}
});

const PORT = 4000;
server.start(() => console.log(`Server is running on PORT: ${PORT}`));
