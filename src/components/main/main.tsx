import { TicketI, UserI } from '../../App'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './main.module.css'
import Column from '../column/Column'
import { priorities, statusImage, swapElements } from '../../constant'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import Ticket from '../ticket/Ticket'

type ActiveColumnT = {
  groupId: string
  tickets: TicketI[]
  icon: string
  users: UserI[]
  priorityImage: Record<
    string,
    {
      img: string
      label: string
    }
  >
  activeGroupingState: string
  activeOrderingState: string
  user: UserI | null | undefined
}

type ActiveTicketT = {
  ticket: TicketI
  users: UserI[]
  activeGroupingState: string
  priorityImage: string
  index: number
}
const Main = ({
  activeGroupingState,
  tickets,
  users,
  activeOrderingState,
  setTickets,
}: {
  tickets: TicketI[]
  users: UserI[]
  activeGroupingState: string
  activeOrderingState: string
  setTickets: React.Dispatch<React.SetStateAction<TicketI[]>>
}) => {
  let [statuses] = useState([
    'Backlog',
    'Todo',
    'In progress',
    'Done',
    'Canceled',
  ])

  let [statusColumns, setStatusColumns] = useState(
    statuses.map((status: string, index) => ({
      icon: statusImage[status] as string,
      groupId: status,
      key: index,
      tickets: tickets
        .filter((value) => value.status === status)
        .sort((a, b) => {
          if (activeOrderingState === 'title') {
            return a.title.localeCompare(b.title)
          } else {
            // Assuming priority is a number
            return b.priority - a.priority
          }
        }),
      users: users,
      priorityImage: priorities,
    }))
  )
  let [userColumns, setUserColumns] = useState(
    users.map((user: UserI, index) => ({
      icon: '' as string,
      groupId: user.id,
      key: index,
      tickets: tickets
        .filter((value) => value.userId === user.id)
        .sort((a, b) => {
          if (activeOrderingState === 'title') {
            return a.title.localeCompare(b.title)
          } else {
            // Assuming priority is a number
            return b.priority - a.priority
          }
        }),
      users: users,
      priorityImage: priorities,
      user: user,
    }))
  )
  let [priorityColumns, setPriorityColumns] = useState(
    Object.keys(priorities).map((priority: string, index: any) => ({
      icon: priorities[priority].img,
      groupId: priority,
      key: index,
      tickets: tickets
        .filter((value) => String(value.priority) === priority)
        .sort((a, b) => {
          if (activeOrderingState === 'title') {
            return a.title.localeCompare(b.title)
          } else {
            // Assuming priority is a number
            return b.priority - a.priority
          }
        }),
      users: users,
      priorityImage: priorities,
    }))
  )

  useEffect(() => {
    setStatusColumns(
      statuses.map((status: string, index) => ({
        icon: statusImage[status] as string,
        groupId: status,
        key: index,
        tickets: tickets
          .filter((value) => value.status === status)
          .sort((a, b) => {
            if (activeOrderingState === 'title') {
              return a.title.localeCompare(b.title)
            } else {
              // Assuming priority is a number
              return b.priority - a.priority
            }
          }),
        users: users,
        priorityImage: priorities,
      }))
    )
    setUserColumns(
      users.map((user: UserI, index) => ({
        icon: '' as string,
        groupId: user.id,
        key: index,
        tickets: tickets
          .filter((value) => value.userId === user.id)
          .sort((a, b) => {
            if (activeOrderingState === 'title') {
              return a.title.localeCompare(b.title)
            } else {
              // Assuming priority is a number
              return b.priority - a.priority
            }
          }),
        users: users,
        priorityImage: priorities,
        user: user,
      }))
    )
    setPriorityColumns(
      Object.keys(priorities).map((priority: string, index: any) => ({
        icon: priorities[priority].img,
        groupId: priority,
        key: index,
        tickets: tickets
          .filter((value) => String(value.priority) === priority)
          .sort((a, b) => {
            if (activeOrderingState === 'title') {
              return a.title.localeCompare(b.title)
            } else {
              // Assuming priority is a number
              return b.priority - a.priority
            }
          }),
        users: users,
        priorityImage: priorities,
      }))
    )
  }, [tickets])

  let [activeColumn, setActiveColumn] = useState<ActiveColumnT | null>(null)
  let [activeTicket, setactiveTicket] = useState<ActiveTicketT | null>()

  const [statusColumnIds, setStatusColumnsIds] = useState(
    statuses.map((status) => status)
  )
  const [userColumnIds, setUserColumnsIds] = useState(
    users.map((user: UserI) => user.id)
  )
  const [priorityColumnIds, setPriorityColumnsIds] = useState(
    Object.keys(priorities).map(
      (priority: string) => priorities[priority].label
    )
  )

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }
    if (event.active.data.current?.type === 'Ticket') {
      setactiveTicket(event.active.data.current.ticket)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (!over) return

    const activeColId = active.id
    const overColId = over.id

    console.log('onDragEnd', activeColId, overColId)

    if (activeColId === overColId) return

    if (activeGroupingState === 'status') {
      console.log('status')

      setStatusColumnsIds((columnIds) => {
        const activeColumnIndex = columnIds.findIndex(
          (col) => col === activeColId
        )
        const overColumnIndex = columnIds.findIndex((col) => col === overColId)
        return swapElements(columnIds, activeColumnIndex, overColumnIndex)
      })
    }

    if (activeGroupingState === 'user') {
      setUserColumnsIds((columnIds) => {
        const activeColumnIndex = columnIds.findIndex((col) => {
          return col === activeColId
        })
        const overColumnIndex = columnIds.findIndex((col) => col === overColId)

        return swapElements(columnIds, activeColumnIndex, overColumnIndex)
      })
    }

    if (activeGroupingState === 'priority') {
      setPriorityColumnsIds((columnIds) => {
        const activeColumnIndex = columnIds.findIndex((col) => {
          return col === priorities[activeColId].label
        })
        const overColumnIndex = columnIds.findIndex((col) => {
          return col === priorities[overColId].label
        })

        return swapElements(columnIds, activeColumnIndex, overColumnIndex)
      })
    }

    setactiveTicket(null)
    setActiveColumn(null)
  }

  const onDagOver = (event: DragOverEvent) => {
    console.log(event.over.data.current?.type)

    const { over, active } = event

    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    console.log('onDagOver', activeId, overId)

    if (activeId === overId) return

    const isActiveATicket = active.data.current?.type === 'Ticket'
    const isOverATicket = over.data.current?.type === 'Ticket'

    if (!isActiveATicket) return

    // dropping task over task

    if (isActiveATicket && isOverATicket) {
      setTickets((tickets: TicketI[]) => {
        const activeIndex = tickets.findIndex(
          (ticket) => ticket.id === activeId
        )

        const overIndex = tickets.findIndex((ticket) => ticket.id === overId)

        switch (activeGroupingState) {
          case 'status':
            tickets[activeIndex].status = tickets[overIndex].status
            break
          case 'user':
            tickets[activeIndex].userId = tickets[overIndex].userId
            break
          case 'priority':
            tickets[activeIndex].priority = tickets[overIndex].priority
            break
          default:
          // Handle the default case if necessary
        }

        return swapElements(tickets, activeIndex, overIndex)
      })
    }

    // dropping task over column
    const isOverAtColumn = over.data.current?.type === 'Column'
    if (isActiveATicket && isOverAtColumn) {
      setTickets((tickets: TicketI[]) => {
        const activeIndex = tickets.findIndex(
          (ticket) => ticket.id === activeId
        )

        switch (activeGroupingState) {
          case 'status':
            tickets[activeIndex].status = overId
            break
          case 'user':
            tickets[activeIndex].userId = overId
            break
          case 'priority':
            tickets[activeIndex].priority = Number(overId)
            break
          default:
          // Handle the default case if necessary
        }

        return swapElements(tickets, activeIndex, activeIndex)
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
      onDragOver={onDagOver}
    >
      <div className={styles.main}>
        {activeGroupingState === 'status' ? (
          <>
            <SortableContext items={statusColumnIds}>
              {statusColumnIds.map((columnId) => (
                <Column
                  setTickets={setTickets}
                  activeGroupingState={activeGroupingState}
                  activeOrderingState={activeOrderingState}
                  {...statusColumns.find((col) => col.groupId === columnId)}
                />
              ))}
            </SortableContext>
          </>
        ) : activeGroupingState === 'user' ? (
          <>
            <SortableContext items={userColumnIds}>
              {userColumnIds.map((columnId) => (
                <Column
                  setTickets={setTickets}
                  activeGroupingState={activeGroupingState}
                  activeOrderingState={activeOrderingState}
                  {...userColumns.find((col) => col.groupId === columnId)}
                />
              ))}
            </SortableContext>
          </>
        ) : (
          <>
            <SortableContext items={priorityColumnIds}>
              {priorityColumnIds.map((columnId) => (
                <Column
                  setTickets={setTickets}
                  activeGroupingState={activeGroupingState}
                  activeOrderingState={activeOrderingState}
                  {...priorityColumns.find(
                    (col) => priorities[col.groupId].label === columnId
                  )}
                />
              ))}
            </SortableContext>
          </>
        )}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                setTickets={setTickets}
                {...activeColumn}
              />
            )}
            {activeTicket && (
              <Ticket
                setTickets={setTickets}
                activeGroupingState={activeTicket.activeGroupingState}
                index={activeTicket.index}
                priorityImage={activeTicket.priorityImage}
                users={activeTicket.users}
                ticket={activeTicket.ticket}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </div>
    </DndContext>
  )
}

export default Main
