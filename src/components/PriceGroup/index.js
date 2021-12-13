import React from "react";
import { PriceGroupWrapper, PriceOption, PriceOptionInner } from "./style";

export const PriceGroup = ({ priceOptions }) => {
	console.log(priceOptions);
	return (
		<PriceGroupWrapper>
			{priceOptions.map((priceOption) => (
				<PriceOption key={priceOption.id}>
					<PriceOptionInner>{priceOption.title}</PriceOptionInner>
				</PriceOption>
			))}
		</PriceGroupWrapper>
	);
};
