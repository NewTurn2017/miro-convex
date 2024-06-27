import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from 'lucide-react'
import { ToolButton } from './tool-button'
import { CanvasMode, CanvasState, Color, LayerType } from '@/types/canvas'
import { useState } from 'react'
import { colorToCss } from '@/lib/utils'
import { ColorPicker } from './color-picker'

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (canvasState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  lastUsedColor: Color // 추가된 부분
  setLastUsedColor: (color: Color) => void // 추가된 부분
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  lastUsedColor,
  setLastUsedColor,
}: ToolbarProps) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false) // 추가된 부분

  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolButton
          label='선택'
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.SelectionNet
          }
        />
        <ToolButton
          label='텍스트'
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label='스티커노트'
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />

        <ToolButton
          label='사각형'
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label='원'
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label='펜'
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
        {/* 색상 버튼 추가 */}
        <button
          className='size-8 items-center flex justify-center hover:opacity-75 transition'
          style={{ backgroundColor: colorToCss(lastUsedColor) }}
          onClick={() => setColorPickerVisible(!colorPickerVisible)}
        >
          <div
            className='size-8 rounded-md border border-neutral-300'
            style={{ background: colorToCss(lastUsedColor) }}
          />
        </button>
      </div>
      {/* ColorPicker 컴포넌트 조건부 렌더링 */}
      {colorPickerVisible && (
        <div className='absolute left-16 bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
          <ColorPicker
            onChange={setLastUsedColor}
            setColorPickerVisible={setColorPickerVisible}
          />
        </div>
      )}
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton
          label='실행 취소 (Ctrl + z)'
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label='다시 실행 (Ctrl + Shift + z)'
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  )
}

export function ToolbarSkeleton() {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md' />
  )
}
