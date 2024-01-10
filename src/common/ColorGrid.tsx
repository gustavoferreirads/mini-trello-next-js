import React, { useEffect, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
interface ColorGridProps {
  onSelect: (color: string) => void
  className?: string
}

const colors = [
  '#0079bf',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#95a5a6',
]

const ColorGrid: React.FC<ColorGridProps> = ({ onSelect, className }) => {
  const [selected, setSelected] = useState<string>(colors[0])

  useEffect(() => {
    onSelect(selected)
  }, [selected])

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => setSelected(color)}
          className="w-10 h-8 cursor-pointer hover:opacity-70 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {selected === color && <AiOutlineCheck className="text-white" />}
        </div>
      ))}
    </div>
  )
}

export default ColorGrid
