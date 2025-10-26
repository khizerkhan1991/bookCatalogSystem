/**
 * Book type definition for the cataloging system
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

/**
 * Search criteria for filtering books
 */
export interface SearchCriteria {
  by: 'title' | 'author' | 'genre';
  query: string;
}

/**
 * Sort configuration for book table
 */
export interface SortConfig {
  key: keyof Book;
  direction: 'asc' | 'desc';
}

/**
 * Grouped books for reports
 */
export interface GroupedBooks {
  [key: string]: Book[];
}
