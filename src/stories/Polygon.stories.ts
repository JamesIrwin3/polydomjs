import type { Meta, StoryObj } from '@storybook/react';
import { Polygon } from '../components';

const meta: Meta<typeof Polygon> = {
	title: 'Polydom/Polygon',
	component: Polygon,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	name: 'Polygon',
	args:{
		sides: 6,
		rotation: 0,
		scale: 1,
		cornerRadius: 0.1,
		fill: '#f00',
		stroke: '#000',
		strokeWidth: 0.025,
	}
}

