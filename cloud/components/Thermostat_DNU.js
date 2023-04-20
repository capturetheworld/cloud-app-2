import React from 'react';
import PropTypes from 'prop-types';

const Thermostat = (props) => {
    const getStyles = () => {
        // Determine if the thermostat is actively working to reach the target temperature.
        let dialColor = '#000';
        if (props.hvacMode === 'heating') {
            dialColor = '#E36304';
        } else if (props.hvacMode === 'cooling') {
            dialColor = '#007AF1';
        }

        return {
            dial: {
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
            },
            circle: {
                fill: dialColor,
                WebkitTransition: 'fill 0.5s',
                transition: 'fill 0.5s',
            },
            target: {
                fill: 'white',
                textAnchor: 'middle',
                fontFamily: 'Helvetica, sans-serif',
                alignmentBaseline: 'central',
                fontSize: '120px',
                fontWeight: 'bold',
                visibility: (props.away ? 'hidden' : 'visible'),
            },
            ambient: {
                fill: 'white',
                textAnchor: 'middle',
                fontFamily: 'Helvetica, sans-serif',
                alignmentBaseline: 'central',
                fontSize: '22px',
                fontWeight: 'bold',
            },
            away: {
                fill: 'white',
                textAnchor: 'middle',
                fontFamily: 'Helvetica, sans-serif',
                alignmentBaseline: 'central',
                fontSize: '72px',
                fontWeight: 'bold',
                opacity: (props.away ? '1' : '0'),
                pointerEvents: 'none',
            },
            leaf: {
                fill: '#13EB13',
                opacity: (props.leaf ? '1' : '0'),
                visibility: (props.away ? 'hidden' : 'visible'),
                WebkitTransition: 'opacity 0.5s',
                transition: 'opacity 0.5s',
                pointerEvents: 'none',
            },
        };
    };

    const pointsToPath = points => {
        return [points.map(
            (point, iPoint) => [(iPoint > 0 ? 'L' : 'M'), point[0], ' ', point[1]].join('')
        ).join(' '), 'Z'].join('');
    };

    const rotatePoint = (point, angle, origin) => {
        const radians = angle * Math.PI / 180;
        const x = point[0] - origin[0];
        const y = point[1] - origin[1];
        const x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
        const y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
        return [x1, y1];
    };

    const rotatePoints = (points, angle, origin) => {
        return points.map(
            point => rotatePoint(point, angle, origin)
        );
    };

    const restrictToRange = (val, min, max) => {
        if (val < min) return min;
        if (val > max) return max;
        return val;
    };

    const mapLeafPoint = (point, scale) => {
        return isNaN(point) ? point : point * scale;
    };

    // Local variables used for rendering.
    const diameter = 400;
    const radius = diameter / 2;
    const ticksOuterRadius = diameter / 30;
    const ticksInnerRadius = diameter / 8;
    const tickDegrees = 300;
    const rangeValue = props.maxValue - props.minValue;

    // Determine the maximum and minimum values to display.
    let actualMinValue;
    let actualMaxValue;
    if (props.away) {
        actualMinValue = props.ambientTemperature;
        actualMaxValue = actualMinValue;
    } else {
        actualMinValue = Math.min(props.ambientTemperature, props.targetTemperature);
        actualMaxValue = Math.max(props.ambientTemperature, props.targetTemperature);
    }
    const min = restrictToRange(Math.round((actualMinValue - props.minValue)
        / rangeValue * props.numTicks), 0, props.numTicks - 1);
    const max = restrictToRange(Math.round((actualMaxValue - props.minValue)
        / rangeValue * props.numTicks), 0, props.numTicks - 1);

    // Renders the degree ticks around the outside of the thermostat.
    const tickPoints = [
        [radius - 1, ticksOuterRadius],
        [radius + 1, ticksOuterRadius],
        [radius + 1, ticksInnerRadius],
        [radius - 1, ticksInnerRadius],
    ];
    const tickPointsLarge = [
        [radius - 1.5, ticksOuterRadius],
        [radius + 1.5, ticksOuterRadius],
        [radius + 1.5, ticksInnerRadius + 20],
        [radius - 1.5, ticksInnerRadius + 20],
    ];
    const theta = tickDegrees / props.numTicks;
    const offsetDegrees = 180 - (360 - tickDegrees) / 2;
    const tickArray = [];
    for (let iTick = 0; iTick < props.numTicks; iTick++) {
        const isLarge = iTick === min || iTick === max;
        const isActive = iTick >= min && iTick <= max;
        const tickElement = React.createElement('path', {
            key: ['tick-', iTick].join(''),
            d: pointsToPath(
                rotatePoints(
                    isLarge ? tickPointsLarge : tickPoints,
                    iTick * theta - offsetDegrees,
                    [radius, radius])),
            style: {
                fill: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
            },
        });
        tickArray.push(tickElement);
    }

    // Determines the positioning of the leaf, should it be displayed.
    const leafScale = radius / 5 / 100;
    const leafDef = ['M', 3, 84, 'c', 24, 17, 51, 18, 73, -6, 'C', 100, 52, 100,
        22, 100, 4, 'c', -13, 15, -37, 9, -70, 19, 'C', 4, 32, 0, 63, 0, 76, 'c',
        6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24,
        'C', 22, 63, 8, 78, 3, 84, 'z',
    ].map(
        point => mapLeafPoint(point, leafScale)
    ).join(' ');
    const translate = [radius - (leafScale * 100 * 0.5), radius * 1.5];

    // Determines whether the ambient temperature label will be displayed
    // to the left or right of the tick range.
    const lblAmbientPosition = [
        radius,
        ticksOuterRadius - (ticksOuterRadius - ticksInnerRadius) / 2,
    ];
    const peggedValue = restrictToRange(
        props.ambientTemperature,
        props.minValue,
        props.maxValue);
    let degs = tickDegrees * (peggedValue - props.minValue) / rangeValue - offsetDegrees;
    if (peggedValue > props.targetTemperature) {
        degs += 8;
    } else {
        degs -= 8;
    }
    const ambientPosition = rotatePoint(lblAmbientPosition, degs, [radius, radius]);

    // The styles change based on state.
    const styles = getStyles();

    // Piece it all together to form the thermostat display.
    return (
        <svg width={props.width} height={props.height} style={styles.dial}
            viewBox={['0 0 ', diameter, ' ', diameter].join('')}
        >
            <circle cx={radius} cy={radius} r={radius} style={styles.circle}></circle>
            <g>{tickArray}</g>
            <text x={radius} y={radius} style={styles.target}>
                {Math.round(props.targetTemperature)}
            </text>
            <text x={ambientPosition[0]} y={ambientPosition[1]} style={styles.ambient}>
                {Math.round(props.ambientTemperature)}
            </text>
            <text x={radius} y={radius} style={styles.away}>AWAY</text>
            <path d={leafDef} style={styles.leaf}
                transform={['translate(', translate[0], ',', translate[1], ')'].join('')}
            ></path>
        </svg>
    );
};

