import React from "react";
import {
	PriceGroupWrapper,
	PriceOption,
	PriceOptionInner,
	MostPopularLabel,
} from "./style";
import { RichText } from "components";

export const PriceGroup = ({ priceOptions }) => {
	return (
		<PriceGroupWrapper>
			{priceOptions.map((priceOption) => (
				<PriceOption key={priceOption.id}>
					{/* passing a prop to a styled component */}
					<PriceOptionInner isMostPopular={priceOption.mostPopular}>
						{!!priceOption.mostPopular && (
							<MostPopularLabel>Most popular</MostPopularLabel>
						)}
						{/* rendering the price option title */}
						<h2>{priceOption.title}</h2>
						{/* rendering the price per month */}
						<h3>£{priceOption.amountPerMonth} / month</h3>
						<RichText raw={priceOption.description.raw} />
					</PriceOptionInner>
				</PriceOption>
			))}
		</PriceGroupWrapper>
	);
};
