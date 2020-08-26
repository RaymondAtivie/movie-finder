class Movie {
  constructor(
    public id: number,
    public title: string,
    public poster: string,
    public overview: string,
    public release: string,
    public rating: number,
    public backdrop: string,
  ) { }

  get posterUrl(): string | null {
    if (this.poster)
      return "https://image.tmdb.org/t/p/w500" + this.poster;

    return null
  }
  get backdropUrl(): string | null {
    if (this.poster)
      return "https://image.tmdb.org/t/p/w1280" + this.backdrop;

    return null
  }
  get thumbnailUrl(): string | null {
    if (this.poster)
      return "https://image.tmdb.org/t/p/w92" + this.poster;

    return null;
  }

  get year(): string {
    return this.release?.split("-")[0]
  }

  static fromJson(json: any): Movie {
    return new Movie(
      json.id,
      json.original_title,
      json.poster_path,
      json.overview,
      json.release_date,
      json.vote_average,
      json.backdrop_path,
    );
  }

  static fromArray(arr: any[]): Movie[] {
    return arr.map(json => Movie.fromJson(json));
  }

}

export default Movie;
