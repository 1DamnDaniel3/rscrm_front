import { useState } from 'react';
import { Navigation } from '../../../widgets';
import { HeroBlock } from '../../../shared';
import styles from './Fincances.module.css';

export const Finances = () => {
  

  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.container}>
        <HeroBlock heroTitle="Finances" />
        <div>Тут будет всякая финансовая история</div>
      </div>
    </div>
  );
};
