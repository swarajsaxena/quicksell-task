import React, { useRef } from 'react'
import styles from './MoreOptions.module.css'
import { TicketI } from '../../App'
import useOutsideClick from '../../hooks/OutslideClickHook'

const MoreOptions = ({
  setMoreOptionOpen,
  setTickets,
  tickets,
}: {
  setTickets: React.Dispatch<React.SetStateAction<TicketI[]>>
  tickets: TicketI[]
  setMoreOptionOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ref = useRef()
  useOutsideClick(ref, () => setMoreOptionOpen(false))

  function filterItemsToDelete(mainArray, itemsToDelete) {
    return mainArray.filter((mainItem) => {
      // Check if the item is not in the itemsToDelete array
      return !itemsToDelete.some((deleteItem) => deleteItem.id === mainItem.id)
    })
  }

  return (
    <div className={styles.moreOptions}>
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation()
          setTickets((prev) => {
            return filterItemsToDelete(prev, tickets)
          })
          setMoreOptionOpen(false)
        }}
      >
        Delete All
      </div>
    </div>
  )
}

export default MoreOptions
