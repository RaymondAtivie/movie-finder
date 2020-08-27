import { GetterTree, MutationTree } from 'vuex';

const savedMode = localStorage.getItem('mode') ?? 'false';

export const state = () => ({
  lightMode: JSON.parse(savedMode) as boolean,
  key: '9099d4a456925cc52c8aed25ab61ba4e',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  mode: state => state.lightMode ? 'light' : 'dark',
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_MODE: (state) => {
    state.lightMode = !state.lightMode;
    localStorage.setItem('mode', state.lightMode.toString());
  },
}
