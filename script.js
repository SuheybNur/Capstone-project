// Check for existing events in localStorage or create an empty array if none exist
const events = JSON.parse(localStorage.getItem("events")) || [];

// Function to display all events on the homepage
function displayEvents(filteredEvents) {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear the event list to avoid duplicates

    // Use the filtered events or default to all events
    const eventsToDisplay = filteredEvents || events;

    eventsToDisplay.forEach((event, index) => {
        // Create an event card for each event
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        // Insert the event details into the card
        eventCard.innerHTML = `
            <h2>${event.title}</h2>
            <p>${new Date(event.datetime).toLocaleString()}</p>
            <p>${event.location}</p>
            <button class="view-button" data-index="${index}">View</button>
        `;

        // Append the event card to the list
        eventList.appendChild(eventCard);
    });

    // Add click event listeners to all "View" buttons to open event details
    document.querySelectorAll(".view-button").forEach(button => {
        button.addEventListener("click", viewEvent);
    });
}

// Function to handle viewing event details
function viewEvent(e) {
    const index = e.target.getAttribute("data-index"); // Get the event index
    const event = events[index]; // Retrieve the event data from the array

    // Save the selected event to localStorage so it can be accessed on the event details page
    localStorage.setItem("selectedEvent", JSON.stringify(event));

    // Redirect to the event details page
    window.location.href = "event-details.html";
}

// Function to filter events based on search and category
function filterEvents() {
    const searchValue = document.getElementById("search-bar").value.toLowerCase();
    const categoryValue = document.getElementById("category-filter").value;

    // Filter the events based on the search term and selected category
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchValue);
        const matchesCategory = categoryValue === "" || event.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    // Display the filtered events
    displayEvents(filteredEvents);
}

// Function to handle event creation
function createEvent(e) {
    e.preventDefault(); // Prevent the form from submitting

    const title = document.getElementById("event-title").value;
    const datetime = document.getElementById("event-datetime").value;
    const location = document.getElementById("event-location").value;
    const description = document.getElementById("event-description").value;
    const category = document.getElementById("event-category").value;

    // Validate event date
    const eventDate = new Date(datetime);
    const currentDate = new Date();

    if (eventDate < currentDate) {
        alert("You cannot create an event with a past date!");
        return; // Stop further execution if the date is invalid
    }

    // Create the event object
    const newEvent = {
        title,
        datetime,
        location,
        description,
        category
    };

    // Add the new event to the events array and localStorage
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    // Redirect back to the homepage or display a success message
    window.location.href = "index.html"; // Redirect to the homepage to see the new event
}

// Event listeners for search input and category filter
document.getElementById("search-bar").addEventListener("input", filterEvents);
document.getElementById("category-filter").addEventListener("change", filterEvents);

// Call the function to display events on page load
displayEvents();

// Event listener for event creation form submission
document.getElementById("event-form").addEventListener("submit", createEvent);

