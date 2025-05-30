import { ButtonLink } from '../buttonLink/ButtonLink';
import logo from '../../assets/images/logo.svg'
import s from './NavigationPanel.module.css';

export const NavigationPanel = ({ links, onClick, text }) => {
  return (
    <div className={s.panel}>
      <div className={s.content}>
        <div className={s.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={s.nav}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.name}</a>
          ))}
        </nav>
      </div>
      <ButtonLink className={s.logoutBtn} onClick={onClick} text={text} />
    </div>
  );
};
