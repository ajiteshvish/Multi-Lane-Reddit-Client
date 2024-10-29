# Multi-Lane-Reddit-Client


🚀 Just finished a full-featured Reddit Client project! 🚀

Excited to share a Reddit Client I developed from scratch, designed to display multiple subreddits in customizable lanes, with each lane fetching posts in real time! Here’s a breakdown of the project, what I learned, and how I tackled the API integration and frontend development:

---

🔹 Project Overview
The project is a web-based client that allows users to view posts from multiple subreddits at once, organized into lanes. Users can add any subreddit they like, and each lane will display the latest posts, including titles, authors, and upvote counts. Users can even delete specific posts or entire lanes, all while maintaining a smooth UI experience.

🔹 Key Features
1. Dynamic Lanes: Add and remove subreddit lanes dynamically.
2. API Integration with Reddit JSON Feed: Each lane fetches data using the JSON feed at `https://www.reddit.com/r/{subreddit}.json`.
3. User-Friendly Interactions: Display of loading indicators, error handling, and custom error messages for smooth UX.
4. Local Storage Persistence: User preferences and custom lanes are saved and restored on page reload.
5. Responsiveness: Fully responsive layout with lanes displayed in a flexible grid.

🔹 Development Process

1. API Integration: The core of this project lies in integrating with Reddit’s JSON API. Using asynchronous functions in JavaScript, I implemented data fetching for each subreddit using:
   ```javascript
   async function fetchSubredditData(subreddit, lane) {
       try {
           const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
           if (!response.ok) throw new Error('Subreddit not found');
           const data = await response.json();
           displaySubredditPosts(data, lane);
       } catch (error) {
           lane.innerHTML = `<div class="error">${error.message}</div>`;
       }
   }
   ```
   This function dynamically pulls data for each subreddit, managing loading states and errors to keep the UI responsive and user-friendly.

2. State Management & Local Storage: Implemented local storage to store user-selected subreddits. Each time a user adds a new lane, it’s saved in `localStorage` and loaded automatically on page refresh.

3. UI Design & Responsiveness: Using CSS Grid, Flexbox, and transitions, I created a responsive, polished UI with interactive features:
   - Hover Effects: For buttons and lanes to add a tactile feel.
   - Mobile Compatibility: Ensures each lane stacks properly on smaller screens.
   - Customizable Styles: Each post and lane element is styled to be intuitive and easy to read.

4. Error Handling: Displays meaningful error messages for invalid subreddits or failed requests, ensuring a smooth experience even when things go wrong.

🔹 Tech Stack
- HTML for structure
- CSS for styling and responsive design
- JavaScript for asynchronous data fetching, dynamic UI updates, and local storage handling

I’m thrilled with how this project turned out, and it was a great way to practice API integration, asynchronous programming, and frontend best practices. Let me know what you think, or if you’d like to see more details on the project!

