// lib/api.ts

import axios from 'axios';

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

// export const getNotes = async () => {
//   const res = await axios.get<NoteListResponse>('/notes');
//   return res.data;
// };

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export const getNotes = async () => {
//   await delay(2000); // штучна пауза
//   const res = await axios.get<NoteListResponse>('/notes');
//   return res.data;
// };

export const getSingleNote = async (id: Note['id']) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get<Category[]>('/categories');
  return res.data;
};

export const getNotes = async (categoryId?: string) => {
  const res = await axios.get<NoteListResponse>('/notes', {
    params: { categoryId },
  });
  return res.data;
};
