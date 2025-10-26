import { useState } from 'react';
import { Book } from '@/types/book';
import { useBookStore } from '@/hooks/useBookStore';
import { BookForm } from '@/components/BookForm';
import { BookTable } from '@/components/BookTable';
import { SearchPanel } from '@/components/SearchPanel';
import { ReportsPanel } from '@/components/ReportsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';

const Index = () => {
  const { books, isLoaded, addBook, updateBook, deleteBook } = useBookStore();
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleAddBook = (book: Omit<Book, 'id'>) => {
    addBook(book);
    setEditingBook(null);
  };

  const handleUpdateBook = (id: string, book: Omit<Book, 'id'>) => {
    updateBook(id, book);
    setEditingBook(null);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
    if (editingBook?.id === id) {
      setEditingBook(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Book Cataloging System</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Group 12 • Advanced Programming Languages • Professor Jay Thom
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Form */}
          <aside className="lg:col-span-4">
            <BookForm
              books={books}
              editingBook={editingBook}
              onSubmit={handleAddBook}
              onUpdate={handleUpdateBook}
              onCancelEdit={handleCancelEdit}
            />
          </aside>

          {/* Right Content Area - Tabs */}
          <section className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Books</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">All Books ({books.length})</h2>
                  </div>
                  <BookTable books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
                </div>
              </TabsContent>

              <TabsContent value="search" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Search Books</h2>
                  <SearchPanel books={books} />
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Reports</h2>
                  <ReportsPanel books={books} />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Day 2: Core Functionality • JavaScript Implementation (React + TypeScript) • October 25,
            2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
