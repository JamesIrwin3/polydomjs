/**
 * X Y coordinate
 */
export type XY = [number, number];

/**
 * A Cubic storage system.
 */
export type Cubic = [number, number, number, number];

export type Operators = {
	'+': (a: number, b: number) => number,
	'-': (a: number, b: number) => number,
	'*': (a: number, b: number) => number,
	'/': (a: number, b: number) => number
}