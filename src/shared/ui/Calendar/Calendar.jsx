// src/shared/Calendar.jsx

import { useState } from 'react';
import { Calendar as RBC, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarOverride.css';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { Tag } from '../Tag/Tag';

const locales = { ru: ruLocale };

const localizer = dateFnsLocalizer({
  format,
  parse,
  // явно задаём, что неделя начинает c понедельника
  startOfWeek: (date) => startOfWeek(date, { locale: ruLocale }),
  getDay,
  locales,
});

export const Calendar = ({ events, onSelectEvent }) => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  return (
    <RBC
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
      onSelectEvent={onSelectEvent}
      culture="ru"
      view={view}
      onView={setView}
      date={date}
      onNavigate={setDate}
      views={['month', 'week', 'day']}
      defaultView="month"
      messages={{
        month: 'Месяц',
        week: 'Неделя',
        day: 'День',
        today: 'Сегодня',
        previous: 'Назад',
        next: 'Вперёд',
      }}
      components={{
        event: ({ event }) => (
          <Tag text={`${event.timeLabel} ${event.raw.group_name}`} color={event.color} />
        ),
      }}
    />
  );
};
