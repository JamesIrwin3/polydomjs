import { Cubic, Operators, XY } from "./geometry.types"

/**
 * cast a ray from a particular point at a specified angle and distance. 
 * @param angle 
 * @param radius 
 * @param center 
 * @returns XY
 */
export const ray = (angle: number, radius: number = 1, center: XY = [0,0]): XY => ([
	Math.cos(angle) * radius + center[0],
	Math.sin(angle) * radius + center[1]
]);

/**
 * Create the points to generate an ngon
 * @param sides 
 * @param radius 
 * @param center 
 * @returns XY[]
 */
export const ngon = (sides: number, radius: number, rotation: number, cornerRadius: number, center: XY = [0, 0]): [number[][], Cubic] => {
	const radian = 2*Math.PI/sides;
	const interiorRadian = ((Math.PI * (sides-2))/sides)/2
	let points: number[][] = [];
	let minP: XY = [0, 0];
	let maxP: XY = [0, 0];
	for(let i = 0; i<sides; i++){
		const angle = radian * i + rotation;
		
		const p = ray(angle, radius, center);
		if (cornerRadius > 0){
			const inverseAngle = invert(angle);
			const p1 = ray(inverseAngle + interiorRadian, cornerRadius, p);
			const p2 = ray(inverseAngle - interiorRadian, cornerRadius, p);
			points = [...points, p1, [...p, ...p2]];
		} else {
			points.push(p);
		}
		minP = min(minP, p);
		maxP = max(maxP, p);
	}
	return [points, [...minP, ...multiply(maxP, 2) as XY]];
}

/**
 * Just a convenience method to create radians from degrees
 * @param deg 
 * @returns radians
 */
export const rad = (deg: number) => deg * (Math.PI/180);

/**
 * Returns a cubic [minX minY, distanceX, distanceY]
 * @param points 
 */
export const measure = (points: XY[]): Cubic => {
	let minP: XY = [0, 0];
	let maxP: XY = [0, 0];
	for(let i = 0; i<points.length; i++){
		minP = min(minP, points[i]);
	}
	return [...minP, ...multiply(maxP, 2)] as Cubic;
}

/**
 * Finds the minimum values in the two provided XY coordinates
 * @param p1 
 * @param p2 
 * @returns 
 */
export const min = (p1: XY, p2: XY): XY => [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1])];

/**
 * Finds the miximum values in the two provided XY coordinates
 * @param p1 
 * @param p2 
 * @returns 
 */
export const max = (p1: XY, p2: XY): XY => [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])];

//MARK mathematical operators
export const operators:Operators = {
	'+': (a: number, b: number) => a + b,
	'-': (a: number, b: number) => a - b,
	'*': (a: number, b: number) => a * b,
	'/': (a: number, b: number) => a / b
};

/**
 * A generalized mathematical operator method. This will replicate SIMD operation. I say replicate because SIMD is not possible using javascript as such I do not want to have addition tech debt utilizing the SIMD package. 
 * if b is provided as an array it should be equal in length to a otherwise an error will be thrown.
 */
export const calc = (operator: keyof Operators, a: number[], b: number | number[]):number[] => {
	const bRay = typeof b === 'number' ? new Array(a.length).fill(b):b;
	if(a.length > bRay.length) throw new Error(`Unable to perform ${operator} on items due to mismatched length: A:${a.length} B:${bRay.length}`);
	return a.map((v, i) => operators[operator](v, bRay[i]))
}
/**
 * Multiply a point by another point or by a singular number
 * @param point 
 * @param multiplier 
 * @returns 
 */
export const multiply = (point: number[], multiplier: number[] | number) : number[] => calc('*', point, multiplier);

export const add = (point: number[], additor: number[] | number) : number[] => calc('+', point, additor);

export const divide = (a: number[], b: number | number[]): number[] => calc('/', a, b);

export const subtract = (a: number[], b: number | number): number[] => calc('-', a, b);

/**
 * translates a point. b should be no less the the largest possible coordinate provided currently this is Cubic
 * @param a 
 * @param b 
 * @returns 
 */
export const translate = (a: number[][], b: number[]): number[][] => a.map(v=>add(v, b));
/**
 * Invert the current angle
 * @param angle 
 * @returns 
 */
export const invert = (angle: number): number => Math.PI + angle;

/**
 * Create a coordinate array with all coodinate points having the same number
 * @param value 
 * @param length 
 * @returns 
 */
export const uniform = (value: number, length: number): number[] => new Array(length).fill(value);

/**
 * return the width and height. the return value will be 2 coordinate points between 0 and 1
 * @param sides 
 */
export const aspect = (sides: number, rotation: number): XY => {
	let dim: XY = [0, 0];
	const angle = 2*Math.PI/sides;
	for (let i = 0; i<sides; i++) {
		dim = max(dim, ray(angle*i+rotation, 0.5));
	}
	return dim;
}

/**
 * return the side length based on the number of sides and a circum radius assumed to be 0.5 i.e 1 total size
 * @param sides
 * @returns number
 */
export const edge = (sides: number, length: number) => 2*length * Math.sin(Math.PI/sides);

export const apothem = (sides:number, length: number) => edge(sides, length)/(2*Math.tan(Math.PI/sides));

