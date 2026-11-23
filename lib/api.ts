import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '@/types/note';

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await notehubApi.get(
    '/notes',
    {
      params: {
        page,
        perPage,
        ...(search.trim() && { search: search.trim() }),
        ...(tag && tag !== 'all' && { tag }),
      },
    },
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.post('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.delete(`/notes/${id}`);
  return response.data;
};
