import { Book, SearchCriteria, SortConfig, GroupedBooks } from '@/types/book';

/**
 * Constants
 */
export const STORAGE_KEY = 'bookCatalog.v1';
export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 1450;

/**
 * Generate a simple UUID v4
 */
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Sanitize string input (trim whitespace)
 */
export function sanitizeString(str: string): string {
  return str.trim();
}

/**
 * Validate book data
 */
export function validateBook(
  title: string,
  author: string,
  genre: string,
  year: number
): { valid: boolean; error?: string } {
  if (!sanitizeString(title)) {
    return { valid: false, error: 'Title is required' };
  }
  if (!sanitizeString(author)) {
    return { valid: false, error: 'Author is required' };
  }
  if (!sanitizeString(genre)) {
    return { valid: false, error: 'Genre is required' };
  }
  if (!year || isNaN(year)) {
    return { valid: false, error: 'Valid year is required' };
  }
  if (year < MIN_YEAR || year > CURRENT_YEAR) {
    return { valid: false, error: `Year must be between ${MIN_YEAR} and ${CURRENT_YEAR}` };
  }
  return { valid: true };
}

/**
 * Check if a book with the same title and author exists
 */
export function findDuplicate(
  books: Book[],
  title: string,
  author: string,
  excludeId?: string
): Book | undefined {
  return books.find(
    (book) =>
      book.id !== excludeId &&
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
  );
}

/**
 * Search books based on criteria (case-insensitive, partial match)
 */
export function searchBooks(books: Book[], criteria: SearchCriteria): Book[] {
  const query = criteria.query.toLowerCase().trim();
  if (!query) return books;

  return books.filter((book) => {
    const value = book[criteria.by].toString().toLowerCase();
    return value.includes(query);
  });
}

/**
 * Sort books by a given key and direction
 */
export function sortBooks(books: Book[], config: SortConfig): Book[] {
  const sorted = [...books].sort((a, b) => {
    const aVal = a[config.key];
    const bVal = b[config.key];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return config.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return config.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return sorted;
}

/**
 * Group books by a specific field using reduce
 */
export function groupBooksBy(books: Book[], field: 'genre' | 'author'): GroupedBooks {
  return books.reduce((acc, book) => {
    const key = book[field];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(book);
    return acc;
  }, {} as GroupedBooks);
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
