import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BookCatalog {

    private static final List<Book> books = new ArrayList<>();

    public static void savedBooks(){
        books.add(new Book("Dune", "Frank Herbert", "Science Fiction", 1965));
        books.add(new Book("One Hundred Years of Solitude", "Gabriel García Márquez", "Magical Realism, Literary Fiction", 1967));
        books.add(new Book("And Then There Were None", "Agatha Christie", "Mystery", 1939));
        books.add(new Book("Harry Potter", "J.K. Rowling", "mystery", 1997));
    }
    public static void addBook(Book book) {
        books.add(book);
    }

    public static boolean removeBook(String title) {
        return books.removeIf(b -> b.getTitle().equalsIgnoreCase(title));
    }

    public static List<Book> searchByTitle(String title) {
        return books.stream()
                .filter(b -> b.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    public static List<Book> searchByAuthor(String author) {
        return books.stream()
                .filter(b -> b.getAuthor().toLowerCase().contains(author.toLowerCase()))
                .collect(Collectors.toList());
    }

    public static List<Book> searchByGenre(String genre) {
        return books.stream()
                .filter(b -> b.getGenre().equalsIgnoreCase(genre))
                .collect(Collectors.toList());
    }

    public static List<Book> getAllBooks() {
        return books;
    }
}
