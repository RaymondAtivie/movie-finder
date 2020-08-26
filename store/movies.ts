import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Movie from '~/models/Movie'
import { RootState } from '.'

export const state = () => ({
  allMovies: [] as Movie[],
  popularMovies: [] as Movie[],
  query: "" as string,
  currentSlideIndex: 0 as number,
})

export type NotificationState = ReturnType<typeof state>

export const getters: GetterTree<NotificationState, RootState> = {
  movies: state => state.allMovies,
  popularMovies: state => state.popularMovies,
  filteredMovies: state => state.allMovies.filter(movie => movie.title.toLowerCase().includes(state.query.toLowerCase())),
  searchTerm: state => state.query,
  slideIndex: state => state.currentSlideIndex,
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
  UPDATE_SLIDE_INDEX: (state, index: number) => {
    state.currentSlideIndex = index;
  }
}
export const actions: ActionTree<NotificationState, RootState> = {
  async loadPopularMovies({ commit }) {
    const response = await this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9099d4a456925cc52c8aed25ab61ba4e");

    const movies: Movie[] = Movie.fromArray(response.data.results).slice(0, 8);

    console.log(movies);
    commit('LOAD_POPULAR_MOVIES', movies);
  },

  async search({ commit }, query: string) {
    commit('UPDATE_SEARCH_QUERY', query);
    commit('UPDATE_SLIDE_INDEX', 0);

    if (!query) return;

    const response = await this.$axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9099d4a456925cc52c8aed25ab61ba4e&query=${query}`);

    const movies: Movie[] = Movie.fromArray(response.data.results);

    console.log(movies);
    commit('LOAD_MOVIES', movies);
  },

  async getMovie({ commit, state }, movie_id: string): Promise<Movie> {
    return new Promise((resolve, reject) => {
      const foundMovie = state.allMovies.find(movie => movie.id == +movie_id);

      if (foundMovie) {
        return resolve(foundMovie);
      }

      this.$axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=9099d4a456925cc52c8aed25ab61ba4e`)
        .then((response) => {
          console.log(response.data);

          resolve(Movie.fromJson(response.data))
        });

    })
  }
}
