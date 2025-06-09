// ClientsList.jsx
import s from './DataList.module.css'

export const DataList = ({ data, name }) => (
  <ul className={s.list}>
    {data.map(c => (
      <li key={c.id}>
        <strong>{c.name}</strong> — {c.relation || 'не указано'}{' '}
      </li>
    ))}
  </ul>
)