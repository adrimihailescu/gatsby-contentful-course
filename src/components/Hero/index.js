import React from "react";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";

import { HeroWrapper, HeadingWrapper, Heading, SubHeading } from "./style";

export const Hero = ({ heading, subHeading, backgroundImage }) => {
	const pluginImage = getImage(backgroundImage);
	return (
		<HeroWrapper>
			<BgImage
				image={pluginImage}
				style={{ minWidth: "100vw", minHeight: "100vh" }}
			>
				<HeadingWrapper>
					<div>
						<Heading>{heading}</Heading>
						<SubHeading>{subHeading}</SubHeading>
					</div>
				</HeadingWrapper>
			</BgImage>
		</HeroWrapper>
	);
};
