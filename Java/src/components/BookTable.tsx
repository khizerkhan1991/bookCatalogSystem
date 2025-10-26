import { useState, useMemo } from 'react';
import { Book, SortConfig } from '@/types/book';
import { sortBooks } from '@/lib/bookUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'title',
    direction: 'asc',
  });

  const sortedBooks = useMemo(() => {
    return sortBooks(books, sortConfig);
  }, [books, sortConfig]);

  const handleSort = (key: keyof Book) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) {
      onDelete(id);
      toast.success('Book deleted successfully');
    }
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No books in the catalog yet. Add your first book!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">
              <Button
                variant="ghost"
                onClick={() => handleSort('title')}
                className="flex items-center gap-1 hover:bg-transparent font-semibold"
              >
                Title
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[25%]">
              <Button
                variant="ghost"
                onClick={() => handleSort('author')}
                className="flex items-center gap-1 hover:bg-transparent font-semibold"
              >
                Author
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[20%]">
              <Button
                variant="ghost"
                onClick={() => handleSort('genre')}
                className="flex items-center gap-1 hover:bg-transparent font-semibold"
              >
                Genre
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[10%]">
              <Button
                variant="ghost"
                onClick={() => handleSort('year')}
                className="flex items-center gap-1 hover:bg-transparent font-semibold"
              >
                Year
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[15%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBooks.map((book) => (
            <TableRow key={book.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(book)}
                  className="hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(book.id, book.title)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
