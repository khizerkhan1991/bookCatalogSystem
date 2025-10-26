import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/types/book';
import { STORAGE_KEY, generateId } from '@/lib/bookUtils';
import { SEED_BOOKS } from '@/lib/seedData';

/**
 * Custom hook for managing book catalog state with localStorage persistence
 */
export function useBookStore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load books from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Book[];
        setBooks(parsed);
      } else {
        // Initialize with seed data if empty
        const seedBooks = SEED_BOOKS.map((book) => ({
          ...book,
          id: generateId(),
        }));
        setBooks(seedBooks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedBooks));
      }
    } catch (error) {
      console.error('Error loading books from localStorage:', error);
      // Fallback to seed data
      const seedBooks = SEED_BOOKS.map((book) => ({
        ...book,
        id: generateId(),
      }));
      setBooks(seedBooks);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist to localStorage whenever books change
  useEffect(() => {
    if (isLoaded && books.length >= 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (error) {
        console.error('Error saving books to localStorage:', error);
      }
    }
  }, [books, isLoaded]);

  /**
   * Add a new book
   */
  const addBook = useCallback((book: Omit<Book, 'id'>): Book => {
    const newBook: Book = {
      ...book,
      id: generateId(),
    };
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  }, []);

  /**
   * Update an existing book
   */
  const updateBook = useCallback((id: string, updates: Partial<Omit<Book, 'id'>>): boolean => {
    let updated = false;
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === id) {
          updated = true;
          return { ...book, ...updates };
        }
        return book;
      })
    );
    return updated;
  }, []);

  /**
   * Delete a book
   */
  const deleteBook = useCallback((id: string): boolean => {
    let deleted = false;
    setBooks((prev) => {
      const filtered = prev.filter((book) => book.id !== id);
      deleted = filtered.length < prev.length;
      return filtered;
    });
    return deleted;
  }, []);

  /**
   * Get a book by ID
   */
  const getBookById = useCallback(
    (id: string): Book | undefined => {
      return books.find((book) => book.id === id);
    },
    [books]
  );

  return {
    books,
    isLoaded,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  };
}
