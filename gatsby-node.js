const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, "src"), "node_modules"],
		},
	});
};

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;
	const {
		data: { contentfulBlog, allContentfulBlogPost },
	} = await graphql(`
		{
			contentfulBlog {
				postsPerPage
				slug
			}
			allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
				edges {
					node {
						slug
						publishedDate(formatString: "DD MMM YYYY")
						pageContent {
							raw
						}
						description
						title
						contentful_id
					}
				}
			}
		}
	`);
	allContentfulBlogPost.edges.forEach((blogPost) => {
		createPage({
			path: `${contentfulBlog.slug}/${blogPost.node.slug}`,
			context: {
				postId: blogPost.node.contentful_id,
			},
			component: path.resolve("./src/templates/BlogPost/index.js"),
		});
	});
};
