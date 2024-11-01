<template>
  <div class="user-list">
    <div class="header">
      <h2>Daftar Pengguna</h2>

      <button class="add-btn" @click="$emit('add-user')">
        Tambah Pengguna
      </button>
    </div>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>

            <td>{{ user.username }}</td>

            <td>{{ user.email }}</td>

            <td>{{ user.role }}</td>

            <td class="action-buttons">
              <button class="edit-btn" @click="$emit('edit-user', user)">
                Edit
              </button>

              <button class="delete-btn" @click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: "1", username: "Asep", email: "asep@email.com", role: "Admin" },

        { id: "2", username: "Budi", email: "budi@email.com", role: "User" },
      ],
    };
  },

  methods: {
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id);

      this.$emit("delete-user", id);
    },
  },
};
</script>

<style scoped>
.user-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: all 0.3s ease;
}

.user-list:hover {
  box-shadow: 0 8px 20px rgba(75, 63, 107, 0.15);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

h2 {
  color: #4b3f6b;
  font-size: 24px;
  position: relative;
  padding-bottom: 8px;
}

h2::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(to right, #754bc5, transparent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.user-list:hover h2::after {
  transform: scaleX(1);
}

.add-btn {
  background-color: #754bc5;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-btn:hover {
  background-color: #5a37a0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(117, 75, 197, 0.3);
}

.add-btn:active {
  transform: translateY(0);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
  transition: all 0.3s ease;
}

th {
  background-color: #4b3f6b;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

tbody tr {
  transition: all 0.3s ease;
  position: relative;
}

tbody tr:hover {
  transform: scale(1.01);
  background-color: #f8f4ff !important;
  box-shadow: 0 4px 15px rgba(75, 63, 107, 0.1);
  z-index: 1;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  position: relative;
  overflow: hidden;
}

.edit-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.delete-btn {
  background-color: #f44336;
  color: white;
  position: relative;
  overflow: hidden;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.edit-btn:active,
.delete-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Animation for new rows */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

tbody tr {
  animation: fadeIn 0.5s ease-out;
}

@media (max-width: 600px) {
  .user-list {
    padding: 16px;
  }

  th,
  td {
    padding: 8px 10px;
  }

  .header {
    flex-direction: column;
    gap: 12px;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .action-buttons button {
    width: 100%;
    margin: 2px 0;
  }

  tbody tr:hover {
    transform: scale(1.005);
  }

  h2 {
    font-size: 20px;
    text-align: center;
  }

  h2::after {
    left: 20%;
    width: 60%;
  }
}
</style>