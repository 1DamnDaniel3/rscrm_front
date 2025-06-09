import clsx from 'clsx'
import styles from './SelectLong.module.css'

export const SelectLong = ({ label, options, value, onChange, name, className }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
