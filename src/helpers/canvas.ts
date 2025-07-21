/* istanbul ignore file */
import { Point } from '../interfaces/Point';

// source: https://github.com/georgedoescode/generative-utils/blob/master/src/spline.js
const formatPoints = (points: Point[], close: boolean): number[] => {
  points = [...points];

  if (close) {
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];
    const firstPoint = points[0];
    const secondPoint = points[1];

    points.unshift(lastPoint);
    points.unshift(secondToLastPoint);
    points.push(firstPoint);
    points.push(secondPoint);
  }

  return points.flatMap(point => [point.x, point.y]);
};

// source: https://github.com/georgedoescode/generative-utils/blob/master/src/spline.js
const spline = (points: Point[], tension = 1, close = false): string => {
  if (points.length < 2) return '';

  const flatPoints = formatPoints(points, close);
  const size = flatPoints.length;
  const last = size - 4;

  const startPointX = close ? flatPoints[2] : flatPoints[0];
  const startPointY = close ? flatPoints[3] : flatPoints[1];

  let path = `M ${startPointX} ${startPointY}`;

  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? flatPoints[i - 2] : flatPoints[0];
    const y0 = i ? flatPoints[i - 1] : flatPoints[1];

    const x1 = flatPoints[i + 0];
    const y1 = flatPoints[i + 1];

    const x2 = flatPoints[i + 2];
    const y2 = flatPoints[i + 3];

    const x3 = i !== last ? flatPoints[i + 4] : x2;
    const y3 = i !== last ? flatPoints[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;

    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;

    path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
  }

  return path;
};

export { spline };
