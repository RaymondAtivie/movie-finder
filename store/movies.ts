import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Movie from '~/models/Movie'
import { RootState } from '.'

export const state = () => ({
  movies: [] as Movie[],
})

export type NotificationState = ReturnType<typeof state>

export const getters: GetterTree<NotificationState, RootState> = {
  movies: state => state.movies,
}

export const mutations: MutationTree<NotificationState> = {
  LOAD_MOVIES: (state, allMovies: Movie[]) => {
    state.movies = allMovies;
  },
}
export const actions: ActionTree<NotificationState, RootState> = {
  async load({ commit }) {
    const movies: Movie[] = [];
    commit('LOAD_MOVIES', movies);
  },
}
