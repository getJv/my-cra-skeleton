import create from 'zustand';
import produce from 'immer';
import organizationService from '../services/organizations';

const initialState = {
  organizations: [{ id: '1', title: 'jhonatan' }],
};

export const useOrganizationStore = create(set => {
  const setState = fn => set(produce(fn));

  return {
    state: {
      ...initialState,
    },
    actions: {
      async fetchOrganizations() {
        const { data } = await organizationService.all();
        setState(({ state }) => {
          state.organizations = data.organizations;
        });
      },
      async deleteOrganization(organization) {
        await organizationService.delete(organization.id);
        setState(({ state }) => {
          const index = state.organizations.indexOf(organization);
          state.organizations.splice(index, 1);
        });
      },
      reset() {
        setState(store => {
          store.state = initialState;
        });
      },
    },
  };
});
