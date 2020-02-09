export interface Audio {
  id?: string;
  url: string;
  formats?: {};
  author: string;
  description?: string;
  title: string;
}

export interface Video {
  url: string;
  formats: {};
  author: string;
  title: string;
  id: string;
  description: string;
  date: Date;
  time: number
}
