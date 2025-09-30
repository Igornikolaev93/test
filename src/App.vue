<script setup lang="ts">
import { useAccountsStore } from './stores/accounts';
import AccountForm from './components/AccountForm.vue';

const accountsStore = useAccountsStore();
</script>

<template>
  <main>
    <header>
      <h1>Учетные записи</h1>
      <button @click="accountsStore.addAccount()" class="add-btn">+</button>
    </header>
    <div class="accounts-list">
      <AccountForm 
        v-for="account in accountsStore.accounts" 
        :key="account.id" 
        :account="account" 
        @delete="accountsStore.deleteAccount"
      />
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #2b6cb0;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
