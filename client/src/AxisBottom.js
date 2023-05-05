import { useMemo } from 'react';

const TICK_LENGTH = 10;

export function AxisBottom({xScale, pixelsPerTick, height}) {
    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[0] - range[1];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }))
    }, [xScale, pixelsPerTick, range]);

    return (
        <>
            {/* Ticks and labels */}
            {ticks.map(({value, xOffset}) => (
                <g 
                    key={value}
                    transform={`translate(0, ${xOffset})`}
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