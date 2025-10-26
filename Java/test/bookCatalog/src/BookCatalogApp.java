import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.util.List;

public class BookCatalogApp extends Application {

    @Override
    public void start(Stage stage) {
        showMainMenu(stage);
        BookCatalog.savedBooks();
    }

    private void showMainMenu(Stage stage) {
        Button addButton = new Button("Add Book");
        Button removeButton = new Button("Remove Book");
        Button searchButton = new Button("Search Books");
        Button reportButton = new Button("View All Books");

        addButton.setOnAction(e -> showAddBookScreen(stage));
        removeButton.setOnAction(e -> showRemoveBookScreen(stage));
        searchButton.setOnAction(e -> showSearchBookScreen(stage));
        reportButton.setOnAction(e -> showAllBooksScreen(stage));

        VBox layout = new VBox(15);
        layout.setPadding(new Insets(20));
        layout.getChildren().addAll(addButton, removeButton, searchButton, reportButton);

        stage.setTitle("📚 Book Catalog System");
        stage.setScene(new Scene(layout, 400, 300));
        stage.show();
    }

    private void showAddBookScreen(Stage stage) {
        Label titleLabel = new Label("Title:");
        TextField titleField = new TextField();

        Label authorLabel = new Label("Author:");
        TextField authorField = new TextField();

        Label genreLabel = new Label("Genre:");
        TextField genreField = new TextField();

        Label yearLabel = new Label("Publication Year:");
        TextField yearField = new TextField();

        Button saveButton = new Button("Save");
        Button backButton = new Button("Back");

        Label messageLabel = new Label();

        saveButton.setOnAction(e -> {
            try {
                BookCatalog.addBook(new Book(
                        titleField.getText(),
                        authorField.getText(),
                        genreField.getText(),
                        Integer.parseInt(yearField.getText())
                ));
                messageLabel.setText("✅ Book added successfully!");
                titleField.clear(); authorField.clear(); genreField.clear(); yearField.clear();
            } catch (Exception ex) {
                messageLabel.setText("❌ Invalid input!");
            }
        });

        backButton.setOnAction(e -> showMainMenu(stage));

        VBox layout = new VBox(10);
        layout.setPadding(new Insets(20));
        layout.getChildren().addAll(
                titleLabel, titleField,
                authorLabel, authorField,
                genreLabel, genreField,
                yearLabel, yearField,
                saveButton, backButton, messageLabel);

        stage.setScene(new Scene(layout, 400, 400));
    }

    private void showRemoveBookScreen(Stage stage) {
        Label titleLabel = new Label("Enter Title to Remove:");
        TextField titleField = new TextField();
        Button removeButton = new Button("Remove");
        Button backButton = new Button("Back");
        Label messageLabel = new Label();

        removeButton.setOnAction(e -> {
            boolean removed = BookCatalog.removeBook(titleField.getText());
            messageLabel.setText(removed ? "✅ Book removed" : "❌ Book not found");
        });

        backButton.setOnAction(e -> showMainMenu(stage));

        VBox layout = new VBox(10);
        layout.setPadding(new Insets(20));
        layout.getChildren().addAll(titleLabel, titleField, removeButton, backButton, messageLabel);

        stage.setScene(new Scene(layout, 400, 300));
    }

    private void showSearchBookScreen(Stage stage) {
        Label searchLabel = new Label("Search by Title/Author/Genre:");
        TextField searchField = new TextField();
        Button searchButton = new Button("Search");
        Button backButton = new Button("Back");
        TextArea resultArea = new TextArea();
        resultArea.setEditable(false);

        searchButton.setOnAction(e -> {
            String query = searchField.getText();
            List<Book> results = BookCatalog.searchByTitle(query);
            results.addAll(BookCatalog.searchByAuthor(query));
            results.addAll(BookCatalog.searchByGenre(query));

            if (results.isEmpty()) {
                resultArea.setText("❌ No results found!");
            } else {
                StringBuilder sb = new StringBuilder();
                for (Book book : results) {
                    sb.append(book).append("\n");
                }
                resultArea.setText(sb.toString());
            }
        });

        backButton.setOnAction(e -> showMainMenu(stage));

        VBox layout = new VBox(10);
        layout.setPadding(new Insets(20));
        layout.getChildren().addAll(searchLabel, searchField, searchButton, resultArea, backButton);

        stage.setScene(new Scene(layout, 500, 400));
    }

    private void showAllBooksScreen(Stage stage) {
        TextArea area = new TextArea();
        area.setEditable(false);
        StringBuilder sb = new StringBuilder();
        for (Book book : BookCatalog.getAllBooks()) {
            sb.append(book).append("\n");
        }
        area.setText(sb.toString().isEmpty() ? "📭 No books in catalog." : sb.toString());

        Button backButton = new Button("Back");
        backButton.setOnAction(e -> showMainMenu(stage));

        VBox layout = new VBox(10);
        layout.setPadding(new Insets(20));
        layout.getChildren().addAll(area, backButton);

        stage.setScene(new Scene(layout, 500, 400));
    }

    public static void main(String[] args) {
        launch(args);
    }
}
