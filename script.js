
    const userContainer = document.getElementById("ota");
    const searchInput = document.getElementById("input");
    const sortSelect = document.getElementById("sort");
    const loadScreen = document.getElementById("load-ota");
    const contentBox = document.getElementById("box");

    let users = [];
    document.addEventListener("DOMContentLoaded", () => {
    fetch("https://randomuser.me/api/?results=100")
        .then(response => response.json())
        .then(data => {
            users = data.results;
            setTimeout(() => {
                displayUsers(users);
                loadScreen.style.display = "none";
                contentBox.style.display = "block";
            }, 1000); 
        });

    function displayUsers(userList) {
        userContainer.innerHTML = "";
        userList.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("card");
            userCard.innerHTML = `
                <img src="${user.picture.medium}" alt="User Image">
                <h2>${user.name.first} ${user.name.last}</h2>
                <h3>Yosh: ${user.dob.age}</h3>
                <p>Telefon: ${user.phone}</p>
                <p>Email: ${user.email}</p>
                <p>Manzil: ${user.location.city}, ${user.location.country}</p>
            `;
            userContainer.appendChild(userCard);
        });
    }

    searchInput.addEventListener("input", () => {
        const filteredUsers = users.filter(user => 
            user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayUsers(filteredUsers);
    });

    sortSelect.addEventListener("change", () => {
        let sortedUsers = [...users];
        if (sortSelect.value === "A") {
            sortedUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
        } else if (sortSelect.value === "Z") {
            sortedUsers.sort((a, b) => b.name.first.localeCompare(a.name.first));
        }
        displayUsers(sortedUsers);
    });
});
