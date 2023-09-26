import React, { FC, useEffect, useRef } from "react";
import { PolyImgProps } from "./Polygon.types";
import { Svg, Path } from "../Svg";
import { useNgon } from "./Polygon.methods";
import { rad } from "../../geometry";

export const PolyImg: FC<PolyImgProps> = ({
	sides = 6,
	rotation = 0,
	scale = 1,
	cornerRadius = 0,
	stroke = 'currentColor',
	strokeWidth = 0.1,
	image,
	imageScaleFactor = 1
}) => {
	const [points, viewBox, scaledStrokeWidth] = useNgon(sides, scale, rad(rotation), cornerRadius, strokeWidth);
	console.log(viewBox);
	return (<Svg 
	viewBox={viewBox}
	width='100%'
	height='100%'>
		<defs>
			<mask id="path-mask">
				<Path {...{points, fill:'#fff', stroke: '#000', strokeWidth: scaledStrokeWidth}}/>
			</mask>
		</defs>
		<image x={viewBox[0]} y={viewBox[1]} width={viewBox[2]-strokeWidth} height={viewBox[3]-strokeWidth} xlinkHref={image} mask='url(#path-mask)' transform={`scale(${imageScaleFactor})`} preserveAspectRatio="xMidYMid slice"/>
		<Path {...{points, fill:'transparent', stroke, strokeWidth:scaledStrokeWidth}}/>
	</Svg>)
}