document.addEventListener('DOMContentLoaded', () => {
  const usersContainer = document.querySelector('.ins-api-users');
  const localStorageKey = 'userData';
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  async function fetchUserData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching user data:', error);
      usersContainer.innerHTML = '<p>Error while fetching user data. Please try again later.</p>';
      return null;
    }
  }

  function saveToLocalStorage(data) {
    const now = new Date().getTime();
    const item = {
      data: data,
      expiry: now + oneDayInMilliseconds,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(item));
  }

  function getFromLocalStorage() {
    const item = localStorage.getItem(localStorageKey);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = new Date().getTime();

    if (now > parsedItem.expiry) {
      localStorage.removeItem(localStorageKey);
      return null;
    }

    return parsedItem.data;
  }

  function displayUsers(users) {
    usersContainer.innerHTML = '';

    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        <button onclick="deleteUser(${user.id})">Delete</button>
        `;

        usersContainer.appendChild(userDiv);
      });
  }

  window.deleteUser = function(userId) {
    let users = getFromLocalStorage();
    if (!users) return;

    users = users.filter(user => user.id !== userId);
    saveToLocalStorage(users);
    displayUsers(users);
  };

  async function loadUserData() {
    let users = getFromLocalStorage();

    if (!users) {
      users = await fetchUserData();

      if (users) {
        saveToLocalStorage(users);
      }
    }

    if (users) {
      displayUsers(users);
    }
  }

  loadUserData();
});