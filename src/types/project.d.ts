export type Project = {
  project: ProjectElement[];
};

export type ProjectElement = {
  id;
  name: string;
  description: string;
  url: string;
  github_url: string;
  tech: string[];
  image_url: string | null;
  views: number;
};

export type Image = {
  url: string;
  alt: string;
};
