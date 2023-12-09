import { useEffect, useState } from 'react'
import './App.css'
import TopBar from './components/Topbar/TopBar'
import Main from './components/main/main'
import { TICKETS, USERS } from './constant'

export interface TicketI {
  id: string
  title: string
  tag: String[]
  userId: string
  status: string
  priority: number
}

export enum StatusE {
  Backlog = 'Backlog',
  InProgress = 'In progress',
  Todo = 'Todo',
}

export enum TagE {
  FeatureRequest = 'Feature request',
  TagFeatureRequest = 'Feature Request',
}

export interface UserI {
  id: string
  name: string
  available: boolean
  color: string
}

function App() {
  let [tickets, setTickets] = useState<TicketI[] | null>()
  let [users, setUsers] = useState<UserI[] | null>()

  const groupingStates = [
    { label: 'Status', value: 'status' },
    { label: 'User', value: 'user' },
    { label: 'Priority', value: 'priority' },
  ]
  const orderingStates = [
    { label: 'Priority', value: 'priority' },
    { label: 'Title', value: 'title' },
  ]

  let [activeGroupingState, setActiveGroupingState] = useState<{
    value: string
    label: string
  }>(groupingStates[0])

  let [activeOrderingState, setActiveOrderingState] = useState<{
    value: string
    label: string
  }>(orderingStates[0])

  useEffect(() => {
    const localTickets = localStorage.getItem('tickets')
    const localUsers = localStorage.getItem('users')
    const loadCounter = localStorage.getItem('load_counter')

    if (loadCounter === '1') {
      setTickets(
        (prevTickets) => JSON.parse(localTickets as string) || prevTickets
      )
      setUsers((prevUsers) => JSON.parse(localUsers as string) || prevUsers)
    } else {
      setTickets(TICKETS)
      setUsers(USERS)

      localStorage.setItem('tickets', JSON.stringify(TICKETS))

      localStorage.setItem('users', JSON.stringify(USERS))

      localStorage.setItem('load_counter', '1')
    }
  }, [])

  useEffect(() => {
    const loadCount = localStorage.getItem('load_counter')

    if (loadCount === '1' && tickets != null) {
      localStorage.setItem('tickets', JSON.stringify(tickets))
    }
  }, [tickets])

  useEffect(() => {
    const loadCount = localStorage.getItem('load_counter')
    if (loadCount === '1' && users != null) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  return (
    <div className='app'>
      <TopBar
        activeGroupingState={activeGroupingState}
        activeOrderingState={activeOrderingState}
        setActiveGroupingState={setActiveGroupingState}
        setActiveOrderingState={setActiveOrderingState}
        groupingStates={groupingStates}
        orderingStates={orderingStates}
      />
      {tickets?.length && users?.length ? (
        <Main
          activeGroupingState={activeGroupingState.value}
          activeOrderingState={activeOrderingState.value}
          tickets={tickets}
          users={users}
          setTickets={setTickets}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default App
