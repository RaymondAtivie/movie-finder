import { GetterTree, MutationTree } from 'vuex';
export const state = () => ({
  lightMode: false as boolean
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  mode: state => state.lightMode ? 'light' : 'dark',
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_MODE: (state) => {
    state.lightMode = !state.lightMode;
  },
}
