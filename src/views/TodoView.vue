<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  // stopRealtime = todoStore.startRealtime() // enable after configuring Hasura subscription permissions
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="todo-container">
    <h1>To-Do List</h1>

    <form class="add-form" @submit.prevent="onAdd">
      <input v-model="title" placeholder="Add a new task..." required />
      <button type="submit">Add</button>
    </form>

    <div v-if="todoStore.loading" class="loading">Loading...</div>
    <div v-if="todoStore.error" class="error">{{ todoStore.error }}</div>

    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ done: todo.is_done }">
        <label>
          <input type="checkbox" :checked="todo.is_done" @change="todoStore.toggleTodo(todo)" />
          <span>{{ todo.title }}</span>
        </label>
        <button class="delete-btn" @click="todoStore.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="todoStore.todos.length === 0 && !todoStore.loading" class="empty">
      No tasks yet. Add one above!
    </p>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.add-form input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-form button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-form button:hover {
  background: #369970;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.todo-list li label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
}

.todo-list li.done span {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #c0392b;
}

.loading,
.error,
.empty {
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: #e74c3c;
}
</style>
