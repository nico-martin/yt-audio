import { number } from 'prop-types';

export interface Audio {
  id?: string;
  url: string;
  formats?: {};
  author: string;
  description?: string;
  title: string;
  images?: Array<{
    width: number;
    height: number;
    url: string;
  }>;
}

export interface Video {
  url: string;
  formats: {};
  author: string;
  title: string;
  id: string;
  description: string;
  date: Date;
  time: number;
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}
