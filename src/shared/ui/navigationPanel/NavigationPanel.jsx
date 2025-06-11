// shared/ui/NavigationPanel/NavigationPanel.jsx
import { ButtonLink } from '../buttonLink/ButtonLink';
import logo from '../../assets/images/logo.svg';
import s from './NavigationPanel.module.css';

export const NavigationPanel = ({ links, onClick, text }) => (
  <div className={s.panel}>
    <div className={s.header}>
      <div className={s.logo}>
        <img src={logo} alt="Logo" />
      </div>
    </div>

    <nav className={s.nav}>
      {links.map(({ href, icon, name }) => (
        <a key={href} href={href} className={s.link}>
          <div className={s.icon}>
            {icon}
          </div>
          <span className={s.label}>{name}</span>
        </a>
      ))}
    </nav>

    <div className={s.footer}>
      <ButtonLink className={s.logoutBtn} onClick={onClick} text={text} />
    </div>
  </div>
);
