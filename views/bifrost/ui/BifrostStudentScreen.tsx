"use client";

import { useMemo, useState } from "react";
import {
  mockWeekSchedule,
  mockStudentDeadlines,
  mockCampusServices,
  mockCampusSpaces,
  mockCampusAnnouncements,
  mockAcademicSubjects,
  type LessonItem,
  type StudentDeadline,
  type CampusServiceItem,
} from "@/entities/student";

/* Minimal SVG Icons from Storybook Accessible University Kit */
function CalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UserIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CloseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* Helper to generate 7 days for the schedule switcher */
const weekDaysMeta = [
  { shortName: "Пн", fullName: "Понедельник", dayNum: 20 },
  { shortName: "Вт", fullName: "Вторник", dayNum: 21 },
  { shortName: "Ср", fullName: "Среда", dayNum: 22 },
  { shortName: "Чт", fullName: "Четверг", dayNum: 23 },
  { shortName: "Пт", fullName: "Пятница", dayNum: 24 },
  { shortName: "Сб", fullName: "Суббота", dayNum: 25 },
  { shortName: "Вс", fullName: "Воскресенье", dayNum: 26 },
];

export function BifrostStudentScreen() {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // Monday default
  const [selectedGroup, setSelectedGroup] = useState("ПИ23-1");
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [activeTab, setActiveTab] = useState<"schedule" | "deadlines" | "services">("schedule");
  
  // Modals state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [certType, setCertType] = useState("Справка об обучении с гербовой печатью");
  
  // Lesson Details Modal State (from Storybook Schedule/Lesson Details Modal)
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState<"all" | "sub1" | "sub2">("all");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const groups = ["ПИ23-1", "ПИ23-2", "ИБ23-1", "ИТ22-1"];
  const activeDay = mockWeekSchedule[selectedDayIdx] ?? mockWeekSchedule[0]!;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setOrderModalOpen(false);
    }, 2200);
  };

  const copyTeacherEmail = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopyFeedback("Email скопирован в буфер");
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-5 lg:gap-6 au-container">
      {/* 1. Header Bar in Accessible University Style */}
      <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 sm:p-5 shadow-[var(--ui-shadow-sm)] backdrop-blur-md transition-colors">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-[var(--ui-color-text)]">
                Кампусный портал и расписание Биврёст
              </h2>
              <span className="au-badge au-badge--brand">
                ИТС Университет
              </span>
              <span className="au-badge au-badge--neutral">
                8-я неделя (Чётная)
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[var(--ui-color-text-muted)] leading-relaxed max-w-3xl">
              Студенческий хаб: интерактивное расписание пар, дедлайны по предметам, занятость коворкингов и цифровые сервисы
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Action Button in AU Style */}
            <button
              type="button"
              onClick={() => setOrderModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--ui-color-brand)] px-4 py-2 text-xs font-semibold text-[var(--ui-color-on-brand)] hover:bg-[var(--ui-color-brand-strong)] active:scale-[0.98] transition cursor-pointer shadow-xs"
            >
              <span>Заказать справку</span>
            </button>

            {/* Group Switcher Tabs */}
            <div className="au-tabs">
              {groups.map((grp) => (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setSelectedGroup(grp)}
                  className={`au-tabs__item ${selectedGroup === grp ? "active" : ""}`}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Ongoing Pair Banner */}
        <div className="mt-4 flex flex-col gap-2.5 border-t border-[var(--ui-color-border)] pt-3 text-xs md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="au-badge au-badge--success font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#16a34a] animate-ping" />
              Сейчас идет занятие
            </span>
            <strong className="text-[var(--ui-color-text)] text-xs sm:text-sm font-semibold truncate max-w-[280px] sm:max-w-md">
              Проектирование микросервисов на Go & .NET
            </strong>
            <span className="text-[var(--ui-color-text-muted)]">·</span>
            <span className="text-[var(--ui-color-text-accent)] font-medium">
              Ауд. 315 · Ленинградский пр-т, 49
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-[11px] text-[var(--ui-color-text-muted)] shrink-0">
            <span>До конца: <strong className="text-[var(--ui-color-brand-strong)] font-bold">42 мин</strong></span>
            <span>·</span>
            <span>След: <strong className="text-[var(--ui-color-text)]">БД (12:15)</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Schedule Console + Side Panels */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
        {/* Left Column (8 cols): Interactive Schedule Console with Storybook Week Switcher */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Schedule Week Switcher from Storybook (Schedule/WeekSelector) */}
          <div className="schedule-main-container">
            <div className="schedule-week-switcher">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[var(--ui-color-brand-strong)]" />
                <span className="font-semibold text-sm text-[var(--ui-color-text)]">
                  Октябрь 2026
                </span>
                <span className="text-xs text-[var(--ui-color-text-muted)]">
                  · Группа {selectedGroup}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setWeekOffset(0);
                    setSelectedDayIdx(0);
                  }}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--ui-color-text-accent)] hover:bg-[var(--ui-color-surface-soft)] transition cursor-pointer"
                >
                  Сегодня
                </button>
                <div className="flex items-center gap-1 border-l border-[var(--ui-color-border)] pl-1.5">
                  <button
                    type="button"
                    onClick={() => setWeekOffset((prev) => prev - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--ui-color-text-muted)] hover:bg-[var(--ui-color-surface-soft)] hover:text-[var(--ui-color-text)] transition cursor-pointer"
                    aria-label="Предыдущая неделя"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeekOffset((prev) => prev + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--ui-color-text-muted)] hover:bg-[var(--ui-color-surface-soft)] hover:text-[var(--ui-color-text)] transition cursor-pointer"
                    aria-label="Следующая неделя"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 7 Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {weekDaysMeta.map((day, idx) => {
                const isActive = selectedDayIdx === idx;
                const isToday = idx === 0; // Monday as today in mock
                return (
                  <button
                    key={day.shortName}
                    type="button"
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`schedule-day-chip ${isActive ? "active" : ""}`}
                  >
                    <strong>{day.shortName}</strong>
                    <p>{day.dayNum + weekOffset * 7}</p>
                    {isToday && <span className="today-dot" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of Lessons for the Selected Day in Storybook LessonCard Style */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-sm font-semibold text-[var(--ui-color-text)]">
                {activeDay.dayName}, {activeDay.dateStr}
              </h3>
              <span className="text-xs text-[var(--ui-color-text-muted)]">
                {activeDay.lessons.length} {activeDay.lessons.length === 1 ? "пара" : "пары"}
              </span>
            </div>

            {activeDay.lessons.length === 0 ? (
              <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-8 text-center text-[var(--ui-color-text-muted)]">
                <CalendarIcon className="mx-auto w-8 h-8 text-[var(--ui-color-text-muted)] mb-2 opacity-50" />
                <p className="font-medium text-sm">В этот день занятий нет</p>
                <p className="text-xs mt-1">Отличное время для отдыха или подготовки к проектам</p>
              </div>
            ) : (
              activeDay.lessons.map((lesson, idx) => {
                const isCurrent = lesson.status === "current";
                const isPast = lesson.status === "past";

                let badgeVariant = "au-badge--neutral";
                if (lesson.type === "lab") badgeVariant = "au-badge--brand";
                else if (lesson.type === "lecture") badgeVariant = "au-badge--info";
                else if (lesson.type === "seminar" || lesson.type === "practice") badgeVariant = "au-badge--success";

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`schedule-lesson-card ${isCurrent ? "current" : ""} ${isPast ? "opacity-75" : ""}`}
                  >
                    {/* Header: Time, Lesson Number, Badge */}
                    <div className="schedule-lesson-card__header">
                      <div className="flex items-center gap-2">
                        <span className="schedule-chip--number">
                          #{idx + 1}
                        </span>
                        <span className="schedule-lesson-card__time">
                          {lesson.timeStart} – {lesson.timeEnd}
                        </span>
                        {isCurrent && (
                          <span className="au-badge au-badge--success">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-ping" />
                            Идет сейчас
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`au-badge ${badgeVariant}`}>
                          {lesson.typeLabel}
                        </span>
                      </div>
                    </div>

                    {/* Lesson Title */}
                    <h4 className="schedule-lesson-card__title">
                      {lesson.title}
                    </h4>

                    {/* Footer Row: Location & Teacher */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--ui-color-border)] mt-1">
                      <div className="schedule-lesson-card__location">
                        <MapPinIcon className="w-3.5 h-3.5 text-[var(--ui-color-icon-accent)] shrink-0" />
                        <span className="auditorium" title="Нажмите для открытия деталей">
                          {lesson.room}
                        </span>
                        <span className="text-[var(--ui-color-text-muted)]">
                          · {lesson.campus}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[var(--ui-color-text-soft)]">
                        <UserIcon className="w-3.5 h-3.5 text-[var(--ui-color-text-muted)]" />
                        <span>{lesson.teacher}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Sync Status Footer */}
            <div className="flex items-center justify-between px-2 py-2 text-xs text-[var(--ui-color-text-muted)]">
              <span>Синхронизировано с расписанием 1С:Университет</span>
              <span className="font-mono text-[11px]">Обновлено: 10 минут назад</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Deadlines & Quick Services */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Deadlines Card (Storybook Primitives/Card) */}
          <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)]">
            <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
                  Ближайшие дедлайны
                </h3>
                <p className="mt-0.5 text-xs text-[var(--ui-color-text)]">
                  Лабораторные и контрольные точки
                </p>
              </div>
              <span className="au-badge au-badge--warning">
                {mockStudentDeadlines.length} задачи
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-2.5">
              {mockStudentDeadlines.map((dl) => {
                const isUrgent = dl.daysLeft <= 2;
                return (
                  <div
                    key={dl.id}
                    className={`rounded-xl border p-3 flex flex-col justify-between transition-all ${
                      isUrgent
                        ? "border-[var(--ui-color-status-warning-border)] bg-[var(--ui-color-status-warning-bg)]"
                        : "border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="au-badge au-badge--neutral text-[10px]">
                          {dl.subject}
                        </span>
                        <span
                          className={`font-mono text-[11px] font-bold ${
                            isUrgent ? "text-[var(--ui-color-status-warning-text)]" : "text-[var(--ui-color-status-success-text)]"
                          }`}
                        >
                          Осталось {dl.daysLeft} дн.
                        </span>
                      </div>

                      <h4 className="mt-1.5 text-xs font-semibold text-[var(--ui-color-text)] leading-snug">
                        {dl.title}
                      </h4>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-[var(--ui-color-border)] pt-2 text-[10px] font-mono text-[var(--ui-color-text-muted)]">
                      <span>Срок: {dl.dueDate}</span>
                      <span className="font-bold text-[var(--ui-color-brand-strong)]">+{dl.points} баллов БРС</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setOrderModalOpen(true)}
              className="mt-3.5 w-full rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] py-2 text-xs font-semibold text-[var(--ui-color-text)] hover:border-[var(--ui-color-brand-strong)] hover:text-[var(--ui-color-brand-strong)] transition cursor-pointer active:scale-[0.98]"
            >
              Все задания в ФИН Помощнике →
            </button>
          </div>

          {/* Academic BRS Progress */}
          <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)]">
            <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-2.5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
                  Успеваемость БРС
                </h3>
                <p className="mt-0.5 text-xs text-[var(--ui-color-text)]">
                  Текущие баллы по дисциплинам
                </p>
              </div>
              <span className="au-badge au-badge--brand font-mono font-bold">
                Ср. 85.7
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {mockAcademicSubjects.map((sub) => (
                <div key={sub.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="font-medium text-[var(--ui-color-text)] truncate min-w-0 flex-1">
                      {sub.name}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[var(--ui-color-text)] shrink-0">
                      {sub.currentPoints}/100
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[var(--ui-color-surface-soft)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--ui-color-brand-strong)]"
                      style={{ width: `${sub.currentPoints}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[var(--ui-color-text-muted)] font-mono">
                    <span>Посещаемость: {sub.attendancePercent}%</span>
                    <span className="shrink-0">{sub.examType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Campus Ecosystem & Coworking Occupancy (Storybook Services & Spaces) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Campus Services */}
        <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)]">
          <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
                Сервисы экосистемы ИТС
              </h3>
              <p className="mt-0.5 text-xs text-[var(--ui-color-text)]">
                Быстрый доступ к кампусным сервисам
              </p>
            </div>
            <span className="au-badge au-badge--brand">
              ИТС Campus
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {mockCampusServices.slice(0, 4).map((srv) => (
              <a
                key={srv.id}
                href={srv.actionUrl}
                target={srv.actionUrl.startsWith("http") ? "_blank" : undefined}
                rel={srv.actionUrl.startsWith("http") ? "noreferrer" : undefined}
                onClick={
                  srv.actionUrl.startsWith("#")
                    ? (e) => {
                        e.preventDefault();
                        setOrderModalOpen(true);
                      }
                    : undefined
                }
                className="group flex items-center justify-between rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-2.5 transition hover:border-[var(--ui-color-brand-border)] hover:bg-[var(--ui-color-surface-subtle)] cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-[var(--ui-color-text)] group-hover:text-[var(--ui-color-text-accent)] transition">
                      {srv.name}
                    </span>
                    <span className="au-badge au-badge--neutral text-[9px]">
                      {srv.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--ui-color-text-muted)]">
                    {srv.description}
                  </p>
                </div>
                <ExternalLinkIcon className="w-3.5 h-3.5 text-[var(--ui-color-text-muted)] group-hover:text-[var(--ui-color-brand-strong)] shrink-0 transition" />
              </a>
            ))}
          </div>
        </div>

        {/* Coworking Occupancy */}
        <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)]">
          <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
                Коворкинги и лаборатории
              </h3>
              <p className="mt-0.5 text-xs text-[var(--ui-color-text)]">
                Свободные места в реальном времени
              </p>
            </div>
            <span className="au-badge au-badge--success">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-ping" />
              Live
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {mockCampusSpaces.map((sp) => {
              const statusBg =
                sp.loadPercent < 70 ? "bg-[#16a34a]" : sp.loadPercent < 90 ? "bg-[#f59e0b]" : "bg-[#e11d48]";

              return (
                <div key={sp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="font-medium text-[var(--ui-color-text)] truncate min-w-0 flex-1">
                      {sp.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--ui-color-status-success-text)] font-bold shrink-0">
                      {sp.freeSeats} мест свободно
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-[var(--ui-color-surface-soft)] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusBg}`}
                      style={{ width: `${sp.loadPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--ui-color-text-muted)] font-mono">
                    <span className="truncate max-w-[180px]">{sp.campus}</span>
                    <span className="shrink-0">{sp.workingHours}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Announcements Stream */}
        <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)] md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
                Объявления деканата
              </h3>
              <p className="mt-0.5 text-xs text-[var(--ui-color-text)]">
                События и уведомления
              </p>
            </div>
            <span className="au-badge au-badge--brand">
              3 новых
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {mockCampusAnnouncements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition"
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="au-badge au-badge--brand text-[9px]">
                    {ann.category}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--ui-color-text-muted)]">
                    {ann.date}
                  </span>
                </div>
                <h4 className="mt-1.5 text-xs font-semibold text-[var(--ui-color-text)]">
                  {ann.title}
                </h4>
                <p className="mt-1 text-xs text-[var(--ui-color-text-soft)] line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Lesson Details Modal from Storybook (Schedule/Lesson Details Modal - InformationAboutLesson) */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-5 sm:p-6 shadow-2xl text-[var(--ui-color-text)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[var(--ui-color-border)] pb-4">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <span className="au-badge au-badge--brand">
                    {selectedLesson.typeLabel}
                  </span>
                  {selectedLesson.status === "current" && (
                    <span className="au-badge au-badge--success">
                      Идет сейчас
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-[var(--ui-color-text)] leading-snug">
                  {selectedLesson.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)] cursor-pointer transition active:scale-95 shrink-0"
                aria-label="Закрыть"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Details Sections */}
            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              {/* Time & Day */}
              <div className="flex items-center gap-3 rounded-xl bg-[var(--ui-color-surface-soft)] p-3">
                <ClockIcon className="w-5 h-5 text-[var(--ui-color-brand-strong)] shrink-0" />
                <div>
                  <span className="block text-[11px] text-[var(--ui-color-text-muted)]">Время проведения:</span>
                  <strong className="text-[var(--ui-color-text)] font-semibold">
                    {selectedLesson.timeStart} – {selectedLesson.timeEnd} ({activeDay.dayName}, {activeDay.dateStr})
                  </strong>
                </div>
              </div>

              {/* Location & Navigation */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[var(--ui-color-border)] p-3.5">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[var(--ui-color-icon-accent)] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] text-[var(--ui-color-text-muted)]">Аудитория и корпус:</span>
                    <strong className="text-[var(--ui-color-text-accent)] font-semibold text-sm">
                      {selectedLesson.room}
                    </strong>
                    <p className="text-xs text-[var(--ui-color-text-muted)] mt-0.5">
                      {selectedLesson.campus}
                    </p>
                  </div>
                </div>

                <a
                  href="https://map.fa.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-lg border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] px-2.5 py-1.5 text-xs font-medium text-[var(--ui-color-text)] hover:border-[var(--ui-color-brand-border)] hover:text-[var(--ui-color-text-accent)] transition shrink-0"
                >
                  <span>На карте</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>

              {/* Teacher Contact Row */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--ui-color-border)] p-3.5">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-[var(--ui-color-text-muted)] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-[var(--ui-color-text-muted)]">Преподаватель:</span>
                    <strong className="text-[var(--ui-color-text)] font-semibold">
                      {selectedLesson.teacher}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyTeacherEmail("smirnov.av@fa.ru")}
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] px-2.5 py-1.5 text-xs font-medium text-[var(--ui-color-text)] hover:border-[var(--ui-color-brand-border)] hover:text-[var(--ui-color-text-accent)] transition cursor-pointer active:scale-95 shrink-0"
                  title="Написать преподавателю"
                >
                  <MailIcon className="w-3.5 h-3.5 text-[var(--ui-color-brand-strong)]" />
                  <span>Контакт</span>
                </button>
              </div>

              {copyFeedback && (
                <p className="text-xs text-[var(--ui-color-status-success-text)] font-medium text-center">
                  {copyFeedback}
                </p>
              )}

              {/* Subgroup Selector from Storybook lesson-variant-selector */}
              <div className="rounded-xl border border-[var(--ui-color-border)] p-3.5 space-y-2">
                <span className="block text-[11px] font-semibold text-[var(--ui-color-text-muted)] uppercase tracking-wider">
                  Подгруппа / Вариант занятия:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubgroup("all")}
                    className={`rounded-lg p-2 text-xs font-medium transition cursor-pointer border ${
                      selectedSubgroup === "all"
                        ? "border-[var(--ui-color-brand-strong)] bg-[var(--ui-color-brand-soft)] text-[var(--ui-color-text-accent)] font-bold"
                        : "border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)]"
                    }`}
                  >
                    Вся группа
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubgroup("sub1")}
                    className={`rounded-lg p-2 text-xs font-medium transition cursor-pointer border ${
                      selectedSubgroup === "sub1"
                        ? "border-[var(--ui-color-brand-strong)] bg-[var(--ui-color-brand-soft)] text-[var(--ui-color-text-accent)] font-bold"
                        : "border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)]"
                    }`}
                  >
                    1 подгруппа
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubgroup("sub2")}
                    className={`rounded-lg p-2 text-xs font-medium transition cursor-pointer border ${
                      selectedSubgroup === "sub2"
                        ? "border-[var(--ui-color-brand-strong)] bg-[var(--ui-color-brand-soft)] text-[var(--ui-color-text-accent)] font-bold"
                        : "border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)]"
                    }`}
                  >
                    2 подгруппа
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-5 flex items-center justify-end gap-2 border-t border-[var(--ui-color-border)] pt-4">
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="rounded-xl border border-[var(--ui-color-border)] px-4 py-2 text-xs font-semibold text-[var(--ui-color-text)] hover:bg-[var(--ui-color-surface-soft)] transition cursor-pointer active:scale-95"
              >
                Закрыть
              </button>
              <a
                href="https://online.fa.ru"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-[var(--ui-color-brand)] px-4 py-2 text-xs font-bold text-[var(--ui-color-on-brand)] hover:bg-[var(--ui-color-brand-strong)] transition cursor-pointer active:scale-95 shadow-xs"
              >
                Материалы в ЭИОС →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Kiosk Certificate Order Modal */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOrderModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-5 shadow-2xl text-[var(--ui-color-text)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--ui-color-border)] pb-3">
              <div>
                <span className="au-badge au-badge--brand">
                  Киоск самообслуживания
                </span>
                <h3 className="mt-1 text-base font-bold text-[var(--ui-color-text)]">
                  Заказ справок и документов
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOrderModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)] cursor-pointer transition active:scale-95"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ui-color-status-success-bg)] text-[var(--ui-color-status-success-text)]">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[var(--ui-color-text)]">Заявка успешно принята!</h4>
                <p className="text-xs text-[var(--ui-color-text-muted)]">
                  Справка будет сформирована и подписана ЭЦП в течение 24 часов. Уведомление придет в Telegram-бот.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ui-color-text-muted)] mb-1">
                    Тип необходимого документа:
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] px-3 py-2 text-xs text-[var(--ui-color-text)] focus:border-[var(--ui-color-brand-strong)] focus:outline-none"
                  >
                    <option>Справка об обучении с гербовой печатью</option>
                    <option>Выписка текущих оценок (транскрипт)</option>
                    <option>Справка для военного комиссариата (Приложение №4)</option>
                    <option>Справка о доходах / стипендии</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ui-color-text-muted)] mb-1">
                    Учебная группа и студент:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedGroup} · Студент ИТС`}
                    className="w-full rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] px-3 py-2 text-xs text-[var(--ui-color-text-muted)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ui-color-text-muted)] mb-1">
                    Формат получения:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 rounded-xl border border-[var(--ui-color-brand-strong)] bg-[var(--ui-color-brand-soft)] p-2.5 cursor-pointer font-medium text-[var(--ui-color-text)]">
                      <input type="radio" name="format" defaultChecked className="accent-[var(--ui-color-brand-strong)]" />
                      <span>С ЭЦП онлайн</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-2.5 cursor-pointer text-[var(--ui-color-text-muted)]">
                      <input type="radio" name="format" className="accent-[var(--ui-color-brand-strong)]" />
                      <span>Бумажный оригинал</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-[var(--ui-color-border)]">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="rounded-xl border border-[var(--ui-color-border)] px-3.5 py-1.5 text-xs font-medium text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)] cursor-pointer transition active:scale-95"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[var(--ui-color-brand)] px-4 py-1.5 text-xs font-bold text-[var(--ui-color-on-brand)] hover:bg-[var(--ui-color-brand-strong)] shadow-xs cursor-pointer active:scale-95 transition"
                  >
                    Подтвердить заказ
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
