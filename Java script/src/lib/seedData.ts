import { Book } from '@/types/book';

/**
 * Seed data for initial catalog population
 * These books are loaded on first run if localStorage is empty
 */
export const SEED_BOOKS: Omit<Book, 'id'>[] = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Software',
    year: 2008,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Software',
    year: 1999,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    year: 1965,
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    year: 2011,
  },
  {
    title: 'Neuromancer',
    author: 'William Gibson',
    genre: 'Science Fiction',
    year: 1984,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    year: 1937,
  },
];
