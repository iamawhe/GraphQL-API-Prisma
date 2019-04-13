//Resolving relations

const postedBy = (root, args, context, info) => {
	return context.prisma.link({ id: root.id }).postedBy();
};

/*Resolver for each fileds

Link: {
    id: parent => parent.id,
    description: p => p.description,
    url: p => p.url
} */

//They are not needed because the GraphQL server infers what they look like.
module.exports = { postedBy };
