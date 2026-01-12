# Wordly - Modern Dictionary App (SPA)

**Wordly** is a sleek, Single Page Application (SPA) dictionary tool built with vanilla HTML, CSS, and JavaScript. It features a modern dark/light mode interface, audio pronunciations, and a local storage system to save your favorite words.

## 🚀 Live Demo
[Click here to view the project](#)

## ✨ Features

### 🔍 Search & Discovery
* **Instant Definitions:** Fetches data from the Free Dictionary API.
* **Rich Data Display:** Shows phonetics, parts of speech, definitions, example sentences, and synonyms.
* **Audio Pronunciation:** Plays the correct pronunciation of the word (if available).
* **Error Handling:** Displays user-friendly messages for missing words or network errors.

### 🎨 Customization & UI
* **Dark/Light Mode:** Toggle between a neon-dark theme and a clean light theme.
* **Saved Words:** "Heart" a word to save it to your personal list (persists on refresh).
* **Responsive Design:** Fully responsive layout that works on mobile and desktop.
* **Glassmorphism Navbar:** A sticky, modern navigation bar.

## 📖 How it Works

1.  **Search:** The app listens for the "Enter" key or the search button click.
2.  **Fetch:** It sends an asynchronous request (`fetch`) to the dictionary API.
3.  **Render:** If successful, it injects the data (definitions, audio, synonyms) into the DOM.
    * It checks if the word exists in your `localStorage`; if yes, the heart icon turns red automatically.
4.  **Save:** Clicking the heart icon updates the local storage array and saves the word for your next visit.

## ⚙️ How to Run Locally

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/penina26/wordly-dictionary-spa.git
    ```
2.  **Open the project folder.**
3.  **Launch:** Open `index.html` in any modern web browser (Chrome, Firefox, Edge).
    * *Note: No backend server or installation is required.*

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and inline SVG icons.
* **CSS3:** CSS Variables, Flexbox, and Glassmorphism effects.
* **JavaScript (ES6+):** Async/Await, DOM Manipulation, LocalStorage API, and Fetch API.
* **API:** [Free Dictionary API](https://dictionaryapi.dev/)

## 📂 Project Structure

```text
├── index.html      # Main HTML structure
├── style.css       # Styling, themes, and animations
├── script.js       # App logic, API fetching, and state management
└── README.md       # Project documentation
```