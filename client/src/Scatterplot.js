import * as d3 from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { useState } from 'react';
import { Tooltip } from './Tooltip';

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60}

export function Scatterplot({ width, height, data, chooseTrack}) {
    function handlePlay(track) {
        chooseTrack(track)
    }
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    const [hovered, setHovered] = useState(null)

    const yScale = d3.scaleLinear().domain([-0.05,1]).range([boundsHeight, 0])
    const xScale = d3.scaleLinear().domain([-0.05,1]).range([0, boundsWidth])

    const allShapes = data.map((d, i) => {
        return(
            <circle 
                key={i}
                r={13}
                cx={xScale(d?.acousticness)}
                cy={yScale(d?.danceability)}
                opacity={1}
                stroke='#cb1dd1'
                fill='cd1dd1'
                fillOpacity={0.2}
                strokeWidth={1}
                onMouseEnter={() => setHovered({
                    xPos: xScale(d?.acousticness),
                    yPos: yScale(d?.danceability),
                    title: d.title,
                    artist: d.artist,
                    albumUrl: d.albumUrl
                })}
                onMouseLeave={() => setHovered(null)}
                onMouseDown={() => handlePlay(d)}
            />
        )
    })

    return(
        <div>
            <svg width={width} height={height}>
                {/* first group is for the violin and box shapes*/}
                <g 
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {/* Y axis */}
                    <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth}/>
                    {/* X axis */}
                    <g transform={`translate(0, ${boundsHeight})`}>
                        <AxisBottom 
                            xScale={xScale}
                            pixelsPerTick={40}
                            height={boundsHeight}
                        />
                    </g>
                    {/* Circles */}
                    {allShapes}
                </g>
            </svg>
            {/* Tooltip */}
            <div
                style={{
                    width: boundsWidth,
                    height: boundsHeight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    marginLeft: MARGIN.left,
                    marginTop: MARGIN.top,
                }}
            >
                <Tooltip interactionData={hovered} />
            </div>
        </div>
    )


}

