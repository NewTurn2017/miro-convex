'use client'

import { cn, colorToCss } from '@/lib/utils'
import { Color } from '@/types/canvas'

interface ColorPickerProps {
  onChange: (color: Color) => void
  isBorder?: boolean
  setColorPickerVisible?: (visible: boolean) => void
}

export const ColorPicker = ({
  onChange,
  isBorder,
  setColorPickerVisible,
}: ColorPickerProps) => {
  const handleClick = (color: Color) => {
    onChange(color)
    setColorPickerVisible?.(false)
  }
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 items-center max-w-[164px]',
        isBorder && 'pr-2 mr-2 border-r border-neutral-200'
      )}
    >
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={handleClick} />
      <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={handleClick} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={handleClick} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={handleClick} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={handleClick} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={handleClick} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={handleClick} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={handleClick} />
    </div>
  )
}

interface ColorButtonProps {
  onClick: (color: Color) => void
  color: Color
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className='size-8 items-center flex justify-center hover:opacity-75 transition'
      onClick={() => onClick(color)}
    >
      <div
        className='size-8 rounded-md border border-neutral-300'
        style={{ background: colorToCss(color) }}
      />
    </button>
  )
}
