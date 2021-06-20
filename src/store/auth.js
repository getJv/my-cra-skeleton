import create from 'zustand';
import produce from 'immer';
import authenticationService from '../services/authentication';

const initialState = {
  isAuthenticated: false,
};

export const useAuthenticationStore = create(set => {
  const setState = fn => set(produce(fn));

  return {
    state: {
      ...initialState,
    },
    actions: {
      doLogin: async () => {
        await authenticationService.login();
        setState(({ state }) => {
          state.isAuthenticated = true;
        });
      },
      doLogout: async () => {
        await authenticationService.logout();
        setState(({ state }) => {
          state.isAuthenticated = false;
        });
      },
      async doAuthVerify() {
        try {
          await authenticationService.verify();
          setState(({ state }) => {
            state.isAuthenticated = true;
          });
        } catch (e) {
          setState(({ state }) => {
            state.isAuthenticated = false;
          });
        }
      },
      reset() {
        setState(store => {
          store.state = initialState;
        });
      },
    },
  };
});
