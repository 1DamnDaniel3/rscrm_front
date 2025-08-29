// src/shared/AttendanceList/AttendanceList.jsx

import { useState } from 'react';
import styles from './AttendanceList.module.css';

export const AttendanceList = () => {
  const dummyStudents = [
    { id: 1, name: 'Иван Иванов' },
    { id: 2, name: 'Мария Смирнова' },
    { id: 3, name: 'Дмитрий Кузнецов' },
    { id: 4, name: 'Алина Сергеева' },
    { id: 5, name: 'Олег Петров' },
  ];

  const [attendance, setAttendance] = useState(() =>
    dummyStudents.reduce((acc, student) => {
      acc[student.id] = 'present';
      return acc;
    }, {})
  );

  const handleChange = (id, status) => {
    const updated = { ...attendance, [id]: status };
    setAttendance(updated);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Отметка посещаемости</h3>
      <ul className={styles.list}>
        {dummyStudents.map((student) => (
          <li key={student.id} className={styles.item}>
            <span className={styles.name}>{student.name}</span>
            <div className={styles.controls}>
              <button
                className={`${styles.button} ${
                  attendance[student.id] === 'present' ? styles.active : ''
                }`}
                onClick={() => handleChange(student.id, 'present')}
              >
                Присутствует
              </button>
              <button
                className={`${styles.button} ${
                  attendance[student.id] === 'absent' ? styles.active : ''
                }`}
                onClick={() => handleChange(student.id, 'absent')}
              >
                Отсутствует
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
