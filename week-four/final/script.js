(() => {
  $(document).ready(() => {
    const appendLocation = $('#appendLocation');
    if (!appendLocation.length) {
      console.error('Error: #appendLocation element not found in the DOM.');
      return;
    }

    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const storageKey = 'usersData';
    const sessionKey = 'usersFetched';

    const buildCSS = () => {
      $("<style>").text(`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        #appendLocation {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .user {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        .user p {
          margin: 5px 0;
        }

        button {
          background-color: #1b1b1b;
          color: white;
          border: none;
          padding: 8px 24px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        button:hover {
          background-color: #2c2c2c;
        }
        `).appendTo("head")
    }
      
    const fetchUsers = () => {
      $.getJSON(apiUrl, (data) => {
        localStorage.setItem(storageKey, JSON.stringify(data));
        renderUsers(data);
      });
    };
      
    const renderUsers = (users) => {
      appendLocation.empty();
      if (!users.length) {
        showFetchButton();
        return;
      }

      users.forEach(user => {
        appendLocation.append(`
          <div class="user" data-id="${user.id}">
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <button class="delete-user">Delete</button>
          </div>
        `);
      });
    };
      
    const deleteUser = (id) => {
      let users = JSON.parse(localStorage.getItem(storageKey)) || [];
      users = users.filter(user => user.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(users));
      renderUsers(users);
    };
      
    const showFetchButton = () => {
      if (!sessionStorage.getItem(sessionKey)) {
        appendLocation.append('<button id="fetch-users">Fetch Users Again</button>');
      }
    };
      
    $(document).on('click', '.delete-user', function () {
      const userId = $(this).parent().data('id');
      deleteUser(userId);
    });
      
    $(document).on('click', '#fetch-users', () => {
      sessionStorage.setItem(sessionKey, 'true');
      fetchUsers();
    });
      
    const observer = new MutationObserver(() => {
      if (!appendLocation.children('.user').length) {
        showFetchButton();
      }
    });
      
    observer.observe(appendLocation[0], { childList: true });
    
    buildCSS();
    const storedUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
    storedUsers.length ? renderUsers(storedUsers) : fetchUsers();
  });
})();
