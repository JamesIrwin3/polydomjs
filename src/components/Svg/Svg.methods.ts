/**
 * creats a paths draw string
 * @param param0 
 * @returns string
 */
export const draw = ([f, ...points]: number[][]): string => !f ? '':`M ${f.join(' ')}` + points.map( v => `${v.length == 2 ? 'L':'Q'} ${v.join(' ')}`).join(' ') + ' Z';