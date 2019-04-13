const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const post = (root, args, context, info) => {
	const userId = getUserId(context);
	return context.prisma.createLink({
		description: args.description,
		url: args.url,
		postedBy: { connect: { id: userId } }
	});
};

const signup = async (root, args, context, info) => {
	//const salt = await bcrypt
	const password = await bcrypt.hash(args.password, 10);
	const user = await context.prisma.createUser({ ...args, password });
	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return { token, user };
};

const login = async (root, args, context, info) => {
	const user = await context.prisma.user({ email: args.email });
	if (!user) {
		throw new Error('User is not found!');
	}

	const isValid = await bcrypt.compare(args.password, user.password);
	if (!isValid) throw new Error('Invalid password!');

	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return {
		token,
		user
	};
};

const vote = async (root, args, context, info) => {
	const userId = getUserId(context);
	console.log(userId);
	const linkExist = await context.prisma.$exists.vote({
		user: { id: userId },
		link: { id: args.linkId }
	});

	if (linkExist) {
		throw new Error(`${args.linkId} already voted for!`);
	}

	return context.prisma.createVote({
		user: { connect: { id: userId } },
		link: { connect: { id: args.linkId } }
	});
};

module.exports = {
	post,
	login,
	signup,
	vote
};
