import s from './SchoolCard.module.css';
import trashIco from '../../../shared/assets/icons/garbage.svg'
import { IconButton } from '../../../shared';

export const SchoolCard = ({ school, onClick }) => {
  return (
    <div className={s.card}>
      <IconButton
        icon={trashIco} 
        onClick={onClick}
        type='button'
        />
      <h3 className={s.name}>{school.name}</h3>
      <p className={s.address}>{school.city}</p>
      <p className={s.address}>{school.phone}</p>
      <p className={s.address}>{school.email}</p>
    </div>
  );
};
