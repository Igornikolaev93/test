<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAccountsStore, type Account } from '../stores/accounts';

const props = defineProps<{ account: Account }>();
const emit = defineEmits(['delete']);

const accountsStore = useAccountsStore();

const isLoginInvalid = ref(false);
const isPasswordInvalid = ref(false);

const label = ref(props.account.label.map(l => l.text).join(' ; '));

const validateAndSave = () => {
  isLoginInvalid.value = !props.account.login;
  isPasswordInvalid.value = props.account.recordType === 'Локальная' && !props.account.password;

  if (!isLoginInvalid.value && !isPasswordInvalid.value) {
    const updatedAccount = {
      ...props.account,
      label: label.value,
    };
    accountsStore.updateAccount(updatedAccount);
  }
};

watch(() => props.account.recordType, () => {
    validateAndSave();
});
</script>

<template>
  <div class="account-form">
    <div class="form-row">
        <div class="field-container">
            <label>Метки</label>
            <div class="tooltip">
                <input type="text" v-model="label" @blur="validateAndSave" maxlength="50" />
                <span class="tooltiptext"> В поле вводятся текстовые метки, через знак ";"</span>
            </div>
        </div>
      <div class="field-container">
        <label>Тип записи</label>
        <select v-model="props.account.recordType" @change="validateAndSave">
          <option>LDAP</option>
          <option>Локальная</option>
        </select>
      </div>
      <div class="field-container">
        <label>Логин</label>
        <input type="text" v-model="props.account.login" @blur="validateAndSave" :class="{ invalid: isLoginInvalid }" maxlength="100" />
      </div>
      <div class="field-container" v-if="props.account.recordType === 'Локальная'">
        <label> Пароль</label>
        <input type="password" v-model="props.account.password" @blur="validateAndSave" :class="{ invalid: isPasswordInvalid }" maxlength="100" />
      </div>
    </div>
    <button @click="emit('delete', props.account.id)" class="delete-btn">
        <img class="del" src="../assets/trash.svg">
    </button>
  </div>
</template>

<style scoped>
.account-form {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #041638;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    flex-grow: 1;
}

.field-container {
    display: flex;
    flex-direction: column;
}

label {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

input, select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #4a5568;
  background-color: #1a202c;
  color: #fff;
  max-width: 200px;
}

.invalid {
  border-color: #e53e3e;
}

.delete-btn {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ebebeb;
  color: white;
  border-radius: 4px;
  cursor: pointer;
 
}

.del{
  width: 20px;
  height: 20px;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

