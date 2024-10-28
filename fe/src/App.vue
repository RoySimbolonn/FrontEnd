<!-- App.vue -->
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
      <component 
        :is="currentRole === 'admin' ? 'AdminView' : 'UserView'"
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
import AdminView from "./views/AdminView.vue";
import UserView from "./views/UserView.vue";
import { EventBus } from "./eventBus";

export default {
  name: "App",
  components: {
    MainHeader,
    MainSidebar,
    AdminView,
    UserView
  },
  
  data() {
    return {
      currentRole: localStorage.getItem('userRole') || 'admin',
      currentComponent: 'items',
      isSidebarVisible: localStorage.getItem('sidebarVisible') === 'true',
      isHeaderVisible: localStorage.getItem('headerVisible') === 'true',
    };
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
      this.currentRole = role;
      localStorage.setItem('userRole', role);
    },

    navigateTo(component) {
      this.currentComponent = component;
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
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'b') {
        this.toggleSidebar();
      }
      if (e.ctrlKey && e.key === 'h') {
        this.toggleHeader();
      }
    });
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

.main-container {
  transition: all 0.3s ease;
  padding: 20px;
  min-height: 100vh;
}

/* Layout Classes */
.main-container.with-sidebar {
  margin-left: 200px; /* Sesuaikan dengan lebar sidebar */
}

.main-container.no-sidebar {
  margin-left: 0;
}

.main-container.with-header {
  padding-top: 80px; /* Sesuaikan dengan tinggi header + padding */
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
}

.control-btn:hover {
  opacity: 1;
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
}
</style>