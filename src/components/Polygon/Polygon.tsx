import React, { FC } from 'react';
import { PolygonProps } from './Polygon.types';
import { ngon, rad, Cubic, subtract, add } from '../../geometry';
import { Svg, Path } from '../Svg';
import { useNgon } from './Polygon.methods';

export const Polygon: FC<PolygonProps> = ({
	sides = 6,
	rotation = 0,
	scale = 1,
	cornerRadius = 0,
	fill = '#000',
	stroke = '#000',
	strokeWidth = 0.1,
	width = '100%',
	height = '100%',
	maskID,
	children
}) => {
	const [points, viewBox, scaledStrokeWidth] = useNgon(sides, scale, rad(rotation), cornerRadius, strokeWidth);
	return (<Svg 
	{...{width, height, viewBox}}>
		{maskID ? (<defs>
			<mask id={maskID}>
				<Path {...{points, fill:'#fff', stroke: '#000', strokeWidth:0, scale}}/>
			</mask>
		</defs>):null}
		<Path {...{points, fill, stroke, strokeWidth:scaledStrokeWidth, scale}}/>
		{children}
		{children && maskID && (<Path {...{points, fill:'transparent', stroke, strokeWidth:scaledStrokeWidth, scale}}/>)}
	</Svg>);
};