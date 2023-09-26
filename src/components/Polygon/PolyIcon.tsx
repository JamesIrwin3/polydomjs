import React, { FC, useEffect, useRef, useState } from "react";
import { PolyIconProps } from "./Polygon.types";
import { useIcon } from "./Polygon.methods";
import { Polygon } from "./Polygon";
import { apothem, aspect, divide, rad, subtract, XY, multiply } from "../../geometry";


export const PolyIcon: FC<PolyIconProps> = ({
	icon: Icon,
	iconPadding = 0.1,
	sides = 6,
	rotation = 0,
	strokeWidth = 0.025,
	...polygonProps
}) => {
	const dimensions = aspect(sides, rad(rotation));
	const apx = apothem(sides, 0.5-(strokeWidth+iconPadding));
	const difference = subtract(dimensions, apx);
	const ref = useIcon(Icon, apx, difference as XY);
	return (<Polygon {...{sides, rotation, strokeWidth, ...polygonProps}} >
		<g transform={`scale(${apx * 2}) translate(${multiply(dimensions, -1).join(', ')})`} ref={ref}>
			<Icon/>
		</g>
	</Polygon>);
}