/**
1.A user can enter a github username
2.A user can see list of results based on the username keyed in
3.A user can click on the user search result  
4.A user will be directed to their github profile  
 * **/

/** When the document loads:
 * 1. Get the searchInput, searchButton, repoList
 *
 */
const repoList = document.getElementById("repoList");

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search--input--section");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    //get the userName that was keyedIn
    const userName = searchInput.value;

    // search if the searchInput is empyt
    if (userName === "") {
      alert("Github username is required");
      return;
    }

    // make a request to github APIs to fetch data
    fetchGithubUserName("GET", { userName: userName });
  });
}); //an event listener that is going to be attached to the whole structure

const fetchGithubUserName = (method, data) => {
  console.log(data);
  const getUserNameUrl = `https://api.github.com/search/users?q=${data.userName}`;

  fetch(getUserNameUrl, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("API ERROR");
      }
      const result = response.json();
      console.log(result);
      return result;
    })
    .then((users) => {
      displayFoundUsers(users);
    })
    .catch((error) => {
      console.error("Error in fetching data", error.message);
      alert("An error occured");
    });
};

const displayFoundUsers = (usersList) => {
  repoList.innerHTML = "";

  usersList.items.forEach((user) => {
    const li = document.createElement("li");
    const githubLink = document.createElement("a");

    githubLink.href = user.html_url;
    githubLink.target = "_blank";
    githubLink.textContent = user.login;

    li.appendChild(githubLink);
    repoList.appendChild(li);
  });
};
