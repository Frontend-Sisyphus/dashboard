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

// Minimal SVG Icons (no emojis)
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

function BookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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

function AlertCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function UsersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

export function BifrostStudentScreen() {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // Monday default
  const [selectedGroup, setSelectedGroup] = useState("ПИ23-1");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [certType, setCertType] = useState("Справка об обучении с гербовой печатью");

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

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-5 lg:gap-6">
      {/* 1. Student Campus Header & Quick Status Bar */}
      <div className="rounded-xl border border-border bg-elevated/80 p-3.5 shadow-sm backdrop-blur-md transition-colors sm:p-5">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
                Кампусный портал и сервисы Биврёст
              </h2>
              <span className="rounded-md border border-primary/30 bg-primary/15 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">
                Студенческий хаб ИТС
              </span>
            </div>
            <p className="mt-1 text-xs text-fg-muted leading-relaxed max-w-3xl">
              Расписание занятий, дедлайны по предметам, занятость коворкингов и сервисы Финансового университета
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:items-center text-xs font-mono">
            {/* Week & Semester Badges */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-2.5 py-1.5 text-foreground text-[11px] sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-ok animate-pulse shrink-0" />
                <span className="truncate">8-я неделя (Чётная)</span>
              </span>

              {/* Quick Service Action (Mobile & Tablet) */}
              <button
                type="button"
                onClick={() => setOrderModalOpen(true)}
                className="flex-1 sm:flex-none text-center rounded-lg border border-primary/40 bg-primary/20 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-foreground hover:bg-primary hover:text-[#042428] transition cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Заказать справку
              </button>
            </div>

            {/* Group Switcher - Scrollable horizontally on mobile */}
            <div className="flex items-center overflow-x-auto py-0.5 no-scrollbar">
              <div className="inline-flex rounded-lg border border-border bg-muted/60 p-0.5 text-xs shrink-0">
                {groups.map((grp) => (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setSelectedGroup(grp)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                      selectedGroup === grp
                        ? "bg-primary text-[#042428] font-bold shadow-xs"
                        : "text-fg-muted hover:text-foreground"
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current / Ongoing Pair Alert Strip */}
        <div className="mt-3.5 flex flex-col gap-2.5 border-t border-border/60 pt-3 text-xs md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-ok/20 text-ok shrink-0">
              <span className="h-2 w-2 rounded-full bg-ok animate-ping" />
            </span>
            <span className="text-fg-muted text-[11px] sm:text-xs shrink-0">Сейчас идет:</span>
            <strong className="text-foreground text-[11px] sm:text-xs font-semibold truncate max-w-[280px] sm:max-w-md">
              Проектирование микросервисов на Go & .NET
            </strong>
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-fg-muted border border-border/40 whitespace-nowrap">
              Ауд. 315 · Ленинградский пр-т, 49
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-[11px] text-fg-muted shrink-0">
            <span>До конца: <strong className="text-primary font-bold">42 мин</strong></span>
            <span>·</span>
            <span>След: <strong className="text-foreground">БД (12:15)</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Main Row: Schedule Console (8 cols) + Deadlines (4 cols) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
        {/* Left Column (8 cols): Interactive Schedule Matrix */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5 lg:col-span-8">
          <div>
            {/* Header with Day Switcher */}
            <div className="flex flex-col gap-3 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                    Расписание занятий группы {selectedGroup}
                  </h3>
                </div>
                <p className="mt-0.5 text-xs text-foreground/80">
                  {activeDay.dayName}, {activeDay.dateStr}
                </p>
              </div>

              {/* Day Pills: horizontal scrollable on mobile, flexible on desktop */}
              <div className="flex w-full sm:w-auto items-center overflow-x-auto no-scrollbar py-0.5">
                <div className="inline-flex w-full sm:w-auto justify-between rounded-lg border border-border bg-muted/60 p-0.5 text-xs">
                  {mockWeekSchedule.map((d, idx) => (
                    <button
                      key={d.dayName}
                      type="button"
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`flex-1 sm:flex-initial text-center rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                        selectedDayIdx === idx
                          ? "bg-primary text-[#042428] font-bold shadow-xs"
                          : "text-fg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="sm:hidden">{d.dayName.slice(0, 2)}</span>
                      <span className="hidden sm:inline">{d.dayName.slice(0, 3)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List of Lessons */}
            <div className="mt-4 space-y-3">
              {activeDay.lessons.map((lesson) => {
                const isCurrent = lesson.status === "current";
                const isPast = lesson.status === "past";

                const typeBadge =
                  lesson.type === "lab"
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : lesson.type === "lecture"
                    ? "border-blue/40 bg-blue/15 text-blue"
                    : lesson.type === "practice"
                    ? "border-ok/40 bg-ok/15 text-ok"
                    : "border-warn/40 bg-warn/15 text-warn";

                return (
                  <div
                    key={lesson.id}
                    className={`flex flex-col justify-between gap-3 rounded-xl border p-3 sm:p-3.5 transition-all sm:flex-row sm:items-center sm:gap-4 ${
                      isCurrent
                        ? "border-primary bg-primary/10 shadow-sm"
                        : isPast
                        ? "border-border/50 bg-muted/30 opacity-70"
                        : "border-border bg-muted/40 hover:border-border-strong hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                      {/* Time slot */}
                      <div className="shrink-0 text-center font-mono w-12 sm:w-14">
                        <span className="block text-xs font-bold text-foreground">
                          {lesson.timeStart}
                        </span>
                        <span className="block text-[10px] text-fg-muted">
                          {lesson.timeEnd}
                        </span>
                        {isCurrent && (
                          <span className="mt-1 inline-block rounded bg-ok px-1 py-0.2 text-[8px] font-bold uppercase text-[#042428]">
                            Сейчас
                          </span>
                        )}
                      </div>

                      <div className="border-l border-border/60 pl-2.5 sm:pl-3.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span
                            className={`rounded border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${typeBadge}`}
                          >
                            {lesson.typeLabel}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground">
                            {lesson.room}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-fg-muted truncate">
                            ({lesson.campus})
                          </span>
                        </div>

                        <h4 className="mt-1 text-xs sm:text-sm font-bold text-foreground leading-snug break-words">
                          {lesson.title}
                        </h4>

                        <p className="mt-0.5 text-[11px] sm:text-xs text-fg-muted truncate">
                          Преподаватель: <span className="text-foreground">{lesson.teacher}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-end gap-2 sm:shrink-0 pt-2 border-t border-border/40 sm:border-0 sm:pt-0">
                      <a
                        href="https://map.fa.ru"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-elevated/70 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary hover:text-primary transition"
                        title="Показать маршрут в FinMap"
                      >
                        <MapPinIcon className="w-3.5 h-3.5 text-primary" />
                        <span>Маршрут</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schedule Footer */}
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border/60 pt-3 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono">
              Всего занятий в этот день: <strong className="text-foreground">{activeDay.lessons.length}</strong>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px]">
              Синхронизировано с расписанием 1С:Университет
            </span>
          </div>
        </div>

        {/* Right Column (4 cols): Deadlines & Control Points */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5 lg:col-span-4">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Ближайшие дедлайны
                </h3>
                <p className="mt-0.5 text-xs text-foreground/80">
                  Лабораторные и контрольные точки
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-warn">
                {mockStudentDeadlines.length} задачи
              </span>
            </div>

            {/* Deadline Cards */}
            <div className="mt-3.5 space-y-3">
              {mockStudentDeadlines.map((dl) => {
                const isUrgent = dl.daysLeft <= 2;

                return (
                  <div
                    key={dl.id}
                    className={`rounded-xl border p-3 flex flex-col justify-between transition-all ${
                      isUrgent
                        ? "border-warn/40 bg-warn/10"
                        : "border-border/70 bg-muted/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                          {dl.subject}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            isUrgent ? "text-warn" : "text-ok"
                          }`}
                        >
                          Осталось {dl.daysLeft} дн.
                        </span>
                      </div>

                      <h4 className="mt-1.5 text-xs font-bold text-foreground leading-snug">
                        {dl.title}
                      </h4>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] font-mono text-fg-muted">
                      <span>Срок: {dl.dueDate}</span>
                      <span className="font-bold text-primary">+{dl.points} баллов БРС</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOrderModalOpen(true)}
            className="mt-4 w-full rounded-lg border border-border bg-muted/60 py-2 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition cursor-pointer active:scale-98"
          >
            Все задания и зачетка в ФИН Помощнике →
          </button>
        </div>
      </div>

      {/* 3. Secondary Row: Campus Services (4 cols) + Spaces Occupancy (4 cols) + Grades BRS (4 cols) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Campus Services & Apps */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                Сервисы экосистемы ИТС
              </h3>
              <p className="mt-0.5 text-xs text-foreground/80">
                Быстрый доступ к приложениям
              </p>
            </div>
            <span className="text-[11px] font-mono text-primary font-bold">ИТС Campus</span>
          </div>

          <div className="mt-3.5 space-y-2">
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
                className="group flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-2.5 transition hover:border-primary/50 hover:bg-muted/60 cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-brand font-bold text-xs text-foreground group-hover:text-primary transition">
                      {srv.name}
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.2 text-[8px] font-mono font-bold text-fg-muted uppercase">
                      {srv.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-fg-muted">
                    {srv.description}
                  </p>
                </div>
                <ExternalLinkIcon className="w-3.5 h-3.5 text-fg-muted group-hover:text-primary shrink-0 transition" />
              </a>
            ))}
          </div>
        </div>

        {/* Campus Spaces & Coworking Occupancy */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                Коворкинги и лаборатории
              </h3>
              <p className="mt-0.5 text-xs text-foreground/80">
                Свободные места в реальном времени
              </p>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-mono text-ok">
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-ping" />
              Live
            </span>
          </div>

          <div className="mt-3.5 space-y-3">
            {mockCampusSpaces.map((sp) => {
              const statusTone =
                sp.loadPercent < 70 ? "bg-ok" : sp.loadPercent < 90 ? "bg-warn" : "bg-critical";

              return (
                <div key={sp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="font-medium text-foreground truncate min-w-0 flex-1">
                      {sp.name}
                    </span>
                    <span className="font-mono text-[11px] text-ok font-bold shrink-0">
                      {sp.freeSeats} мест свободно
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusTone}`}
                      style={{ width: `${sp.loadPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-fg-muted font-mono">
                    <span className="truncate max-w-[180px]">{sp.campus}</span>
                    <span className="shrink-0">{sp.workingHours}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic BRS Progress */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                Успеваемость и рейтинг БРС
              </h3>
              <p className="mt-0.5 text-xs text-foreground/80">
                Текущие баллы по дисциплинам
              </p>
            </div>
            <span className="text-[11px] font-mono text-primary font-bold">Ср. 85.7</span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {mockAcademicSubjects.map((sub) => (
              <div key={sub.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="font-medium text-foreground truncate min-w-0 flex-1">
                    {sub.name}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-foreground shrink-0">
                    {sub.currentPoints}/100
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${sub.currentPoints}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-fg-muted font-mono">
                  <span>Посещаемость: {sub.attendancePercent}%</span>
                  <span className="shrink-0">{sub.examType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Campus Announcements Stream */}
      <div className="rounded-xl border border-border bg-elevated/80 p-3.5 shadow-xs backdrop-blur-md transition-colors sm:p-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
              Объявления деканата и новости кампуса
            </h3>
            <p className="mt-0.5 text-xs text-foreground/80">
              Важная информация об учебном процессе, мероприятиях и хакатонах
            </p>
          </div>
          <span className="text-[11px] font-mono text-fg-muted">3 новых</span>
        </div>

        <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockCampusAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="flex flex-col justify-between rounded-xl border border-border/70 bg-muted/30 p-3 sm:p-3.5 transition hover:border-border-strong"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`rounded border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${ann.categoryTone}`}
                  >
                    {ann.category}
                  </span>
                  <span className="font-mono text-[10px] text-fg-muted">
                    {ann.date}
                  </span>
                </div>

                <h4 className="mt-2 text-xs font-bold text-foreground leading-snug">
                  {ann.title}
                </h4>

                <p className="mt-1 text-xs text-foreground/80 leading-relaxed line-clamp-3">
                  {ann.content}
                </p>
              </div>

              <div className="mt-3 border-t border-border/40 pt-2 text-[10px] font-mono text-fg-muted">
                Источник: <strong className="text-foreground">{ann.author}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Kiosk Certificate Order Modal */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOrderModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-elevated p-4 sm:p-5 shadow-2xl text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="rounded bg-primary/20 text-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Киоск самообслуживания
                </span>
                <h3 className="font-brand mt-1 text-sm sm:text-base font-bold text-foreground">
                  Заказ справок и документов
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOrderModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/60 text-fg-muted hover:text-foreground cursor-pointer transition active:scale-95"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ok/20 text-ok">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Заявка успешно принята!</h4>
                <p className="text-xs text-fg-muted">
                  Справка будет сформирована и подписана ЭЦП в течение 24 часов. Уведомление придет в Telegram-бот.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="mt-4 space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-fg-muted mb-1">
                    Тип необходимого документа:
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full rounded-lg border border-border bg-muted/60 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    <option>Справка об обучении с гербовой печатью</option>
                    <option>Выписка текущих оценок (транскрипт)</option>
                    <option>Справка для военного комиссариата (Приложение №4)</option>
                    <option>Справка о доходах / стипендии</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-fg-muted mb-1">
                    Учебная группа и студент:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedGroup} · Студент ИТС`}
                    className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-fg-muted"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-fg-muted mb-1">
                    Формат получения:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 p-2 cursor-pointer font-medium text-foreground">
                      <input type="radio" name="format" defaultChecked className="accent-primary" />
                      <span>В электронном виде с ЭЦП</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-2 cursor-pointer text-fg-muted">
                      <input type="radio" name="format" className="accent-primary" />
                      <span>Бумажный оригинал в деканате</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-foreground cursor-pointer transition active:scale-95"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-[#042428] hover:opacity-90 shadow-xs cursor-pointer active:scale-95 transition"
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
