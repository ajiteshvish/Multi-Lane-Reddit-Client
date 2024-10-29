// Initialize lanes from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedLanes = JSON.parse(localStorage.getItem('subredditLanes')) || [];
    storedLanes.forEach(subreddit => addSubredditLane(subreddit, false));
});

// Adds a new subreddit lane
function addSubredditLane(subredditName = null, userTriggered = true) {
    const input = document.getElementById('subredditInput');
    const subreddit = subredditName || input.value.trim();

    if (!subreddit) return alert('Please enter a subreddit name.');

    input.value = ''; // Clear input

    // Check if the lane already exists
    if (document.getElementById(`lane-${subreddit}`)) {
        return alert('This subreddit lane already exists.');
    }

    // Create lane container
    const lane = document.createElement('div');
    lane.classList.add('lane');
    lane.id = `lane-${subreddit}`;
    lane.innerHTML = `
        <div class="lane-header">
            <h2>${subreddit}</h2>
            <button onclick="removeLane('${subreddit}')">X</button>
        </div>
        <div class="loading">Loading...</div>
    `;
    document.getElementById('lanesContainer').appendChild(lane);

    // Fetch subreddit posts and populate lane
    fetchSubredditData(subreddit, lane);

    // Save lane to localStorage
    if (userTriggered) {
        saveLaneToLocalStorage(subreddit);
    }
}

// Fetches subreddit data from Reddit JSON feed
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

// Displays posts in the subreddit lane
function displaySubredditPosts(data, lane) {
    lane.innerHTML = ''; // Clear loading message

    data.data.children.forEach(postData => {
        const post = postData.data;

        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div>by ${post.author}</div>
            <div>Upvotes: ${post.ups}</div>
        `;

        lane.appendChild(postElement);
    });
}

// Save new lane to localStorage
function saveLaneToLocalStorage(subreddit) {
    const storedLanes = JSON.parse(localStorage.getItem('subredditLanes')) || [];
    if (!storedLanes.includes(subreddit)) {
        storedLanes.push(subreddit);
        localStorage.setItem('subredditLanes', JSON.stringify(storedLanes));
    }
}

// Remove a lane
function removeLane(subreddit) {
    const lane = document.getElementById(`lane-${subreddit}`);
    if (lane) lane.remove();

    // Update localStorage
    const storedLanes = JSON.parse(localStorage.getItem('subredditLanes')) || [];
    const updatedLanes = storedLanes.filter(lane => lane !== subreddit);
    localStorage.setItem('subredditLanes', JSON.stringify(updatedLanes));
}

// Adds a new subreddit lane
function addSubredditLane(subredditName = null, userTriggered = true) {
    const input = document.getElementById('subredditInput');
    const subreddit = subredditName || input.value.trim();

    if (!subreddit) return alert('Please enter a subreddit name.');

    input.value = ''; // Clear input

    // Check if the lane already exists
    if (document.getElementById(`lane-${subreddit}`)) {
        return alert('This subreddit lane already exists.');
    }

    // Create lane container
    const lane = document.createElement('div');
    lane.classList.add('lane');
    lane.id = `lane-${subreddit}`;
    lane.innerHTML = `
        <div class="lane-header">
            <h2>${subreddit}</h2>
            <button onclick="removeLane('${subreddit}')">Delete Lane</button>
        </div>
        <div class="loading">Loading...</div>
    `;
    document.getElementById('lanesContainer').appendChild(lane);

    // Fetch subreddit posts and populate lane
    fetchSubredditData(subreddit, lane);

    // Save lane to localStorage
    if (userTriggered) {
        saveLaneToLocalStorage(subreddit);
    }
}


// Displays posts in the subreddit lane with delete option
function displaySubredditPosts(data, lane) {
    lane.innerHTML = ''; // Clear loading message

    data.data.children.forEach(postData => {
        const post = postData.data;

        // Create post container
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div>by ${post.author}</div>
            <div>Upvotes: ${post.ups}</div>
            <button class="delete-post">Delete</button>
        `;

        // Append the post to the lane
        lane.appendChild(postElement);

        // Add click event to the Delete button
        const deleteButton = postElement.querySelector('.delete-post');
        deleteButton.addEventListener('click', () => {
            postElement.remove(); // Remove post element from the DOM
        });
    });
}
