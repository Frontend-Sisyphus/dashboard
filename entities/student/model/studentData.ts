export interface LessonItem {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  type: "lecture" | "seminar" | "lab" | "practice";
  typeLabel: string;
  room: string;
  campus: string;
  teacher: string;
  status: "past" | "current" | "upcoming";
}

export interface DaySchedule {
  dayName: string;
  dateStr: string;
  lessons: LessonItem[];
}

export interface StudentDeadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  daysLeft: number;
  points: number;
  priority: "high" | "medium" | "low";
}

export interface CampusServiceItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  category: "study" | "navigation" | "community" | "infrastructure";
  activeUsers: string;
  actionUrl: string;
}

export interface CampusSpace {
  id: string;
  name: string;
  campus: string;
  totalSeats: number;
  freeSeats: number;
  isOpen: boolean;
  workingHours: string;
  loadPercent: number;
}

export interface CampusAnnouncement {
  id: string;
  category: string;
  categoryTone: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface AcademicSubject {
  name: string;
  teacher: string;
  currentPoints: number;
  maxPoints: number;
  attendancePercent: number;
  examType: "Экзамен" | "Диф. зачет" | "Зачет";
}

// 1. Mock Schedule by Days
export const mockWeekSchedule: DaySchedule[] = [
  {
    dayName: "Понедельник",
    dateStr: "20 октября",
    lessons: [
      {
        id: "mon-1",
        timeStart: "08:30",
        timeEnd: "10:00",
        title: "Архитектура распределенных информационных систем",
        type: "lecture",
        typeLabel: "Лекция",
        room: "Ауд. 402",
        campus: "Ленинградский пр-т, 49",
        teacher: "проф. Смирнов А.В.",
        status: "past",
      },
      {
        id: "mon-2",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Проектирование микросервисов на Go & .NET",
        type: "lab",
        typeLabel: "Лабораторная",
        room: "Комп. класс 315",
        campus: "Ленинградский пр-т, 49",
        teacher: "доц. Николаев Д.М.",
        status: "current",
      },
      {
        id: "mon-3",
        timeStart: "12:15",
        timeEnd: "13:45",
        title: "Базы данных и высоконагруженные хранилища (PostgreSQL & Redis)",
        type: "seminar",
        typeLabel: "Семинар",
        room: "Ауд. 210",
        campus: "Ленинградский пр-т, 49",
        teacher: "ст. преп. Кузнецова О.Е.",
        status: "upcoming",
      },
    ],
  },
  {
    dayName: "Вторник",
    dateStr: "21 октября",
    lessons: [
      {
        id: "tue-1",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Информационная безопасность и криптография",
        type: "lecture",
        typeLabel: "Лекция",
        room: "Ауд. 504",
        campus: "Ленинградский пр-т, 51",
        teacher: "доц. Федоров И.Г.",
        status: "upcoming",
      },
      {
        id: "tue-2",
        timeStart: "12:15",
        timeEnd: "13:45",
        title: "DevOps: Docker, Kubernetes & CI/CD Pipelines",
        type: "lab",
        typeLabel: "Лабораторная",
        room: "Лаб. ИТС 412",
        campus: "Ленинградский пр-т, 49",
        teacher: "инж. Белов С.А.",
        status: "upcoming",
      },
      {
        id: "tue-3",
        timeStart: "14:00",
        timeEnd: "15:30",
        title: "Машинное обучение и анализ данных на Python",
        type: "seminar",
        typeLabel: "Семинар",
        room: "Ауд. 308",
        campus: "Ленинградский пр-т, 49",
        teacher: "доц. Морозова Е.В.",
        status: "upcoming",
      },
    ],
  },
  {
    dayName: "Среда",
    dateStr: "22 октября",
    lessons: [
      {
        id: "wed-1",
        timeStart: "08:30",
        timeEnd: "10:00",
        title: "Математическое моделирование экономических процессов",
        type: "lecture",
        typeLabel: "Лекция",
        room: "Ауд. 410",
        campus: "Щелковское ш., 38",
        teacher: "проф. Васильев В.П.",
        status: "upcoming",
      },
      {
        id: "wed-2",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Разработка мобильных приложений (Flutter & Swift)",
        type: "practice",
        typeLabel: "Практикум",
        room: "Класс Mac-лаб 204",
        campus: "Ленинградский пр-т, 49",
        teacher: "ассист. Волков М.И.",
        status: "upcoming",
      },
    ],
  },
  {
    dayName: "Четверг",
    dateStr: "23 октября",
    lessons: [
      {
        id: "thu-1",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Управление программными проектами (Agile/Scrum)",
        type: "seminar",
        typeLabel: "Семинар",
        room: "Коворкинг 4 этаж",
        campus: "Ленинградский пр-т, 49",
        teacher: "доц. Романов К.С.",
        status: "upcoming",
      },
      {
        id: "thu-2",
        timeStart: "12:15",
        timeEnd: "13:45",
        title: "Облачные вычисления и инфраструктурный код (IaC)",
        type: "lab",
        typeLabel: "Лабораторная",
        room: "Комп. класс 315",
        campus: "Ленинградский пр-т, 49",
        teacher: "доц. Николаев Д.М.",
        status: "upcoming",
      },
    ],
  },
  {
    dayName: "Пятница",
    dateStr: "24 октября",
    lessons: [
      {
        id: "fri-1",
        timeStart: "08:30",
        timeEnd: "10:00",
        title: "Теория алгоритмов и структуры данных",
        type: "lecture",
        typeLabel: "Лекция",
        room: "Ауд. 402",
        campus: "Ленинградский пр-т, 49",
        teacher: "проф. Смирнов А.В.",
        status: "upcoming",
      },
      {
        id: "fri-2",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Хакатон-мастерская: Командный спринт ИТС",
        type: "practice",
        typeLabel: "Проектный офис",
        room: "Open Space ИТС",
        campus: "Ленинградский пр-т, 49",
        teacher: "менторы ИТС",
        status: "upcoming",
      },
    ],
  },
  {
    dayName: "Суббота",
    dateStr: "25 октября",
    lessons: [
      {
        id: "sat-1",
        timeStart: "10:15",
        timeEnd: "11:45",
        title: "Военная подготовка / Общеуниверситетские факультативы",
        type: "seminar",
        typeLabel: "Факультатив",
        room: "Корпус Автозаводская",
        campus: "Автозаводская, 16",
        teacher: "Кафедра ВУЦ",
        status: "upcoming",
      },
    ],
  },
];

// 2. Mock Deadlines
export const mockStudentDeadlines: StudentDeadline[] = [
  {
    id: "dl-1",
    subject: "Архитектура распределенных систем",
    title: "Лабораторная работа 4: Event-Driven Kafka брокер",
    dueDate: "24 октября (Пт), 23:59",
    daysLeft: 2,
    points: 15,
    priority: "high",
  },
  {
    id: "dl-2",
    subject: "Базы данных и хранилища",
    title: "Проект: Оптимизация индексов и репликация PostgreSQL",
    dueDate: "27 октября (Пн), 18:00",
    daysLeft: 5,
    points: 20,
    priority: "medium",
  },
  {
    id: "dl-3",
    subject: "DevOps & CI/CD",
    title: "Helm Charts и деплой стейджинга в Kubernetes",
    dueDate: "31 октября (Пт), 23:59",
    daysLeft: 9,
    points: 15,
    priority: "low",
  },
];

// 3. Mock Campus Services for Students
export const mockCampusServices: CampusServiceItem[] = [
  {
    id: "fin-app",
    name: "ФИН Помощник",
    badge: "v2.8.4",
    tagline: "Супер-апп студента",
    description: "Электронное расписание, замены пар, цифровой студенческий билет и зачетка.",
    category: "study",
    activeUsers: "45,000+",
    actionUrl: "https://finhelper.fa.ru",
  },
  {
    id: "fin-bot",
    name: "FIN Helper Telegram",
    badge: "Bot",
    tagline: "Уведомления в Telegram",
    description: "Мгновенные оповещения о переносах аудиторий, домашних заданиях и оценках БРС.",
    category: "study",
    activeUsers: "32,000+",
    actionUrl: "https://t.me/finhelper_bot",
  },
  {
    id: "fin-map",
    name: "ФИН Навигатор 3D",
    badge: "FinMap",
    tagline: "Навигация по корпусам",
    description: "Интерактивная трехмерная карта корпусов Ленинградского и Щелковского кампусов.",
    category: "navigation",
    activeUsers: "18,000+",
    actionUrl: "https://map.fa.ru",
  },
  {
    id: "itc-cloud",
    name: "ITC Cloud Lab",
    badge: "Kubernetes",
    tagline: "Облако для студенческих проектов",
    description: "Бесплатные виртуальные машины, базы данных и GitLab Runner для учебных задач.",
    category: "infrastructure",
    activeUsers: "1,200+",
    actionUrl: "https://cloud.itc.fa.ru",
  },
  {
    id: "cert-request",
    name: "Справки и документы",
    badge: "Деканат",
    tagline: "Заказ справок онлайн",
    description: "Заказ справки об обучении, выписки оценок и подтверждения стипендии в 1 клик.",
    category: "community",
    activeUsers: "Онлайн",
    actionUrl: "#order-certificate",
  },
  {
    id: "coworking-book",
    name: "Бронь коворкинга ИТС",
    badge: "4 этаж",
    tagline: "Рабочие места и переговорки",
    description: "Бронирование зон для командной работы, митапов и подготовки к защитам дипломов.",
    category: "community",
    activeUsers: "Свободно 14 мест",
    actionUrl: "#book-space",
  },
];

// 4. Mock Campus Spaces / Coworking Load
export const mockCampusSpaces: CampusSpace[] = [
  {
    id: "sp-1",
    name: "Коворкинг ИТС (Open Space)",
    campus: "Ленинградский пр-т, 49 (4 этаж)",
    totalSeats: 40,
    freeSeats: 14,
    isOpen: true,
    workingHours: "08:00 – 22:00",
    loadPercent: 65,
  },
  {
    id: "sp-2",
    name: "Лаборатория распределенных систем",
    campus: "Ленинградский пр-т, 49 (ауд. 412)",
    totalSeats: 24,
    freeSeats: 8,
    isOpen: true,
    workingHours: "09:00 – 20:00",
    loadPercent: 67,
  },
  {
    id: "sp-3",
    name: "Медиа-студия и подкастная",
    campus: "Ленинградский пр-т, 51 (ауд. 102)",
    totalSeats: 6,
    freeSeats: 2,
    isOpen: true,
    workingHours: "10:00 – 19:00",
    loadPercent: 66,
  },
  {
    id: "sp-4",
    name: "Тихая зона библиотеки",
    campus: "Ленинградский пр-т, 49 (2 этаж)",
    totalSeats: 60,
    freeSeats: 29,
    isOpen: true,
    workingHours: "08:30 – 21:00",
    loadPercent: 51,
  },
];

// 5. Mock Announcements
export const mockCampusAnnouncements: CampusAnnouncement[] = [
  {
    id: "an-1",
    category: "Хакатон",
    categoryTone: "border-primary/40 bg-primary/15 text-primary",
    title: "Открыта регистрация на ФинТех Хакатон ИТС 2026",
    content: "Призовой фонд 500,000 ₽. Кейсы от ведущих банков и IT-компаний. Команды от 3 до 5 человек. Финал в главном атриуме.",
    author: "Совет ИТС",
    date: "Сегодня, 11:30",
  },
  {
    id: "an-2",
    category: "Учеба",
    categoryTone: "border-ok/40 bg-ok/15 text-ok",
    title: "График промежуточной аттестации (контрольные недели)",
    content: "С 27 октября по 2 ноября пройдут контрольные срезы по всем профильным дисциплинам направления ПИ и ИБ.",
    author: "Учебный отдел",
    date: "Вчера, 16:45",
  },
  {
    id: "an-3",
    category: "Инфраструктура",
    categoryTone: "border-blue/40 bg-blue/15 text-blue",
    title: "Обновление Wi-Fi сети FA_STUDENT в корпусе на Щелковском",
    content: "Установлены новые точки доступа Wi-Fi 6 на 3 и 4 этажах. Для подключения используйте единый студенческий логин.",
    author: "ИТ-департамент",
    date: "19 октября",
  },
];

// 6. Academic Grades (БРС)
export const mockAcademicSubjects: AcademicSubject[] = [
  {
    name: "Архитектура информационных систем",
    teacher: "Смирнов А.В.",
    currentPoints: 88,
    maxPoints: 100,
    attendancePercent: 96,
    examType: "Экзамен",
  },
  {
    name: "Базы данных и хранилища",
    teacher: "Кузнецова О.Е.",
    currentPoints: 92,
    maxPoints: 100,
    attendancePercent: 100,
    examType: "Экзамен",
  },
  {
    name: "DevOps и оркестрация",
    teacher: "Белов С.А.",
    currentPoints: 84,
    maxPoints: 100,
    attendancePercent: 91,
    examType: "Диф. зачет",
  },
  {
    name: "Машинное обучение на Python",
    teacher: "Морозова Е.В.",
    currentPoints: 79,
    maxPoints: 100,
    attendancePercent: 88,
    examType: "Зачет",
  },
];
