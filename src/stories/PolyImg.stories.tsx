import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PolyImg } from '../components';

//so dumb this is necessary. I will revisit this
//@ts-ignore
import demoImg from './assets/demoimg.png';

const meta: Meta<typeof PolyImg> = {
	title: 'Polydom/PolyImg',
	component: PolyImg,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	name: 'PolyImg',
	args:{
		sides: 6,
		rotation: 0,
		scale: 1,
		cornerRadius: 0.1,
		fill: '#f00',
		stroke: '#000',
		strokeWidth: 0.025,
		image: demoImg,
		imageScaleFactor: 1,
	}
}