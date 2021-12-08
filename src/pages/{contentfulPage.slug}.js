import React from "react";
import { Layout } from "components";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ContentfulPage(props) {
	console.log(props);
	return (
		<Layout>
			{documentToReactComponents(
				JSON.parse(props.data.contentfulPage.pageContent.raw)
			)}
		</Layout>
	);
}

export const query = graphql`
	query PageQuery($id: String) {
		contentfulPage(id: { eq: $id }) {
			id
			title
			pageContent {
				raw
			}
		}
	}
`;
