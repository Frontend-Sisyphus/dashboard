type KioskSearchProps = {
  className?: string;
  fullWidth?: boolean;
};

export function KioskSearch({
  className = "",
  fullWidth = false,
}: KioskSearchProps) {
  return (
    <label
      className={`heimdall-search ${fullWidth ? "heimdall-search--wide" : ""} ${className}`}
      aria-label="Поиск по стенду"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0 opacity-70"
      >
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M16.5 16.5 20 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="search"
        placeholder="Найти расписание, услугу или событие…"
        autoComplete="off"
        enterKeyHint="search"
      />
    </label>
  );
}
