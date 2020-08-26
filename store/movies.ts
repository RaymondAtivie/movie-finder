import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Movie from '~/models/Movie'
import { RootState } from '.'

export const state = () => ({
  allMovies: [] as Movie[],
  popularMovies: [] as Movie[],
  query: "" as string,
})

export type NotificationState = ReturnType<typeof state>

export const getters: GetterTree<NotificationState, RootState> = {
  movies: state => state.allMovies,
  popularMovies: state => state.popularMovies,
  filteredMovies: state => state.allMovies.filter(movie => movie.title.toLowerCase().includes(state.query.toLowerCase())),
  searchTerm:  state => state.query
}

export const mutations: MutationTree<NotificationState> = {
  LOAD_MOVIES: (state, allMovies: Movie[]) => {
    state.allMovies = allMovies;
  },
  LOAD_POPULAR_MOVIES: (state, movies: Movie[]) => {
    state.popularMovies = movies;
  },
  UPDATE_SEARCH_QUERY: (state, query: string) => {
    state.query = query;
  },
}
export const actions: ActionTree<NotificationState, RootState> = {
  async loadPopularMovies({ commit }) {
    const response = await this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9099d4a456925cc52c8aed25ab61ba4e");

    const movies: Movie[] = Movie.fromArray(response.data.results).slice(0, 8);

    console.log(movies);
    commit('LOAD_POPULAR_MOVIES', movies);
  },

  async search({ commit, state }, query: string) {
    commit('UPDATE_SEARCH_QUERY', query);

    const response = await this.$axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9099d4a456925cc52c8aed25ab61ba4e&query=${query}`);

    const movies: Movie[] = Movie.fromArray(response.data.results);

    console.log(movies);
    commit('LOAD_MOVIES', movies);
  }
}
