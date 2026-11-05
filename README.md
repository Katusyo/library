# Library

A personal book-tracking app in vanilla JavaScript. Add book through a dialog form, mark them completed, search your collection -- everything is saved in the browser, so your library i still there when you come back.

## Built with

- JavaScript (classes, the native `<dialog>` element, FormData)
- HTML and CSS
- localStorage for persistence -- no build step, no dependencies

  ## Features

  - Add a book (title, author, pages, completed or not) through a modal dialog form
  - Custom form validation with friendly error messages -- required fields, and pages must be greater than 0
  - Each book is an object created by a `Book` class with a unique ID (`crypto,randomUUID()`)
  - Mark books as completed or not completed from their card
  - Delete books from the collection
  - Live search that filters the book wall as you type, with a "No results found" state
  - The whole collection persists in `localStorage` and is rebuilt as real `Book` objects on load
 
  ## What I learned

  - Modeling data with classes and keeping the data layer (`Library`) separate from the rendering layer (`LibraryUI`)
  - The native `<dialog>` element and form handling with `FormData`
  - Driving validation through the Constraint Validation API (`setCustomValidty`, `reportValidity`) instead of hand-rolled checks
  - Serialising class instances to JSON for storage -- and rehydrating them back into objects on load so their methods still work
 
  ## Run it locally

  Just open `index.html` in a browser--there is no build step.

  ## About

  Built as part of The Odin Project's JavaScript course (Library project).
