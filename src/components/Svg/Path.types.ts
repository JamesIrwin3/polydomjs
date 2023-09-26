export type PathProps = {
	/**
	 * Renders based on points rather then string. 
	 * 2 coordinate points provided will result in a line (or movement if first point)
	 * 4 coordinate points provided will result in a cubic curve
	 */
	points?: number[][]

	/**
	 * The fill color
	 */
	fill?: string,

	/**
	 * The stroke color
	 */
	stroke?: string,

	/**
	 * The stroke width
	 */
	strokeWidth?: number

	/**
	 * scale will allow path to adjust border size
	 */
	scale?: number
}