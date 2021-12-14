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
		// createPage is provided by gatsby api to create a page,
		createPage({
			path: `${contentfulBlog.slug}/${blogPost.node.slug}`, // path to access a particular blog post
			context: {
				postId: blogPost.node.contentful_id, // any data that we want to send down to a particular blog post
			},
			component: path.resolve("./src/templates/BlogPost/index.js"), // component that will render the post
		});
	});

	// finding out how many pages
	const numPages = Math.ceil(
		allContentfulBlogPost.edges.length / contentfulBlog.postsPerPage
	);

	for (let i = 0; i < numPages; i++) {
		createPage({
			path: `${contentfulBlog.slug}${i === 0 ? "" : `/${i + 1}`}`,
			component: path.resolve("./src/templates/PaginatedBlogPage/index.js"),
			context: {
				blogSlug: contentfulBlog.slug,
				totalPages: numPages,
				currentPage: i + 1,
				posts: allContentfulBlogPost.edges
					.map((blogPost) => blogPost.node)
					.slice(
						i * contentfulBlog.postsPerPage,
						i * contentfulBlog.postsPerPage + contentfulBlog.postsPerPage
					),
			},
		});
	}
};
