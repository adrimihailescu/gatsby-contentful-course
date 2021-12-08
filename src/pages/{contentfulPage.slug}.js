import React from "react";
import { Layout } from "components";
import { graphql } from "gatsby";

export default function ContentfulPage(props) {
	console.log(props);
	return (
		<Layout>
			<h1>{props.data.contentfulPage.title}</h1>
		</Layout>
	);
}

export const query = graphql`
	query PageQuery($id: String) {
		contentfulPage(id: { eq: $id }) {
			id
			title
		}
	}
`;
