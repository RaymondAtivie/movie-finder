import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Movie from '~/models/Movie'
import { RootState } from '.'

export const state = () => ({
  allMovies: [] as Movie[],
  popularMovies: [] as Movie[],
})

export type NotificationState = ReturnType<typeof state>

export const getters: GetterTree<NotificationState, RootState> = {
  movies: state => state.allMovies,
  popularMovies: state => state.popularMovies,
}

export const mutations: MutationTree<NotificationState> = {
  LOAD_MOVIES: (state, allMovies: Movie[]) => {
    state.allMovies = allMovies;
  },
  LOAD_POPULAR_MOVIES: (state, movies: Movie[]) => {
    state.popularMovies = movies;
  },
}
export const actions: ActionTree<NotificationState, RootState> = {
  async loadPopularMovies({ commit }) {
    const response = await this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9099d4a456925cc52c8aed25ab61ba4e");

    const movies: Movie[] = Movie.fromArray(response.data.results).slice(0, 8);

    console.log(movies);
    commit('LOAD_POPULAR_MOVIES', movies);
  },
}
