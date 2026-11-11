import { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { formatMonthYear, toISODateString } from '../../utils/formatDate';
import styles from './InlineCalendar.module.css';

const WEEKDAY_HEADS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface InlineCalendarProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
  onClear: () => void;
}

export function InlineCalendar({ selectedDate, onSelect, onClear }: InlineCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    selectedDate ? parseISO(selectedDate) : new Date(),
  );

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const prevDisabled = isSameMonth(visibleMonth, today) || isBefore(visibleMonth, today);
  const selectedDateObj = selectedDate ? parseISO(selectedDate) : null;

  function handlePrevMonth() {
    if (!prevDisabled) setVisibleMonth((prev) => subMonths(prev, 1));
  }

  function handleNextMonth() {
    setVisibleMonth((prev) => addMonths(prev, 1));
  }

  function handleToday() {
    const now = new Date();
    setVisibleMonth(now);
    onSelect(toISODateString(now));
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.monthRow}>
        <button
          type="button"
          className={styles.monthNavButton}
          onClick={handlePrevMonth}
          disabled={prevDisabled}
          aria-label="Previous month"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <span className={styles.monthLabel}>{formatMonthYear(visibleMonth)}</span>
        <button
          type="button"
          className={styles.monthNavButton}
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <div className={styles.grid} role="grid">
        {WEEKDAY_HEADS.map((day) => (
          <span key={day} className={styles.weekdayHead} aria-hidden="true">
            {day}
          </span>
        ))}
        {days.map((day) => {
          const outsideMonth = !isSameMonth(day, visibleMonth);
          const past = isBefore(day, today);
          const disabled = outsideMonth || past;
          const selected = selectedDateObj ? isSameDay(day, selectedDateObj) : false;
          const todayFlag = isToday(day);

          const classes = [
            styles.dayCell,
            outsideMonth ? styles.dayOutside : '',
            todayFlag && !selected ? styles.dayToday : '',
            selected ? styles.daySelected : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              className={classes}
              disabled={disabled}
              onClick={() => onSelect(toISODateString(day))}
              aria-label={format(day, 'MMMM d, yyyy')}
              aria-current={todayFlag ? 'date' : undefined}
              aria-selected={selected}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      <div className={styles.footerRow}>
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          disabled={!selectedDate}
        >
          Clear
        </button>
        <button type="button" className={styles.todayButton} onClick={handleToday}>
          Today
        </button>
      </div>
    </div>
  );
}
