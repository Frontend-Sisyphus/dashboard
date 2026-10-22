export type ApiUser = {
  id?: number;
  telegram_id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  username?: string;
  photo_url?: string | null;
  role?: string;
  technologies?: string[];
  github_url?: string;
  is_online?: boolean;
  level_of_access?: string;
};

export type ApiProjectMember = {
  full_name?: string;
  username?: string;
  role?: string;
  telegram_id?: string;
};

export type ApiProjectStack = Record<string, string[]>;

export type ApiProject = {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  project_type?: string;
  stack?: ApiProjectStack;
  members?: ApiProjectMember[];
};

export type ApiTechnology = {
  id: number;
  label: string;
  type_id: number;
};

export type ApiTechnologyType = {
  id: number;
  label: string;
};

export type ApiTechnologyCatalog = {
  technologies: ApiTechnology[];
  types: ApiTechnologyType[];
};
