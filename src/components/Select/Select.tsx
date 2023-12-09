import styles from './Select.module.css'
import { FiChevronDown } from 'react-icons/fi'
import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/OutslideClickHook'

export interface ValueI {
  value: string
  label: string
}

const Select = ({
  values,
  activeValue,
  setActiveValue,
}: {
  values: ValueI[]
  activeValue: ValueI
  setActiveValue: (val: ValueI) => void
}) => {
  let [open, setOpen] = useState(false)

  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  return (
    <div
      className={styles.select}
      ref={ref}
    >
      <div
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.label}>{activeValue.label || 'Select'}</div>
        <FiChevronDown />
      </div>
      {open && (
        <div className={styles.selectDialog}>
          {values.map((item, index) => (
            <div
              className={styles.selectItem}
              key={index}
              onClick={() => {
                setActiveValue(item)
                setOpen(false)
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
