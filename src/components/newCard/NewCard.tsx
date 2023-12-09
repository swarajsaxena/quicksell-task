import { useState, useRef } from 'react'
import { TicketI } from '../../App'
import { USERS, priorities, statusImage } from '../../constant'
import Select from '../Select/Select'
import styles from './NewCard.module.css'
import { FiPlus } from 'react-icons/fi'
import useOutsideClick from '../../hooks/OutslideClickHook'

const NewCard = ({
  activeGroupingState,
  setTickets,
  defaultProperty,
  setNewCardOpen,
}: {
  setTickets: React.Dispatch<React.SetStateAction<TicketI[]>>
  activeGroupingState: string
  defaultProperty: string
  setNewCardOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  let [title, setTitle] = useState('')
  let [features, setFeatures] = useState<string[]>([''])

  let [activePriority, setActivePriority] = useState({
    label:
      activeGroupingState === 'priority'
        ? priorities[defaultProperty].label
        : priorities['0'].label,
    value: activeGroupingState === 'priority' ? defaultProperty : '0',
  })

  let [activeUser, setActiveUser] = useState({
    label:
      activeGroupingState === 'user'
        ? USERS.find((user) => user.id === defaultProperty).name
        : USERS[0].name,
    value:
      activeGroupingState === 'user'
        ? USERS.find((user) => user.id === defaultProperty).id
        : USERS[0].id,
  })

  let [activeStatus, setActiveStatus] = useState({
    value:
      activeGroupingState === 'status'
        ? statusImage[defaultProperty]
        : statusImage[0],
    label: activeGroupingState === 'status' ? defaultProperty : statusImage[0],
  })

  const PrioritySelect = () => (
    <div className={styles.selectContainer}>
      <div className={styles.selectLabel}>Priority</div>
      <Select
        activeValue={activePriority}
        setActiveValue={setActivePriority}
        values={Object.keys(priorities).map((p) => {
          return {
            label: priorities[p].label,
            value: p,
          }
        })}
      />
    </div>
  )

  const UserSelect = () => (
    <div className={styles.selectContainer}>
      <div className={styles.selectLabel}>User</div>
      <Select
        activeValue={activeUser}
        setActiveValue={setActiveUser}
        values={USERS.map((user) => ({
          label: user.name,
          value: user.id,
        }))}
      />
    </div>
  )

  const StatusSelect = () => (
    <div className={styles.selectContainer}>
      <div className={styles.selectLabel}>Status</div>
      <Select
        activeValue={activeStatus}
        setActiveValue={setActiveStatus}
        values={Object.keys(statusImage).map((p) => {
          return {
            label: p,
            value: p,
          }
        })}
      />
    </div>
  )

  const createNew = () => {
    const newTicket: TicketI = {
      title: title,
      id: `CAM-${Math.floor(Math.random() * 1000)}`,
      priority: Number(activePriority.value),
      status: activeStatus.label,
      tag: features,
      userId: activeUser.value,
    }

    console.log(newTicket)
    // return

    setTickets((prev) => [...prev, newTicket])
    setNewCardOpen(false)
  }

  const ref = useRef()

  useOutsideClick(ref, () => setNewCardOpen(false))

  return (
    <div
      ref={ref}
      className={styles.newCard}
    >
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Title</label>
        <textarea
          // wrap='soft'
          className={styles.input}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Write Something'
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Features</label>
        <textarea
          // wrap='soft'
          className={styles.input}
          value={features.join(', ')}
          onChange={(event) => setFeatures(event.target.value.split(', '))}
          placeholder='Feature, Feature, Feature'
          rows={1}
        />
      </div>
      {activeGroupingState === 'status' ? (
        <>
          <PrioritySelect />
          <UserSelect />
        </>
      ) : activeGroupingState === 'user' ? (
        <>
          <StatusSelect />
          <PrioritySelect />
        </>
      ) : (
        <>
          <StatusSelect />
          <UserSelect />
        </>
      )}
      <div className={styles.buttonGrp}>
        <button
          onClick={createNew}
          className={styles.button}
        >
          Create
        </button>
        <button
          onClick={() => setNewCardOpen(false)}
          className={styles.button + ' ' + styles.sqr}
        >
          <div className={styles.icon}>
            <FiPlus />
          </div>
        </button>
      </div>
    </div>
  )
}

export default NewCard
