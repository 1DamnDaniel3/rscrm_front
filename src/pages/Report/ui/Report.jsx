// src/pages/report/ui/Report.jsx
import { useState } from 'react';
import s from './Report.module.css';
import { Navigation } from '../../../widgets';
import { HeroBlock } from '../../../shared';

export const Report = () => {
    const [reportType, setReportType] = useState('attendance');

    return (
        <div className={s.wrapper}>
            <Navigation />
            <div className={s.container}>
                <HeroBlock heroTitle={"Reports"} />

                <div className={s.filters}>
                    <label>
                        Тип отчёта:
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="attendance">Посещаемость</option>
                            <option value="payments">Платежи</option>
                            <option value="groups">Загруженность групп</option>
                        </select>
                    </label>
                    <button className={s.button}>Сформировать</button>
                </div>

                {reportType === 'attendance' && (
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Отчёт по посещаемости</h2>
                        <table className={s.table}>
                            <thead>
                                <tr>
                                    <th>Группа</th>
                                    <th>Дата</th>
                                    <th>Учеников</th>
                                    <th>Присутствовало</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Hip-Hop 12–14 лет</td><td>2025-06-10</td><td>15</td><td>12</td></tr>
                                <tr><td>Contemporary 16+</td><td>2025-06-10</td><td>10</td><td>9</td></tr>
                                <tr><td>Jazz Funk 10–12 лет</td><td>2025-06-09</td><td>12</td><td>10</td></tr>
                                <tr><td>Ballet 8–10 лет</td><td>2025-06-09</td><td>14</td><td>13</td></tr>
                                <tr><td>Hip-Hop 12–14 лет</td><td>2025-06-08</td><td>15</td><td>14</td></tr>
                                <tr><td>Contemporary 16+</td><td>2025-06-08</td><td>10</td><td>8</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {reportType === 'payments' && (
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Отчёт по платежам</h2>
                        <ul className={s.list}>
                            <li>Абонементы — 24 000 ₽</li>
                            <li>Разовые — 6 400 ₽</li>
                            <li>Форма и мерч — 3 000 ₽</li>
                            <li>Сборы на выступление — 7 500 ₽</li>
                            <li>Прочее — 1 200 ₽</li>
                            <li><strong>Итого — 42 100 ₽</strong></li>
                        </ul>
                    </div>
                )}

                {reportType === 'groups' && (
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Загруженность групп</h2>
                        <table className={s.table}>
                            <thead>
                                <tr>
                                    <th>Группа</th>
                                    <th>Максимум</th>
                                    <th>Записано</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Hip-Hop 12–14 лет</td><td>20</td><td>15</td></tr>
                                <tr><td>Contemporary 16+</td><td>15</td><td>10</td></tr>
                                <tr><td>Jazz Funk 10–12 лет</td><td>18</td><td>16</td></tr>
                                <tr><td>Ballet 8–10 лет</td><td>15</td><td>14</td></tr>
                                <tr><td>Stretching Adults</td><td>12</td><td>11</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
