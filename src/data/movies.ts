export type Movie = {
  id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
  status: "watchlist" | "watched";
  favorite: boolean;
  summary: string;
  poster: string;
};

export const GENRE_COLORS: Record<string, string> = {
  Action:      "#e74c3c",
  Thriller:    "#8e44ad",
  Drama:       "#2980b9",
  "Sci-Fi":    "#00b894",
  Comedy:      "#f39c12",
  Horror:      "#c0392b",
  Romance:     "#e91e63",
  Documentary: "#27ae60",
  Animation:   "#6c5ce7",
  War:         "#636e72",
  Crime:       "#fd9644",
  Fantasy:     "#00cec9",
};

export const MOVIES: Movie[] = [
  { id:"s1",  title:"The Dark Knight",       director:"Christopher Nolan", year:2008, genre:"Thriller", status:"watched",   favorite:true,
    summary:"Batman faces his greatest test as the Joker unleashes calculated chaos on Gotham City.",
    poster:"https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id:"s2",  title:"Parasite",              director:"Bong Joon-ho",      year:2019, genre:"Drama",    status:"watched",   favorite:true,
    summary:"A poor family schemes their way into a wealthy household, triggering an unexpected and deadly chain of events.",
    poster:"https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id:"s3",  title:"Interstellar",          director:"Christopher Nolan", year:2014, genre:"Sci-Fi",   status:"watched",   favorite:true,
    summary:"A team of astronauts travels through a wormhole near Saturn in search of a new home for humanity.",
    poster:"https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id:"s4",  title:"Inception",             director:"Christopher Nolan", year:2010, genre:"Sci-Fi",   status:"watched",   favorite:true,
    summary:"A thief who enters dreamscapes to steal secrets is offered one final job — to plant an idea.",
    poster:"https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id:"s5",  title:"1917",                  director:"Sam Mendes",        year:2019, genre:"War",      status:"watched",   favorite:false,
    summary:"Two British soldiers must cross enemy territory to deliver a message that could save 1,600 lives.",
    poster:"https://image.tmdb.org/t/p/w342/iZf0KyrE25z1sage4SYQLhzjCUu.jpg" },
  { id:"s6",  title:"Oppenheimer",           director:"Christopher Nolan", year:2023, genre:"Drama",    status:"watched",   favorite:false,
    summary:"The story of J. Robert Oppenheimer, the physicist who led the Manhattan Project to develop the atomic bomb.",
    poster:"https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id:"s7",  title:"Past Lives",            director:"Celine Song",       year:2023, genre:"Romance",  status:"watchlist", favorite:false,
    summary:"Two childhood sweethearts reconnect over decades, questioning love, identity, and the lives not lived.",
    poster:"https://image.tmdb.org/t/p/w342/k3waqVXkpFfXsBHFCaHRfnkNHNq.jpg" },
  { id:"s8",  title:"Dune: Part Two",        director:"Denis Villeneuve",  year:2024, genre:"Sci-Fi",   status:"watched",   favorite:false,
    summary:"Paul Atreides unites with the Fremen to wage war against the conspirators who destroyed his family.",
    poster:"https://image.tmdb.org/t/p/w342/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg" },
  { id:"s10", title:"The Brutalist",         director:"Brady Corbet",      year:2024, genre:"Drama",    status:"watchlist", favorite:false,
    summary:"A Hungarian-Jewish architect flees post-war Europe to rebuild his life and legacy in America.",
    poster:"" },
  { id:"s11", title:"Wild Tales",            director:"Damián Szifron",    year:2014, genre:"Comedy",   status:"watchlist", favorite:false,
    summary:"Six darkly comic tales of revenge, frustration, and primal rage — ordinary people pushed far past their limits.",
    poster:"https://image.tmdb.org/t/p/w342/bU7IUeTdYFOgeUPtwpWKQNhORMC.jpg" },
  { id:"s12", title:"Funny Games",           director:"Michael Haneke",    year:2008, genre:"Horror",   status:"watchlist", favorite:false,
    summary:"Two polite strangers take a family hostage and force them into sadistic games — a brutal deconstruction of screen violence.",
    poster:"https://image.tmdb.org/t/p/w342/zs92sAOh3Q0kDIJkgaJFTBzSFka.jpg" },
  { id:"s13", title:"No Other Choice",       director:"",                  year:2025, genre:"Thriller", status:"watchlist", favorite:false,
    summary:"A 2025 comedy thriller. IMDb 7.5.",
    poster:"" },
  { id:"s14", title:"The Handmaiden",        director:"Park Chan-wook",    year:2016, genre:"Thriller", status:"watchlist", favorite:false,
    summary:"A con artist poses as handmaiden to a reclusive heiress, but unexpected desire unravels their elaborate scheme of betrayal.",
    poster:"https://image.tmdb.org/t/p/w342/dLlH4aNHdnmf62umnInL8xPlPzw.jpg" },
  { id:"s15", title:"Requiem for a Dream",   director:"Darren Aronofsky",  year:2000, genre:"Drama",    status:"watchlist", favorite:false,
    summary:"Four people in Brooklyn become consumed by their dreams and addictions, each spiralling into their own harrowing descent.",
    poster:"https://image.tmdb.org/t/p/w342/9BTwsLaMVHOGFlmsSlx5QYCaXb.jpg" },
  { id:"s16", title:"Sapne vs Everyone",     director:"",                  year:2023, genre:"Drama",    status:"watchlist", favorite:false,
    summary:"Indian series — a dreamer fights against all odds to turn their aspirations into reality.",
    poster:"" },
  { id:"s17", title:"Taken",                 director:"Pierre Morel",      year:2008, genre:"Action",   status:"watched",   favorite:false,
    summary:"A retired CIA operative hunts the kidnappers who abducted his daughter in Paris, using a very particular set of skills.",
    poster:"https://image.tmdb.org/t/p/w342/ognkaUSNgJe1a2pjB4UNdzEo5jT.jpg" },
  { id:"s18", title:"Taken 2",               director:"Olivier Megaton",   year:2012, genre:"Action",   status:"watched",   favorite:false,
    summary:"Bryan Mills and his wife are taken hostage in Istanbul by the father of a kidnapper he killed.",
    poster:"https://image.tmdb.org/t/p/w342/yzAlcuJhpnxRPjaj7AHBRbNPQCJ.jpg" },
  { id:"s19", title:"Taken 3",               director:"Olivier Megaton",   year:2014, genre:"Action",   status:"watched",   favorite:false,
    summary:"Bryan Mills is framed for his ex-wife's murder and must evade authorities while hunting the real killers.",
    poster:"https://image.tmdb.org/t/p/w342/vzvMXMypMq7ieDofKThsxjHj9hn.jpg" },
];
