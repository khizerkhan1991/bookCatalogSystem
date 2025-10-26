import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { validateBook, findDuplicate, sanitizeString } from '@/lib/bookUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface BookFormProps {
  books: Book[];
  editingBook: Book | null;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  onUpdate: (id: string, book: Omit<Book, 'id'>) => void;
  onCancelEdit: () => void;
}

export function BookForm({ books, editingBook, onSubmit, onUpdate, onCancelEdit }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setYear(editingBook.year.toString());
    }
  }, [editingBook]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setYear('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedTitle = sanitizeString(title);
    const sanitizedAuthor = sanitizeString(author);
    const sanitizedGenre = sanitizeString(genre);
    const yearNum = parseInt(year, 10);

    // Validate inputs
    const validation = validateBook(sanitizedTitle, sanitizedAuthor, sanitizedGenre, yearNum);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    // Check for duplicates
    const duplicate = findDuplicate(books, sanitizedTitle, sanitizedAuthor, editingBook?.id);
    if (duplicate) {
      if (duplicate.year === yearNum) {
        toast.error('This book already exists in the catalog');
        return;
      } else {
        // Different year - confirm it's a different edition
        const confirmed = window.confirm(
          `A book with this title and author already exists (${duplicate.year}). Add this as a different edition (${yearNum})?`
        );
        if (!confirmed) return;
      }
    }

    const bookData = {
      title: sanitizedTitle,
      author: sanitizedAuthor,
      genre: sanitizedGenre,
      year: yearNum,
    };

    if (editingBook) {
      onUpdate(editingBook.id, bookData);
      toast.success('Book updated successfully');
    } else {
      onSubmit(bookData);
      toast.success('Book added successfully');
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader>
        <CardTitle>{editingBook ? 'Update Book' : 'Add New Book'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">
              Author <span className="text-destructive">*</span>
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">
              Genre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter genre"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">
              Year <span className="text-destructive">*</span>
            </Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter publication year"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              {editingBook ? 'Update Book' : 'Add Book'}
            </Button>
            {editingBook && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
