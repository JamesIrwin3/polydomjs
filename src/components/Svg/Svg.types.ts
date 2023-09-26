import { ReactNode } from "react";
import { Cubic } from "../../geometry"

export type SvgProps = {

	/**
	 * The view box this will be converted to a string
	 */
	viewBox?: Cubic

	/**
	 * The width element of the svg element
	 */
	width?: string 

	/**
	 * The height element of the svg element
	 */
	height?: string

	/**
	 * The children accepts any react node... user beware html inside svg can have unexpected results. 
	 */
	children?: ReactNode

	preserveAspectRatio?: string
};