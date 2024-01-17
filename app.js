const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
    try {
        const response = await fetch(APIURL + username);

        if (response.ok) {
            const data = await response.json();
            displayUser(data);
            getRepos(username);
        } else {
            displayError("Error fetching user information.");
        }
    } catch (error) {
        displayError("An unexpected error occurred.");
    }
};

const getRepos = async (username) => {
    try {
        const response = await fetch(APIURL + username + "/repos");

        if (response.ok) {
            const data = await response.json();
            displayRepos(data);
        } else {
            displayError("Error fetching repositories.");
        }
    } catch (error) {
        displayError("An unexpected error occurred while fetching repositories.");
    }
};

const displayUser = (user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio || "No bio available"}</p>

            <ul class="info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>
    `;

    main.innerHTML = "";
    main.appendChild(card);
};

const displayRepos = (reposData) => {
    const reposContainer = document.createElement("div");
    reposContainer.id = "repos";

    reposData.forEach((repo) => {
        const repoLink = document.createElement("a");
        repoLink.classList.add("repo");
        repoLink.href = repo.html_url;
        repoLink.innerText = repo.name;
        repoLink.target = "_blank";
        reposContainer.appendChild(repoLink);
    });

    main.appendChild(reposContainer);
};

const displayError = (message) => {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error");
    errorContainer.textContent = message;
    main.appendChild(errorContainer);
};

const formSubmit = () => {
    const username = searchBox.value.trim();

    if (username !== "") {
        getUser(username);
        searchBox.value = "";
    }

    return false;
};

searchBox.addEventListener("focusout", formSubmit);
