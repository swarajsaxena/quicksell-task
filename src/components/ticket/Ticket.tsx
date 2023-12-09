import { TicketI, UserI } from '../../App'
import { statusImage } from '../../constant'
import styles from './ticket.module.css'
import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RxDragHandleDots2, RxTrash } from 'react-icons/rx'
import useOutsideClick from '../../hooks/OutslideClickHook'

const Ticket = ({
  ticket,
  users,
  activeGroupingState,
  priorityImage,
  index,
  setTickets,
}: {
  ticket: TicketI
  users: UserI[]
  priorityImage: string
  activeGroupingState: string
  index: number
  setTickets: React.Dispatch<React.SetStateAction<TicketI[]>>
}) => {
  let [user] = useState(users.find((user) => user.id === ticket.userId))
  let [editingActive, setEditingActive] = useState(false)
  let [title, setTitle] = useState(ticket.title)

  useEffect(() => {
    setTickets((tickets: TicketI[]) =>
      tickets.map((t: TicketI) => {
        if (t.id === ticket.id) {
          // Create a new object with the updated title
          return {
            ...t,
            title: title,
          }
        }
        // If the ID doesn't match, return the original object
        return t
      })
    )
  }, [title])

  const outsideRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(outsideRef, () => {
    setEditingActive(false)
  })

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: ticket.id,
    data: {
      type: 'Ticket',
      ticket: {
        ticket,
        users,
        activeGroupingState,
        priorityImage,
        index,
      },
    },
  })

  const stylesDnd = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        className={styles.ticketOverlay}
        ref={setNodeRef}
        style={stylesDnd}
      ></div>
    )
  }

  return (
    <div
      className={`${styles.ticket} ${isDragging ? styles.dragging : ''}`}
      ref={setNodeRef}
      style={{ ...stylesDnd }}
    >
      {activeGroupingState !== 'user' && (
        <div
          style={{
            background: user?.color,
          }}
          className={styles.avatar}
        >
          {user?.name[0]}
          {user?.name.split(' ')[1] && user?.name.split(' ')[1][0]}
        </div>
      )}
      <div className={styles.id}>{ticket.id}</div>
      {editingActive ? (
        <div
          className={styles.title}
          ref={outsideRef}
        >
          {activeGroupingState !== 'status' && (
            <img
              src={statusImage[ticket.status]}
              alt='wow'
              className={styles.status}
            />
          )}
          <textarea
            // wrap='soft'
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Write Something'
          />
        </div>
      ) : (
        <div
          className={styles.title}
          ref={outsideRef}
        >
          {activeGroupingState !== 'status' && (
            <img
              src={statusImage[ticket.status]}
              alt='wow'
              className={styles.status}
            />
          )}
          <div onClick={() => setEditingActive(true)}>{ticket.title}</div>
        </div>
      )}
      <div className={styles.bottom}>
        {activeGroupingState !== 'priority' && (
          <img
            src={priorityImage}
            alt=''
            className={styles.priority}
          />
        )}
        {ticket.tag.map((t) => (
          <span className={styles.tag}>
            <div className={styles.dot} />
            {t}
          </span>
        ))}
      </div>
      <div
        className={styles.delete}
        onClick={() =>
          setTickets((prev) => prev.filter((t) => t.id !== ticket.id))
        }
      >
        <RxTrash />
      </div>
      <div
        {...attributes}
        {...listeners}
        className={styles.handle}
      >
        <RxDragHandleDots2 />
      </div>
    </div>
  )
}

export default Ticket
