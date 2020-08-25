class Movie {
  constructor(
    public id: number,
    public title: string,
    public poster: string,
    public director: string,
    public year: number,
  ) { }

  static fromJson(json: any): Movie {
    return new Movie(
      json.id,
      json.title,
      json.poster,
      json.director,
      json.year,
    );
  }

}

export default Movie;