Thermostat.propTypes = {
    /* Height of the thermostat (ex: 50% or 400px) */
    height: PropTypes.string,
    /* Width of the thermostat (ex: 50% or 400px) */
    width: PropTypes.string,
    /* Total number of ticks that will be rendered on the thermostat wheel */
    numTicks: PropTypes.number,
    /* Lowest temperature able to be displayed on the thermostat */
    minValue: PropTypes.number,
    /* Highest temperature able to be displayed on the thermostat */
    maxValue: PropTypes.number,
    /* Indicates whether or not the thermostat is in "away mode" */
    away: PropTypes.bool,
    /* Indicates whether or not the thermostat is in "energy savings mode" */
    leaf: PropTypes.bool,
    /* Actual temperature detected by the thermostat */
    ambientTemperature: PropTypes.number,
    /* Desired temperature that the thermostat attempts to reach */
    targetTemperature: PropTypes.number,
    /* Current state of operations within the thermostat */
    hvacMode: PropTypes.oneOf(['off', 'heating', 'cooling']),
};

Thermostat.defaultProps = {
    height: '100%',
    width: '100%',
    numTicks: 100,
    minValue: 50,
    maxValue: 85,
    away: false,
    leaf: false,
    ambientTemperature: 74,
    targetTemperature: 68,
    hvacMode: 'off',
};

export default Thermostat;
