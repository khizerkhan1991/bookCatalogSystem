import { useState, useEffect, useMemo } from 'react';
import { Book, SearchCriteria } from '@/types/book';
import { searchBooks, debounce } from '@/lib/bookUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';

interface SearchPanelProps {
  books: Book[];
}

export function SearchPanel({ books }: SearchPanelProps) {
  const [searchBy, setSearchBy] = useState<'title' | 'author' | 'genre'>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query (300ms)
  useEffect(() => {
    const debouncedUpdate = debounce((query: string) => {
      setDebouncedQuery(query);
    }, 300);

    debouncedUpdate(searchQuery);
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    const criteria: SearchCriteria = {
      by: searchBy,
      query: debouncedQuery,
    };
    return searchBooks(books, criteria);
  }, [books, searchBy, debouncedQuery]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="searchBy">Search By</Label>
          <Select value={searchBy} onValueChange={(value: any) => setSearchBy(value)}>
            <SelectTrigger id="searchBy">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="genre">Genre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="searchQuery">Search Query</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${searchBy}...`}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Search Results ({searchResults.length})
        </h3>
        {searchResults.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">
              {debouncedQuery
                ? 'No books match your search criteria'
                : 'Enter a search query to find books'}
            </p>
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Title</TableHead>
                  <TableHead className="w-[25%]">Author</TableHead>
                  <TableHead className="w-[25%]">Genre</TableHead>
                  <TableHead className="w-[20%]">Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((book) => (
                  <TableRow key={book.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
