import { getSvgPathFromStroke } from '@/lib/utils'
import getStroke from 'perfect-freehand'

interface PathProps {
  x: number
  y: number
  points: number[][]
  fill: string
  onPointDown?: (e: React.PointerEvent) => void
  stroke?: string
}

export function Path({ x, y, points, fill, onPointDown, stroke }: PathProps) {
  return (
    <path
      className='drop-shadow-md'
      onPointerDown={onPointDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
    />
  )
}
