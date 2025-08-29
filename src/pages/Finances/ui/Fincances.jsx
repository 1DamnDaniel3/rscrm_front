import { useState } from 'react';
import { Navigation } from '../../../widgets';
import { HeroBlock } from '../../../shared';
import styles from './Fincances.module.css';

export const Finances = () => {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [studentName, setStudentName] = useState('');
  const [paymentType, setPaymentType] = useState('Абонемент');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const [expenseType, setExpenseType] = useState('Аренда');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const handleAddPayment = () => {
    if (!studentName || !amount || !paymentDate) return;
    setPayments(prev => [...prev, {
      studentName,
      paymentType,
      amount: parseFloat(amount),
      date: paymentDate,
    }]);
    setStudentName('');
    setPaymentType('Абонемент');
    setAmount('');
    setPaymentDate('');
  };

  const handleAddExpense = () => {
    if (!expenseAmount || !expenseDate) return;
    setExpenses(prev => [...prev, {
      type: expenseType,
      amount: parseFloat(expenseAmount),
      date: expenseDate,
    }]);
    setExpenseType('Аренда');
    setExpenseAmount('');
    setExpenseDate('');
  };

  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.container}>
        <HeroBlock heroTitle="Finances" />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Добавить платёж</h2>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Имя ученика"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option>Абонемент</option>
              <option>Разовое занятие</option>
              <option>Иное</option>
            </select>
            <input
              type="number"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <button onClick={handleAddPayment}>Добавить</button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Добавить расход</h2>
          <div className={styles.formRow}>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option>Аренда</option>
              <option>Зарплата</option>
              <option>Реклама</option>
              <option>Иное</option>
            </select>
            <input
              type="number"
              placeholder="Сумма"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
            <button onClick={handleAddExpense}>Добавить</button>
          </div>
        </div>

        {payments.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Список платежей</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ученик</th>
                  <th>Тип</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.studentName}</td>
                    <td>{p.paymentType}</td>
                    <td>{p.amount} ₽</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {expenses.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Список расходов</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Тип</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e, idx) => (
                  <tr key={idx}>
                    <td>{e.type}</td>
                    <td>{e.amount} ₽</td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
