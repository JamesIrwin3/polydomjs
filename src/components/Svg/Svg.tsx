import React, { FC } from 'react';
import { SvgProps } from './Svg.types';

export const Svg: FC<SvgProps> = ({
	viewBox = [0, 0, 0, 0],
	width,
	height,
	children,
	preserveAspectRatio = 'xMidYMid meet'
}) => (<svg 
viewBox={viewBox.join(' ')} 
xmlns="http://www.w3.org/2000/svg"
{...{width, height, preserveAspectRatio}}
>
{children}
</svg>)