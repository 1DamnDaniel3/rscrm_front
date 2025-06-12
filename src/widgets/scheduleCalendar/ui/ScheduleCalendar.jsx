// src/features/schedule/ScheduleCalendar.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Modal, Loader } from '../../../shared';
import { format } from 'date-fns';

import {
  fetchLessons,
  selectLessons,
  selectLessonsLoading,
  selectLessonsError,
  selectCurrentLesson,
  selectGeneratingLessons,
  selectGenerateError,
  chooseLesson,
  clearCurrentLesson
} from '../../../entities';

import { selectUser } from '../../../entities';

export const ScheduleCalendar = () => {
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const loading = useSelector(selectLessonsLoading);
  const error = useSelector(selectLessonsError);
  const generating = useSelector(selectGeneratingLessons);
  const generateError = useSelector(selectGenerateError);
  const selected = useSelector(selectCurrentLesson);
  const user = useSelector(selectUser);

  // Загрузка уроков
  useEffect(() => {
    const schoolId = user.school_id === "null" ? null : user.school_id;
    if (schoolId) {
      dispatch(fetchLessons(schoolId));
    }
  }, [dispatch, user?.school_id]);

  // Преобразуем lessons в события только с Date внутри компонента календаря
  const events = lessons
    .filter(lesson => lesson.lesson_date && lesson.start_time)
    .map(lesson => {
      const [hours, minutes] = lesson.start_time.split(':').map(Number);
      const start = new Date(lesson.lesson_date);
      start.setHours(hours, minutes, 0, 0);
      const end = new Date(start.getTime() + lesson.duration_minutes * 60000);

      return {
        id: `lesson-${lesson.id}`,
        title: lesson.group_name,
        start,
        end,
        timeLabel: format(start, 'HH:mm'),
        color: lesson.group_color || 'blue',
        raw: lesson,       // здесь — только сериализуемый объект
      };
    });

  return (
    <>
      {(loading || generating) && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generateError && <p style={{ color: 'red' }}>{generateError}</p>}

      <Calendar
        events={events}
        // Передаём в Redux только сериализуемое `raw`
        onSelectEvent={evt => dispatch(chooseLesson(evt.raw))}
      />

      <Modal
        isOpen={!!selected}
        onClose={() => dispatch(clearCurrentLesson())}
        title={selected?.group_name}
      >
        {selected && (() => {
          // Собираем displayDate для модалки
          const [h, m] = selected.start_time.split(':').map(Number);
          const displayDate = new Date(selected.lesson_date);
          displayDate.setHours(h, m, 0, 0);

          return (
            <div>
              <p><b>Группа:</b> {selected.group_name}</p>
              <p><b>Преподаватель:</b> {selected.teacher_name}</p>
              <p>
                <b>Время:</b>{' '}
                {format(displayDate, 'dd.MM.yyyy HH:mm')} ({selected.duration_minutes} мин.)
              </p>
              <p><b>Стиль:</b> {selected.dance_style}</p>
              <p><b>Отменено:</b> {selected.is_canceled ? 'Да' : 'Нет'}</p>
            </div>
          );
        })()}
      </Modal>
    </>
  );
};
