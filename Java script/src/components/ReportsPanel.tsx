import { useMemo, useState } from 'react';
import { Book } from '@/types/book';
import { groupBooksBy } from '@/lib/bookUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ReportsPanelProps {
  books: Book[];
}

export function ReportsPanel({ books }: ReportsPanelProps) {
  const [openGenreGroups, setOpenGenreGroups] = useState<Set<string>>(new Set());
  const [openAuthorGroups, setOpenAuthorGroups] = useState<Set<string>>(new Set());

  const booksByGenre = useMemo(() => groupBooksBy(books, 'genre'), [books]);
  const booksByAuthor = useMemo(() => groupBooksBy(books, 'author'), [books]);

  const toggleGenreGroup = (genre: string) => {
    setOpenGenreGroups((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) {
        next.delete(genre);
      } else {
        next.add(genre);
      }
      return next;
    });
  };

  const toggleAuthorGroup = (author: string) => {
    setOpenAuthorGroups((prev) => {
      const next = new Set(prev);
      if (next.has(author)) {
        next.delete(author);
      } else {
        next.add(author);
      }
      return next;
    });
  };

  const genreEntries = Object.entries(booksByGenre).sort(([a], [b]) => a.localeCompare(b));
  const authorEntries = Object.entries(booksByAuthor).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      {/* Books by Genre */}
      <Card>
        <CardHeader>
          <CardTitle>Books by Genre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {genreEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No books to display</p>
          ) : (
            genreEntries.map(([genre, genreBooks]) => (
              <Collapsible
                key={genre}
                open={openGenreGroups.has(genre)}
                onOpenChange={() => toggleGenreGroup(genre)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    {openGenreGroups.has(genre) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{genre}</span>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    {genreBooks.length} {genreBooks.length === 1 ? 'book' : 'books'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 pt-2 space-y-1">
                  {genreBooks.map((book) => (
                    <div
                      key={book.id}
                      className="p-2 rounded hover:bg-muted/30 transition-colors text-sm"
                    >
                      <div className="font-medium">{book.title}</div>
                      <div className="text-muted-foreground">
                        {book.author} ({book.year})
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>

      {/* Books by Author */}
      <Card>
        <CardHeader>
          <CardTitle>Books by Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {authorEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No books to display</p>
          ) : (
            authorEntries.map(([author, authorBooks]) => (
              <Collapsible
                key={author}
                open={openAuthorGroups.has(author)}
                onOpenChange={() => toggleAuthorGroup(author)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    {openAuthorGroups.has(author) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{author}</span>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    {authorBooks.length} {authorBooks.length === 1 ? 'book' : 'books'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 pt-2 space-y-1">
                  {authorBooks.map((book) => (
                    <div
                      key={book.id}
                      className="p-2 rounded hover:bg-muted/30 transition-colors text-sm"
                    >
                      <div className="font-medium">{book.title}</div>
                      <div className="text-muted-foreground">
                        {book.genre} ({book.year})
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
