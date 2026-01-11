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
                <div>Тут будет всякая отчётность за месяц</div>
            </div>
        </div>
    );
};
