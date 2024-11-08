<template>
  <div id="app">
    <MainHeader
      :currentRole="currentRole"
      :isSidebarVisible="isSidebarVisible"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
    />
    
    <MainSidebar
      :currentRole="currentRole"
      :isSidebarVisible="isSidebarVisible"
      @showComponent="navigateTo"
    />
    
    <div class="main-container" :class="{
      'with-sidebar': isSidebarVisible,
      'no-sidebar': !isSidebarVisible,
      'with-header': isHeaderVisible,
      'no-header': !isHeaderVisible
    }">
      <router-view
        :currentComponent="currentComponent"
        @add-item="handleAddItem"
        @edit-item="handleEditItem"
        @delete-item="handleDeleteItem"
      />
    </div>

    <!-- Floating Controls -->
    <div class="layout-controls">
      <button @click="toggleHeader" class="control-btn">
        {{ isHeaderVisible ? 'Hide Header' : 'Show Header' }}
      </button>
      <button @click="toggleSidebar" class="control-btn">
        {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
      </button>
    </div>
  </div>
</template>

<script>
import MainHeader from "./components/dashboard/MainHeader.vue";
import MainSidebar from "./components/dashboard/MainSidebar.vue";
import { EventBus } from "./eventBus";

export default {
  name: "App",
  components: {
    MainHeader,
    MainSidebar
  },
  
  data() {
    return {
      currentRole: localStorage.getItem('role') || 'admin',
      currentComponent: 'items',
      isSidebarVisible: localStorage.getItem('sidebarVisible') === 'true',
      isHeaderVisible: localStorage.getItem('headerVisible') === 'true',
    };
  },

  watch: {
    currentRole: {
      handler(newRole) {
        const isAuthenticated = Boolean(localStorage.getItem('auth'));
        if (!isAuthenticated) {
          this.$router.push('/login');
          return;
        }

        // Redirect based on role
        const currentPath = this.$route.path;
        if (newRole === 'admin' && !currentPath.includes('/admin')) {
          this.$router.push({ name: 'admin', params: { component: this.currentComponent }});
        } else if (newRole === 'user' && !currentPath.includes('/user')) {
          this.$router.push({ name: 'user', params: { component: this.currentComponent }});
        }
      },
      immediate: true
    }
  },

  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      localStorage.setItem('sidebarVisible', this.isSidebarVisible);
    },

    toggleHeader() {
      this.isHeaderVisible = !this.isHeaderVisible;
      localStorage.setItem('headerVisible', this.isHeaderVisible);
    },

    updateRole(role) {
      const isAuthenticated = Boolean(localStorage.getItem('auth'));
      const authRole = localStorage.getItem('role');

      if (isAuthenticated && authRole === role) {
        this.currentRole = role;
        localStorage.setItem('role', role);
        this.$router.push({ 
          name: role, 
          params: { component: this.currentComponent }
        });
      } else {
        alert("You do not have permission to switch to this role.");
        this.$router.push({ name: 'login' });
      }
    },

    navigateTo(component) {
      const isAuthenticated = Boolean(localStorage.getItem('auth'));
      if (!isAuthenticated) {
        this.$router.push({ name: 'login' });
        return;
      }

      this.currentComponent = component;
      this.$router.push({ 
        name: this.currentRole, 
        params: { component }
      });
    },

    handleAddItem(item) {
      EventBus.emit('item-added', item);
    },

    handleEditItem(item) {
      EventBus.emit('item-edited', item);
    },

    handleDeleteItem(itemId) {
      EventBus.emit('item-deleted', itemId);
    },

    handleKeydown(e) {
      if (e.ctrlKey && e.key === 'b') {
        this.toggleSidebar();
      }
      if (e.ctrlKey && e.key === 'h') {
        this.toggleHeader();
      }
    }
  },

  created() {
    // Set default states if not set
    if (localStorage.getItem('sidebarVisible') === null) {
      localStorage.setItem('sidebarVisible', 'true');
      this.isSidebarVisible = true;
    }
    
    if (localStorage.getItem('headerVisible') === null) {
      localStorage.setItem('headerVisible', 'true');
      this.isHeaderVisible = true;
    }

    // Keyboard shortcuts
    window.addEventListener('keydown', this.handleKeydown);
  },

  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.main-container {
  transition: all 0.3s ease;
  padding: 20px;
  min-height: calc(100vh - 80px);
  background-color: #f5f5f5;
}

/* Layout Classes */
.main-container.with-sidebar {
  margin-left: 250px;
}

.main-container.no-sidebar {
  margin-left: 0;
}

.main-container.with-header {
  padding-top: 80px;
}

.main-container.no-header {
  padding-top: 20px;
}

/* Floating Controls */
.layout-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.control-btn {
  padding: 8px 16px;
  background-color: #4b3f6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.control-btn:hover {
  opacity: 1;
  background-color: #5f4d8a;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-container.with-sidebar {
    margin-left: 0;
  }
  
  .layout-controls {
    bottom: 10px;
    right: 10px;
    flex-direction: column;
  }

  .main-container {
    padding: 10px;
  }
}
</style>