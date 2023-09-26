import React, { FC } from 'react';
import { PathProps } from './Path.types';
import { draw } from './Svg.methods';

export const Path: FC<PathProps> = ({
	points = [],
	fill,
	stroke,
	strokeWidth
}) => {
	return (<path
	d={draw(points)}
	{...{fill, stroke, strokeWidth}}/>);
};