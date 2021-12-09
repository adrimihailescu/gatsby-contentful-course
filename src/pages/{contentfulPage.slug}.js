import React from "react";
import { Layout, RichText } from "components";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ContentfulPage(props) {
	console.log(props);
	return (
		<Layout>
			<RichText
				references={props.data.contentfulPage.pageContent.references}
				raw={props.data.contentfulPage.pageContent.raw}
			/>
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
				references {
					... on ContentfulHero {
						contentful_id
						heading
						subHeading
						backgroundImage {
							gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
						}
					}
				}
			}
		}
	}
`;
