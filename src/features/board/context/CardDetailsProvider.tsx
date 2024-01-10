import React, { createContext, useState } from 'react'

import { ICard } from '../types/card'
interface ICardContext {
  card: ICard | null
  setCard: (card: ICard | null) => void
}

export const CardContext = createContext<ICardContext>({
  card: null,
  setCard: () => {},
})

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [card, set] = useState<ICard | null>(null)

  const setCard = (item: ICard | null) => {
    if (item?.id) {
      set(item)
    } else {
      set(null)
    }
  }
  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
