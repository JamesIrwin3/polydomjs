import { ReactElement, ReactNode } from "react";
import { XY } from "../../geometry";
import { IconType } from 'react-icons';
export type DOMElement = HTMLElement | SVGElement;

export type PolygonProps = {
	/**
	 * The number of sides the polygon has
	 */
	sides?: number,

	/**
	 * the rotation angle in degrees
	 */
	rotation?: number

	/**
	 * Scaling factor
	 */
	scale?: number

	/**
	 * The corner radius applied to rounding each corner. 
	 */
	cornerRadius?: number

	/**
	 * The fill color
	 */
	fill?: string

	/**
	 * The stroke color
	 */
	stroke?: string

	/**
	 * The stroke line width
	 */
	strokeWidth?: number
	
	/**
	 * The widths of the svg defaults to 100%
	 */
	width?: string

	/**
	 * The height of the svg defaults to 100%
	 */
	height?: string

	/**
	 * The id to be provided to the polygon mask.
	 * If this is not provided a mask will not be made
	 */
	maskID?: string

	/**
	 * The children to be provided if no maskID these will be added after the polygon
	 * if a mask id is provided the stroke will be rendered after the children to ensure proper order
	 */
	children?: ReactNode
}

export type nGonState = {
	/**
	 * The number of sides the ngon will have
	 */
	sides: number,
	/**
	 * The scale of the polygon. This number will effect the radius and the cornerRadius
	 */
	scale: number,
	/**
	 * the rotation angle in radians
	 */
	rotation: number,
	/**
	 * The corner radius.
	 * This number is scaled with the scale as such a decimal value of how much of the view box should be used. warning if the edge length is less then the corner radius this can have unexpected results.
	 */
	cornerRadius: number,
	/**
	 * the width of the stroke
	 */
	strokeWidth: number
}

export type PolyIconProps = {
	/**
	 * Accepts a react element however this is only been tested with react-icons and font asesome icons. 
	 */
	icon: IconType
	
	/**
	 * This number should reflect the change in size from its original dimension. because this is a vector value it should be less then 1. values greater then 1 may have unexpected results. 
	 * default is 0.8
	 */
	iconScaleFactor: number

	/**
	 * Icon position is used to fine tune the icons location within the polygon. this will be usefull primarily with asymetric icons
	 * the default is [0.2, 0.1]
	 */
	iconPosition?: XY,

	iconPadding?: number
} & PolygonProps

export type PolyImgProps = {
	/**
	 * The image element to be provided
	 */
	image: string
	/**
	 * The scale factor to be used on the image. Warning values greater then 1 may cause unexpected results. If value is greater then 1 it should be expected that the image quality will be reduced.
	 * It should also be noted because the image is within an SVG if the svg is scaled to large image quality will also be affected.
	 */
	imageScaleFactor: number
} & PolygonProps
