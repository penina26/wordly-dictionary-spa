// Selectors
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const inputWord = document.getElementById("inp-word");
const searchBtn = document.getElementById("search-btn");
const sound = document.getElementById("sound");

const messageBox = document.getElementById("message-box");
const contentBox = document.getElementById("content-box");
const savedView = document.getElementById("saved-view");
const savedList = document.getElementById("saved-list");

const wordText = document.getElementById("word-text");
const partOfSpeech = document.getElementById("part-of-speech");
const phonetic = document.getElementById("phonetic");
const definition = document.getElementById("definition");
const example = document.getElementById("example");

const volumeBtn = document.getElementById("volume-btn");
const saveBtn = document.getElementById("save-btn");
const themeBtn = document.getElementById("theme-btn");
const homeBtn = document.getElementById("home-btn");
const listsBtn = document.getElementById("lists-btn");
const synonymsSection = document.getElementById("synonyms-section");
const synonymsText = document.getElementById("synonyms-text");


//  State management
// Load saved words from browser storage (or create empty list)
let savedWords = JSON.parse(localStorage.getItem('mySavedWords')) || [];

// Event Listeners

searchBtn.addEventListener("click", searchWord);
inputWord.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchWord();
});

volumeBtn.addEventListener("click", () => {
    sound.play();
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
});

homeBtn.addEventListener('click', () => {
    resetUI();
    messageBox.innerText = "Search for a word to begin...";
});

// Show the saved list
listsBtn.addEventListener('click', showSavedList);


//  save button logic
saveBtn.addEventListener("click", () => {
    const currentWord = wordText.innerText;

    // Check if word is already saved
    if (savedWords.includes(currentWord)) {
        // Remove it
        savedWords = savedWords.filter(w => w !== currentWord);
        saveBtn.classList.remove("saved");
    } else {
        // add it
        savedWords.push(currentWord);
        saveBtn.classList.add("saved");
    }

    // Update Browser Storage
    localStorage.setItem('mySavedWords', JSON.stringify(savedWords));
});


// Main functions

async function searchWord(query) {
    // Check if we passed a specific word (from list click) or getting from input
    let inpWord = (typeof query === 'string' ? query : inputWord.value).trim();

    if (inpWord === "") return;

    // Reset UI
    resetUI();
    messageBox.classList.remove("hidden");
    messageBox.innerText = "Searching...";

    try {
        const response = await fetch(`${url}${inpWord}`);
        if (!response.ok) throw new Error("Word not found");
        const data = await response.json();

        // Success
        updateUI(data[0]);

    } catch (error) {
        messageBox.innerHTML = `<span style="font-size: 3rem;">😕</span><br>Couldn't find "${inpWord}".`;
        messageBox.style.color = "#ff6b6b";
    }
}

function updateUI(entry) {
    messageBox.classList.add("hidden");
    contentBox.classList.remove("hidden");

    // 1. Basic Info
    wordText.innerText = entry.word;
    partOfSpeech.innerText = entry.meanings[0].partOfSpeech;
    definition.innerText = entry.meanings[0].definitions[0].definition;
    phonetic.innerText = entry.phonetic || (entry.phonetics[0] && entry.phonetics[0].text) || "";

    // 2. Example
    const exampleText = entry.meanings[0].definitions[0].example;
    example.innerText = exampleText ? exampleText : "";

    // 3. Synonyms
    // The API gives us an array like ["cheerful", "joyful"]
    const synonymsList = entry.meanings[0].synonyms;

    if (synonymsList && synonymsList.length > 0) {
        // We take the top 5 synonyms and join them with commas
        synonymsText.innerText = synonymsList.slice(0, 5).join(", ");
        synonymsSection.classList.remove("hidden");
    } else {
        // Hide the whole section if no synonyms found
        synonymsSection.classList.add("hidden");
    }

    // 4. Audio Check
    let audioSrc = null;
    if (entry.phonetics) {
        const audioObj = entry.phonetics.find(p => p.audio && p.audio !== "");
        if (audioObj) audioSrc = audioObj.audio;
    }
    if (audioSrc) {
        sound.setAttribute("src", audioSrc);
        volumeBtn.style.display = "block";
    } else {
        volumeBtn.style.display = "none";
    }

    // 5. Saved Check
    if (savedWords.includes(entry.word)) {
        saveBtn.classList.add("saved");
    } else {
        saveBtn.classList.remove("saved");
    }
}

// Saved list function

function showSavedList() {
    resetUI(); // Hide everything else
    savedView.classList.remove("hidden"); // Show list container

    savedList.innerHTML = ""; // Clear current list HTML

    if (savedWords.length === 0) {
        savedList.innerHTML = "<p style='text-align:center; color:gray'>No saved words yet.</p>";
        return;
    }

    // Create HTML for each saved word
    savedWords.forEach(word => {
        const li = document.createElement("li");
        li.className = "saved-item";
        li.innerHTML = `
            <span class="saved-word-text">${word}</span>
            <button class="delete-btn" title="Remove">&times;</button>
        `;

        // Click Logic: Clicking the word searches it
        li.querySelector(".saved-word-text").addEventListener("click", () => {
            inputWord.value = word; // Update input bar
            searchWord(word);       // Run search
        });

        // Delete Logic: Clicking X removes it
        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation(); // Stop click from triggering the search
            removeWord(word);
        });

        savedList.appendChild(li);
    });
}

function removeWord(word) {
    savedWords = savedWords.filter(w => w !== word);
    localStorage.setItem('mySavedWords', JSON.stringify(savedWords));
    showSavedList(); // Re-render the list immediately
}

function resetUI() {
    // Helper to hide all main views
    contentBox.classList.add("hidden");
    messageBox.classList.add("hidden");
    savedView.classList.add("hidden");
    messageBox.style.color = "var(--text-secondary)";
}