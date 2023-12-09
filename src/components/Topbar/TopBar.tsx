import styles from './TopBar.module.css'
import { FiSliders, FiChevronDown } from 'react-icons/fi'
import { useState, useRef } from 'react'
import Select, { ValueI } from '../Select/Select'
import useOutsideClick from '../../hooks/OutslideClickHook'

const TopBar = ({
  activeGroupingState,
  activeOrderingState,
  setActiveGroupingState,
  setActiveOrderingState,
  orderingStates,
  groupingStates,
}: {
  activeGroupingState: ValueI
  activeOrderingState: ValueI
  setActiveGroupingState: (val: ValueI) => void
  setActiveOrderingState: (val: ValueI) => void
  orderingStates: ValueI[]
  groupingStates: ValueI[]
}) => {
  let [open, setOpen] = useState(false)

  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  return (
    <div className={styles.topbar}>
      <div
        className={styles.relative}
        ref={ref}
      >
        <div
          className={styles.button}
          onClick={() => setOpen(!open)}
        >
          <div className={styles.slider}>
            <FiSliders />
          </div>
          <div>Display</div>
          <FiChevronDown />
        </div>
        {open && (
          <div className={styles.dialog}>
            <div className={styles.optionRow}>
              <div className={styles.optionLabel}>Grouping</div>
              <Select
                values={groupingStates}
                activeValue={activeGroupingState}
                setActiveValue={setActiveGroupingState}
              />
            </div>
            <div className={styles.optionRow}>
              <div className={styles.optionLabel}>Ordering</div>
              <Select
                values={orderingStates}
                activeValue={activeOrderingState}
                setActiveValue={setActiveOrderingState}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
