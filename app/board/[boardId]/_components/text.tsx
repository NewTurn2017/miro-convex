import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss } from '@/lib/utils'
import { TextLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96
  const caleFactor = 0.5
  const fontSizeBasedOnHeight = height * caleFactor
  const fontSizeBasedOnWidth = width * caleFactor
  return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth)
}

interface TextProps {
  id: string
  layer: TextLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Text = ({ id, layer, onPointDown, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')

    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
      }}
    >
      <ContentEditable
        html={value || ''}
        onChange={handleContentChange}
        className='h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none font-one-mobile-pop'
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : '#000',
        }}
      />
    </foreignObject>
  )
}
