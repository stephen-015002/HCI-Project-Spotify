import { useMemo } from 'react';

const TICK_LENGTH = 10;

export default function AxisBottom({xScale, pixelsPerTick, height, label}) {
    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }))
    }, [xScale, pixelsPerTick, range]);

    return (
        <>  
            <text y={-57} fill="#ababab" fontSize={16} textRendering={"optimizeLegibility"}> &rarr; </text>
            <text y={-37} fill="#ababab" fontSize={16} textRendering={"optimizeLegibility"}>{label}</text>
            {ticks.map(({value, xOffset}) => (
                <g 
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                    shapeRendering={'crispEdges'}
                >
                    <line
                        y1={TICK_LENGTH}
                        y2={-height - TICK_LENGTH}
                        stroke='#D2D7D3'
                        strokeWidth={0.5}
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: '10px',
                            textAnchor: 'middle',
                            transform: 'translateX(20px)',
                            fill: '#D2D7D3'
                        }}
                    >
                        {value}
                    </text>

                </g>
            ))}
        </>
    )

}