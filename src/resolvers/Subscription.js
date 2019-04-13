const newLinkSub = (root, args, context, info) => {
	return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
};

const newVoteSub = (root, args, context, info) => {
	return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
};

const newLink = {
	subscribe: newLinkSub,
	resolve: payload => {
		return payload;
	}
};

const newVote = {
	subscribe: newVoteSub,
	resolve: payload => {
		return payload;
	}
};

module.exports = {
	newLink,
	newVote
};
