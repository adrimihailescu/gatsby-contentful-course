import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const RichText = (raw, references) => {
	return <div>{documentToReactComponents(JSON.parse(raw))}</div>;
};
