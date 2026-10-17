/** Направления сообщества (как на сайте ИТС) */
export type TrackId = "hackathons" | "olympiads" | "grants";

export type TrackCard = {
  id: TrackId;
  title: string;
  kicker: string;
  text: string;
};

export const communityTracks: TrackCard[] = [
  {
    id: "hackathons",
    title: "Хакатоны",
    kicker: "команды",
    text: "Двухсуточные командные марафоны: быстро делим роли и собираем рабочий набросок решения под задачу.",
  },
  {
    id: "olympiads",
    title: "Олимпиады",
    kicker: "тренировки",
    text: "Спортивное программирование, олимпиады по данным и искусственному интеллекту — разборы и выезды.",
  },
  {
    id: "grants",
    title: "Гранты",
    kicker: "заявки",
    text: "От идеи до пакета документов: заявка, смета и защита перед комиссией.",
  },
];
