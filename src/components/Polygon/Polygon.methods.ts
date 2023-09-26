import { ReactElement, RefObject, useEffect, useRef } from "react";
import { ngon, translate, Cubic, multiply, add, divide, XY } from "../../geometry";
import { IconType } from 'react-icons';

export const useNgon = (sides: number, scale:number, rotation: number, cornerRadius: number, strokeWidth: number): [number[][], Cubic, number] => {
	const [ssw, scr] = multiply([strokeWidth, cornerRadius], scale);
	const radius = scale/2;
	const [cpts, vb] = ngon(sides, radius - (ssw/2), rotation, scr, [0, 0]);
	const hsw = ssw/2;
	const bvb: Cubic = add(vb, [-hsw, -hsw, ssw, ssw]) as Cubic;
	console.log(vb);
	//const points = translate(cpts, [-bvb[0], -bvb[1], -bvb[0], -bvb[1]])
	return [cpts, bvb, ssw];
}

export const useIcon = (icon: IconType, inCircleRadius: number, offset: XY): RefObject<SVGGElement> => {
	const ref = useRef(null);
	useEffect(()=>{
		const g = ref.current! as SVGGElement
		Array.from(g.children).forEach(elem => {
			if(elem.tagName !== 'svg') return;
			elem.removeAttribute('width');
			elem.removeAttribute('height');
			const vb = (elem.getAttribute('viewBox') ?? '0 0 0 0').split(' ').map(parseFloat);
			const maxDim = Math.max(...vb);
			const scale = (inCircleRadius * 2);
			const newDim: XY = multiply([vb[2], vb[3]], scale) as XY;
			//g.setAttribute('transform', `scale(${scale}) translate(${offset.join(' ')})`)
			console.log(vb, inCircleRadius, maxDim, scale, newDim);
		});
	}, [icon]);
	return ref;
}