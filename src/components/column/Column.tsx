import { TicketI, UserI } from '../../App'
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi'
import styles from './column.module.css'
import Ticket from '../ticket/Ticket'
import { colorArray } from '../../constant'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

const Column = ({
  groupId,
  tickets,
  icon,
  users,
  priorityImage,
  activeGroupingState,
  user,
  activeOrderingState,
  setTickets,
}: {
  groupId: string
  tickets: TicketI[]
  icon: string
  users: UserI[]
  user?: UserI | null
  priorityImage: Record<string, { img: string; label: string }>
  activeGroupingState: string
  activeOrderingState: string
  setTickets: (val: TicketI[]) => void
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: groupId,
    data: {
      type: 'Column',
      column: {
        groupId,
        tickets,
        icon,
        users,
        priorityImage,
        activeGroupingState,
        user,
        activeOrderingState,
      },
    },
  })

  const ticketIds = useMemo(() => {
    return tickets.map((ticket) => ticket.id)
  }, [tickets])

  const stylesDnd = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className={styles.column}
        style={stylesDnd}
      >
        <div className={styles.columnOverlay}></div>
      </div>
    )
  }

  return (
    <div
      className={styles.column}
      ref={setNodeRef}
      style={{
        ...stylesDnd,
        // boxShadow: isDragging ? '0 0 7.5px rgba(0, 0, 0, 0.1)' : '',
        // height: 'max-content',
      }}
    >
      <div
        className={styles.header}
        {...attributes}
        {...listeners}
      >
        {activeGroupingState === 'status' ? (
          <img
            src={icon}
            alt='wow'
          />
        ) : activeGroupingState === 'user' ? (
          <div
            style={{
              background:
                colorArray[Math.floor(Math.random() * colorArray.length)],
            }}
            className={styles.avatar}
          >
            {user?.name[0]}
            {user?.name.split(' ')[1] && user?.name.split(' ')[1][0]}
          </div>
        ) : (
          <>
            <img
              src={icon}
              alt='wow'
            />
          </>
        )}
        <span>{groupId}</span>
        <span className={styles.length}>{tickets.length}</span>
        <div
          onClick={() => {
            const newTicket: TicketI = {
              title: '',
              id: '',
              priority: 1,
              status: '',
              tag: [''],
              userId: '',
            }
          }}
          className={styles.colButton + ' ' + styles.x}
        >
          <FiPlus />
        </div>
        <div className={styles.colButton}>
          <FiMoreHorizontal />
        </div>
      </div>

      <div className={styles.tickets}>
        <SortableContext items={ticketIds}>
          {tickets
            .sort((a, b) => {
              if (activeOrderingState === 'priority') {
                return b.priority - a.priority
              } else {
                return b.title.localeCompare(a.title)
              }
            })
            .map((ticket, index) => (
              <Ticket
                setTickets={setTickets}
                key={index}
                users={users}
                activeGroupingState={activeGroupingState}
                priorityImage={priorityImage[ticket.priority]?.img}
                ticket={ticket}
                index={index}
              />
            ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default Column