import { useMemo } from 'react';

const TICK_LENGTH = 10;

export default function AxisLeft({yScale, pixelsPerTick, width, label}) {
    const range = yScale.range();

    const ticks = useMemo(() => {
        const height = range[0] - range[1];
        const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

        return yScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            yOffset: yScale(value),
        }))
    }, [yScale, pixelsPerTick, range]);

    return (
        <>  
            <text x={-10} y={20} fill="#ababab" fontSize={16} textRendering={"optimizeLegibility"}> &uarr; </text>
            <text x={10} y={20} fill="#ababab" fontSize={16} textRendering={"optimizeLegibility"}>{label}</text>
            {ticks.map(({value, yOffset}) => (
                <g 
                    key={value}
                    transform={`translate(0, ${yOffset})`}
                    shapeRendering={'crispEdges'}
                >
                    <line
                        x1={-TICK_LENGTH}
                        x2={width + TICK_LENGTH}
                        stroke='#D2D7D3'
                        strokeWidth={0.5}
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: '10px',
                            textAnchor: 'middle',
                            transform: 'translateX(-20px)',
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