import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export interface Account {
  id: string;
  label: { text: string }[];
  recordType: 'LDAP' | 'Локальная';
  login: string;
  password?: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]') as Account[],
  }),
  actions: {
    addAccount() {
      const newAccount: Account = {
        id: uuidv4(),
        label: [],
        recordType: 'Локальная',
        login: '',
        password: '',
      };
      this.accounts.push(newAccount);
      this.saveAccounts();
    },
    updateAccount(updatedAccount: Omit<Account, 'label'> & { label: string }) {
      const index = this.accounts.findIndex((account:any) => account.id === updatedAccount.id);
      if (index !== -1) {
        const accountToUpdate = { ...updatedAccount };
        if (accountToUpdate.recordType === 'LDAP') {
            accountToUpdate.password = null;
        }

        const newLabel = accountToUpdate.label.split(';').map(l => ({ text: l.trim() })).filter(l => l.text);

        this.accounts[index] = {
          ...accountToUpdate,
          label: newLabel,
        };
        this.saveAccounts();
      }
    },
    deleteAccount(accountId: string) {
      this.accounts = this.accounts.filter((account:any) => account.id !== accountId);
      this.saveAccounts();
    },
    saveAccounts() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    },
  },
});