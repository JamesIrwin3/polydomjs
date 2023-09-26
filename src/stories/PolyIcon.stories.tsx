import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PolyIcon } from '../components';
import * as Icons from 'react-icons/fa';

const meta: Meta<typeof PolyIcon> = {
	title: 'Polydom/PolyIcon',
	component: PolyIcon,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes:{
		icon: {
			options: Object.keys(Icons),
			mapping: Icons,
			control: {
				type:'select',
			}
		}
	}
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	name: 'PolyIcon',
	args:{
		sides: 6,
		rotation: 0,
		scale: 1,
		cornerRadius: 0.1,
		fill: '#f00',
		stroke: '#000',
		strokeWidth: 0.025,
		icon: Icons.FaBeer,
		iconScaleFactor: 0.8,
		iconPosition: [0.2, 0.1]
	}
}