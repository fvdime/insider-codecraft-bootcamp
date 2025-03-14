document.addEventListener('DOMContentLoaded', () => {
  const usersContainer = document.querySelector('.ins-api-users');
  const localStorageKey = 'userData';
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch user data');
      return await response.json();
    } catch (error) {
      console.error('Error while fetching user data:', error);
      usersContainer.innerHTML = '<p>Error while fetching user data. Please try again later.</p>';
      return null;
    }
  };

  const saveToLocalStorage = (data) => {
    const expire = Date.now() + oneDayInMilliseconds;
    localStorage.setItem(localStorageKey, JSON.stringify({ data, expire }));
  }

  const getFromLocalStorage = () => {
    const item = JSON.parse(localStorage.getItem(localStorageKey));
    if (!item || Date.now() > item.expire) {
      localStorage.removeItem(localStorageKey);
      return null;
    }
    return item.data;
  }

  const displayUsers = (users) => {
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

  window.deleteUser = (userId) => {
    let users = getFromLocalStorage();
    if (!users) return;

    users = users.filter(user => user.id !== userId);
    saveToLocalStorage(users);
    displayUsers(users);
  };

  async function loadUserData() {
    let users = getFromLocalStorage() || await fetchUserData();

    if (users) {
      saveToLocalStorage(users);
      displayUsers(users);
    }
  };

  loadUserData();
});