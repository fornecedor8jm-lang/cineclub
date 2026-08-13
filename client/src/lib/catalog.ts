// Cineclub / direção visual: streaming noir ritualístico. Este módulo concentra o catálogo e mantém links externos apenas como acessos informados pelo usuário.

export type AccessLink = {
  label: string;
  href?: string;
  kind?: "drive" | "youtube" | "photos";
  note?: string;
};

export type CatalogItem = {
  id: string;
  title: string;
  year?: string;
  type: "Série" | "Filme" | "Anime";
  genres: string[];
  tags: string[];
  synopsis: string;
  poster: string;
  hero?: string;
  seasons?: string;
  language?: string;
  rating?: string;
  availability?: string;
  featured?: boolean;
  accessLinks: AccessLink[];
};

const storage = "/manus-storage/";
const poster = (name: string) => `${storage}${name}`;

export const catalog: CatalogItem[] = [
  {
    id: "constantine",
    title: "Constantine",
    year: "2014",
    type: "Série",
    genres: ["Sobrenatural", "Terror", "Ação"],
    tags: ["Caçadores", "Demônios", "Destaque"],
    synopsis:
      "Acompanhe as aventuras de John Constantine, um caçador de demônios que trava uma batalha contra as forças das trevas, tanto dentro de si mesmo quanto no mundo exterior.",
    poster: poster("constantine_505e654a.jpg"),
    hero: poster("cineclub-hero_437f5ca1.jpg"),
    seasons: "1 temporada",
    language: "Dublado / Legendado",
    availability: "Pasta de temporada",
    featured: true,
    accessLinks: [
      {
        label: "Abrir temporada",
        kind: "drive",
        href: "https://drive.google.com/drive/folders/10WW3MIWFkGkwum0Q-gmvnJH5C8chHkbi?usp=drive_link",
      },
    ],
  },
  {
    id: "se-desejos-matassem",
    title: "Se Desejos Matassem",
    year: "2026",
    type: "Série",
    genres: ["Dorama", "Terror"],
    tags: ["Ritual", "Contagem regressiva", "Lançamento"],
    synopsis:
      "Um aplicativo misterioso promete realizar desejos, mas faz uma contagem para a morte. Um grupo de jovens se envolve com esse ritual macabro e precisa quebrar o ciclo fatal para sobreviver.",
    poster: poster("se-desejos-matassem_58a983b5.jpg"),
    seasons: "1 temporada",
    language: "Dublado / Legendado",
    availability: "Pasta de temporada",
    accessLinks: [
      {
        label: "Abrir temporada",
        kind: "drive",
        href: "https://drive.google.com/drive/folders/14iC5TeLyLMQQRuqK1uXY45tWaZbbpYsE",
      },
    ],
  },
  {
    id: "50-states-of-fright",
    title: "50 States of Fright",
    type: "Série",
    genres: ["Terror", "Antologia"],
    tags: ["Folclore", "Episódios independentes", "Estados Unidos"],
    synopsis:
      "Uma antologia de histórias de terror inspiradas em lendas e pesadelos espalhados pelos diferentes estados americanos.",
    poster: poster("50-states-of-fright_0036072a.jpg"),
    seasons: "2 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/1cZ0SybV1TFmaguOnEL8HrhPiM_OkJMh4?usp=drive_link" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/11IAPiVkqw_0cvIoqrYzNWGbEFBqRc0Xw?usp=drive_link" },
    ],
  },
  {
    id: "into-the-dark",
    title: "Into the Dark",
    type: "Série",
    genres: ["Terror", "Antologia"],
    tags: ["Datas comemorativas", "Suspense", "Horror"],
    synopsis:
      "Uma coleção de histórias de terror que transforma datas comemorativas e situações comuns em pequenas portas para o medo.",
    poster: poster("into-the-dark_681a33ca.jpg"),
    seasons: "2 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/1pZOqC0tiJxwXyhAtHdUR2RMb3of7m-xT?usp=drive_link" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/1Th9LbLl9t2M2oSvF275SS5DuoEEi9BZ3?usp=drive_link" },
    ],
  },
  {
    id: "helix",
    title: "Helix",
    type: "Série",
    genres: ["Ficção científica", "Terror", "Thriller"],
    tags: ["Laboratório", "Contágio", "Paranoia"],
    synopsis:
      "Uma equipe de cientistas investiga um surto em uma base isolada e encontra sinais de que a ameaça pode ser muito maior do que parecia.",
    poster: poster("helix_a7d3b031.jpg"),
    seasons: "2 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/11II_djSaEChhQ1rmgcuGuYoNqGXsH5wz?usp=drive_link" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/11pK7-JE1HUpBRSbsMRKPochaLvDlz3TT?usp=drive_link" },
    ],
  },
  {
    id: "penny-dreadful",
    title: "Penny Dreadful",
    type: "Série",
    genres: ["Horror gótico", "Fantasia", "Drama"],
    tags: ["Londres", "Monstros clássicos", "Clássico sombrio"],
    synopsis:
      "Em uma Londres vitoriana tomada por segredos, personagens lendários e criaturas inquietantes se cruzam em uma história gótica de desejo e sobrevivência.",
    poster: poster("penny-dreadful_9b35e5ec.jpg"),
    seasons: "3 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/1hLYxAu5bz3kJjSr9ZUO8QnwLAh0yDqTz?usp=drive_link" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/1FIxTxPi-NK5Rh0ms6SQ9ysWmrYF8Rj_e?usp=drive_link" },
      { label: "Temporada 3", kind: "drive", href: "https://drive.google.com/drive/folders/1brL4CDqZ9RB2QWQjk-vSF-yZnu9N2d7Q?usp=drive_link" },
    ],
  },
  {
    id: "handmaids-tale",
    title: "O Conto da Aia",
    year: "2017",
    type: "Série",
    genres: ["Drama", "Distopia", "Thriller"],
    tags: ["Regime", "Resistência", "Drama sombrio"],
    synopsis:
      "Em uma sociedade teocrática que toma o controle dos Estados Unidos, mulheres são reduzidas a funções impostas enquanto pequenas redes de resistência tentam sobreviver.",
    poster: poster("handmaids-tale_e97259f8.jpg"),
    seasons: "5 temporadas",
    language: "Dublado",
    availability: "Pasta dublada",
    accessLinks: [
      { label: "Abrir temporadas", kind: "drive", href: "https://drive.google.com/drive/folders/1_scMY_gg0lnH89CznyVFrq_eUmQSmVcO" },
    ],
  },
  {
    id: "sandman",
    title: "Sandman",
    type: "Série",
    genres: ["Fantasia sombria", "Mitologia", "Drama"],
    tags: ["Sonhos", "Mundos", "Rei dos Sonhos"],
    synopsis:
      "Após anos aprisionado, Morfeu, o Rei dos Sonhos, embarca em uma jornada entre mundos para recuperar o que lhe foi roubado e restaurar seu poder.",
    poster: poster("sandman_929c7277.jpg"),
    seasons: "2 temporadas",
    language: "Não informado",
    availability: "Acesso informado pelo usuário",
    accessLinks: [
      { label: "Abrir temporadas", kind: "drive", href: "https://drive.google.com/drive/folders/1XsiXMTy59xFUMLroCXrQCXocPzZ4sJ3i" },
    ],
  },
  {
    id: "the-boys",
    title: "The Boys",
    year: "2019–2026",
    type: "Série",
    genres: ["Ação", "Sátira", "Fantasia sombria"],
    tags: ["Anti-heróis", "Poder", "Universo violento"],
    synopsis:
      "Em um mundo onde super-heróis são celebridades e empresas controlam a narrativa, um grupo de pessoas comuns decide investigar o que existe por trás do brilho.",
    poster: poster("the-boys_2cd5b6af.jpg"),
    seasons: "5 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/10srwgb-q2GnIHTAm4nzt6hw5G-lJvsTm" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/10zC5lwD-GX6aB8CfrHLMRz25JLw4lkZX" },
      { label: "Temporada 3", kind: "drive", href: "https://drive.google.com/drive/folders/1-3hru5GZYwWmuOX6Hj1o4j_ZZsx2baYX" },
      { label: "Temporada 4", kind: "drive", href: "https://drive.google.com/drive/folders/11Bm6aM5GJERqq_ucV8yeRuk4WTuHtYdy" },
      { label: "Temporada 5", kind: "drive", href: "https://drive.google.com/drive/folders/1J8MrqEOPDP3rpgIYkG4fhdYOB-eMwa4A?usp=sharing" },
    ],
  },
  {
    id: "vincenzo",
    title: "Vincenzo",
    type: "Série",
    genres: ["Drama", "Ação", "Crime"],
    tags: ["Máfia", "Justiça", "Coreia"],
    synopsis:
      "Ao visitar sua terra natal, um advogado coreano que trabalha para a máfia italiana se envolve em uma batalha contra um poderoso conglomerado e faz justiça a seu modo.",
    poster: poster("vincenzo_a3905ba1.jpg"),
    seasons: "1 temporada",
    language: "Dublado",
    availability: "Pasta dublada",
    accessLinks: [
      { label: "Abrir temporada", kind: "drive", href: "https://drive.google.com/drive/folders/1Kt5NPNGtTleBA7EAtK47a2FZJLFEIM4U" },
    ],
  },
  {
    id: "alphas",
    title: "Alphas",
    type: "Série",
    genres: ["Ficção científica", "Ação", "Drama"],
    tags: ["Habilidades", "Equipe", "Investigação"],
    synopsis:
      "Uma equipe de pessoas com habilidades extraordinárias se reúne para investigar casos que desafiam os limites do que a ciência consegue explicar.",
    poster: poster("alphas_5ba5d7e8.jpg"),
    seasons: "2 temporadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/1OWxNuV17aV3ShlOokt2k_3V5CckZ9aO0?usp=drive_link" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/1Kjxr2pHKZuri1UtOCueuIYY0v7l2z5oS?usp=drive_link" },
    ],
  },
  {
    id: "supernatural-anime",
    title: "Supernatural Anime",
    type: "Anime",
    genres: ["Sobrenatural", "Anime", "Terror"],
    tags: ["Irmãos", "Caçada", "Duas versões"],
    synopsis:
      "Os irmãos Winchester retornam em uma releitura em anime de suas caçadas, enfrentando fantasmas, demônios e segredos familiares.",
    poster: poster("supernatural-anime_bddce6ed.jpg"),
    seasons: "1 temporada",
    language: "Dublado e Legendado",
    availability: "Duas opções de acesso",
    accessLinks: [
      { label: "Versão dublada", kind: "youtube", href: "https://youtube.com/playlist?list=PLRQRxkpIb3Xq_GzMjqd6J2Q0xWqHNDlaW&si=yeeN6_uAUa3VtZTE" },
      { label: "Versão legendada", kind: "drive", href: "https://drive.google.com/drive/mobile/folders/17jb0dS3GFdpRzDb-EnFM4tGgRHpRR8zl?usp=sharing&fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPMjc1MjU0NjkyNTk4Mjc5AAEe9ayqaPdcjOP-RMwBhcKAkUNeljGVnynOyDU9dsnyxArdonhn-EyBEVZJqPA_aem_qPzT1Bhbb9l9BQEaMIPP-A" },
    ],
  },
  {
    id: "supernatural",
    title: "Supernatural",
    year: "2005",
    type: "Série",
    genres: ["Drama", "Terror", "Sobrenatural"],
    tags: ["Irmãos Winchester", "Caçadores", "15 temporadas"],
    synopsis:
      "Sam e Dean Winchester dedicam suas vidas a caçar criaturas sobrenaturais, incluindo demônios, fantasmas e monstros de lendas urbanas, enquanto atravessam uma jornada de família, lealdade e sacrifício.",
    poster: poster("supernatural_c1d4f0e7.jpg"),
    seasons: "15 temporadas",
    language: "Português Brasileiro",
    rating: "16",
    availability: "Todas as temporadas e episódios",
    accessLinks: [
      { label: "1ª temporada", kind: "photos", href: "https://photos.app.goo.gl/2vGytkk5hVmmvFPZ9" },
      { label: "2ª temporada", kind: "photos", href: "https://photos.app.goo.gl/2C9yJuAbSWv1dexR7" },
      { label: "3ª temporada", kind: "photos", href: "https://photos.app.goo.gl/WZsuNzVUaY6EtzRLA" },
      { label: "4ª temporada", kind: "photos", href: "https://photos.app.goo.gl/YxCmXwU1JJGNK82H8" },
      { label: "5ª temporada", kind: "photos", href: "https://photos.app.goo.gl/BmQRYsD2ZQQzz2NY9" },
      { label: "6ª temporada", kind: "photos", href: "https://photos.app.goo.gl/CBk6FSJeRrrFPbjGA" },
      { label: "7ª temporada", kind: "photos", href: "https://photos.app.goo.gl/GXsVe8GbCJTPFKRN7" },
      { label: "8ª temporada", kind: "photos", href: "https://photos.app.goo.gl/XhY8afzR3fmEaKPz8" },
      { label: "9ª temporada", kind: "photos", href: "https://photos.app.goo.gl/Wh3ubVqXEuWB69Jf6" },
      { label: "10ª temporada", kind: "photos", href: "https://photos.app.goo.gl/VquD3MSSpK99VTdv7" },
      { label: "11ª temporada", kind: "photos", href: "https://photos.app.goo.gl/zaKHfNNeJJRWeoBU7" },
      { label: "12ª temporada", kind: "photos", href: "https://photos.app.goo.gl/hzgLqJwiwq5iVKZd6" },
      { label: "13ª temporada", kind: "photos", href: "https://photos.app.goo.gl/odGMBHfK8aDcS6C5A" },
      { label: "14ª temporada", kind: "photos", href: "https://photos.app.goo.gl/6RgbEwkLyjK5QcMa6" },
      { label: "15ª temporada", kind: "photos", href: "https://photos.app.goo.gl/GLeaeaoadd2ewrXD8" },
    ],
  },
  {
    id: "witcher-nightmare",
    title: "The Witcher: Nightmare of the Wolf",
    year: "2021",
    type: "Anime",
    genres: ["Fantasia", "Ação", "Aventura"],
    tags: ["Bruxos", "Monstros", "Filme anime"],
    synopsis:
      "Antes de Geralt de Rívia se tornar o lendário Bruxo, Vesemir vive uma jornada repleta de batalhas, monstros e escolhas difíceis que ajudam a explicar a história dos bruxos.",
    poster: poster("witcher-nightmare_268ee5fe.jpg"),
    seasons: "1 filme · 1h23",
    language: "Não informado",
    availability: "Filme disponível",
    accessLinks: [
      { label: "Abrir filme", kind: "drive", href: "https://drive.google.com/file/d/13aBHu8EF26OiMPYIgCo7pvfyhF3oAtOb/view?usp=drive_link" },
    ],
  },
  {
    id: "time-tunnel",
    title: "O Túnel do Tempo",
    year: "1966",
    type: "Série",
    genres: ["Ficção científica", "Aventura", "Clássico"],
    tags: ["Viagem no tempo", "Máquina", "Clássico"],
    synopsis:
      "Dois cientistas voltam no tempo para tentar proteger um projeto secreto e ficam presos na máquina do tempo, viajando e vivendo aventuras no passado e no futuro.",
    poster: poster("time-tunnel_0a3b2280.jpg"),
    seasons: "1 temporada · 10 episódios",
    language: "Não informado",
    availability: "Episódios individuais",
    accessLinks: [
      { label: "Episódio 01", kind: "drive", href: "https://drive.google.com/file/d/18wFuU2JPkGOo1HCe7KX4rC7wPLC5kNX_/view?usp=sharing" },
      { label: "Episódio 02", kind: "drive", href: "https://drive.google.com/file/d/17Ibc0LipvFgmAsZRNxtRUTrV-T4f5c6s/view?usp=sharing" },
      { label: "Episódio 03", kind: "drive", href: "https://drive.google.com/file/d/1nbbB1VmoAjxKY7jVM5PUGI6jQSBMBMHk/view?usp=sharing" },
      { label: "Episódio 04", kind: "drive", href: "https://drive.google.com/file/d/1BKxmnHZh8dzzsqutcWrrRqBIPq4MRMAJ/view?usp=sharing" },
      { label: "Episódio 05", kind: "drive", href: "https://drive.google.com/file/d/18YK8zIH_C7OfJjYEmoN-HrRAIQRfI0wj/view?usp=sharing" },
      { label: "Episódio 06", kind: "drive", href: "https://drive.google.com/file/d/1CQpEJL3id593MsnVYInA32qCiGubNVl5/view?usp=sharing" },
      { label: "Episódio 07", kind: "drive", href: "https://drive.google.com/file/d/1nrkA0Rz9u0WxgTSUhpTejYAjWVSL4sG7/view?usp=sharing" },
      { label: "Episódio 08", kind: "drive", href: "https://drive.google.com/file/d/1TljAggk4U1M7-XX2leV4GvMVttf93fQp/view?usp=sharing" },
      { label: "Episódio 09", kind: "drive", href: "https://drive.google.com/file/d/1etVYH2VCNahi1mc168Cn0uxaVeiQuatZ/view?usp=sharing" },
      { label: "Episódio 10", note: "Link recebido incompleto" },
    ],
  },
  {
    id: "tapas-e-beijos",
    title: "Tapas & Beijos",
    year: "2011",
    type: "Série",
    genres: ["Comédia", "Nacional"],
    tags: ["Copacabana", "Amizade", "Romance"],
    synopsis:
      "Fátima e Sueli trabalham na Djalma Noivas, em Copacabana. Apesar de independentes, as duas procuram encontrar o grande amor enquanto atravessam relacionamentos tumultuados.",
    poster: poster("tapas-beijos_544f0734.jpg"),
    seasons: "5 temporadas",
    language: "Português",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/folders/1-Wibm6HLYwryTBqrZRAap_HxUChxvlyW" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/folders/1-B3fP2EB-rTCA8kR-16AI5qGI0-c_JqW" },
      { label: "Temporada 3", kind: "drive", href: "https://drive.google.com/drive/folders/1-HZZH3yfxDD5GaqMM7XUbIghEqw1Sfxt" },
      { label: "Temporada 4", kind: "drive", href: "https://drive.google.com/drive/folders/11FjddUt-vI6kTgnxS1jV45Pjvx-Zw5jy" },
      { label: "Temporada 5", kind: "drive", href: "https://drive.google.com/drive/folders/1-H4XG1U4sWgc_UcOA9sOzClGcaNn4tgx" },
    ],
  },
  {
    id: "spider-man",
    title: "Spider-Man",
    year: "1978",
    type: "Série",
    genres: ["Ação", "Aventura", "Clássico"],
    tags: ["Toei", "Herói", "Clássico"],
    synopsis:
      "Série live-action japonesa produzida pela Toei, inspirada no personagem dos quadrinhos e exibida entre 1978 e 1979, com 41 episódios.",
    poster: poster("spider-man_faf5c4c3.jpg"),
    seasons: "1 temporada · 41 episódios",
    language: "Não informado",
    availability: "Pastas informadas",
    accessLinks: [
      { label: "1ª temporada", kind: "drive", href: "https://drive.google.com/drive/folders/1-crp67j9QGavyYqwmPBfna9iT5kYzHzj" },
      { label: "2ª temporada", kind: "drive", href: "https://drive.google.com/drive/folders/18invt56cv6dDq6tuZHm71mXSZd1VDmr0" },
    ],
  },
  {
    id: "elle-legalmente-loira",
    title: "Elle, Legalmente Loira",
    year: "2026",
    type: "Série",
    genres: ["Comédia", "Coming of age"],
    tags: ["Ensino médio", "Amizade", "Origem"],
    synopsis:
      "A série acompanha Elle Woods durante os anos de ensino médio, mostrando as experiências e amizades que moldaram sua personalidade otimista, determinada e confiante.",
    poster: poster("elle-legalmente-loira_36fec626.jpg"),
    seasons: "1 temporada",
    language: "Dublado",
    availability: "Pasta dublada",
    accessLinks: [
      { label: "Abrir temporada", kind: "drive", href: "https://drive.google.com/drive/folders/1VpqHNX_9UR7sBhrA4n3kfJLJ2C1oikuP" },
    ],
  },
  {
    id: "ratched",
    title: "Ratched",
    year: "2020",
    type: "Série",
    genres: ["Terror", "Drama psicológico"],
    tags: ["Hospital", "Mente", "Suspense"],
    synopsis:
      "Em 1947, Mildred Ratched começa a trabalhar como enfermeira em um hospital psiquiátrico. Por trás da aparência impecável, cresce uma presença sombria.",
    poster: poster("cineclub-dossier_3d471072.jpg"),
    seasons: "1 temporada · 8 episódios",
    language: "Não informado",
    availability: "Episódios individuais",
    accessLinks: [
      { label: "Episódio 01", kind: "drive", href: "https://drive.google.com/file/d/1rj5bol_PpQg_aZ5XpiUrPKAgii85qcgZ/view?usp=drivesdk" },
      { label: "Episódio 02", kind: "drive", href: "https://drive.google.com/file/d/1Jm9S5Ce70biyzZy9-5eR7hxxWwUjAT2E/view?usp=drivesdk" },
      { label: "Episódio 03", kind: "drive", href: "https://drive.google.com/file/d/1NiIuOdrdm9lzlaAgdqnBH40YSsVN-TWs/view?usp=drivesdk" },
      { label: "Episódio 04", kind: "drive", href: "https://drive.google.com/file/d/1lDGxWcJ0GiAG0SIgt17Rqog4VZk6DQ4J/view?usp=drivesdk" },
      { label: "Episódio 05", kind: "drive", href: "https://drive.google.com/file/d/1coEUI-ckr8JWH-ddP4pnFW7HnA1WCO6f/view?usp=drivesdk" },
      { label: "Episódio 06", kind: "drive", href: "https://drive.google.com/file/d/1IpPrC17fU8uB3RuE6-g13n7ZlIbqzgeH/view?usp=drivesdk" },
      { label: "Episódio 07", kind: "drive", href: "https://drive.google.com/file/d/1fzetyV6WjC07rMCWIwT1exFw0bZumyRi/view?usp=drivesdk" },
      { label: "Episódio 08", kind: "drive", href: "https://drive.google.com/file/d/1Apzo4uFi_vNnhsDXs66e-eo7kL6V_HxL/view?usp=drivesdk" },
    ],
  },
  {
    id: "scary-movie",
    title: "Todo Mundo em Pânico",
    year: "2026",
    type: "Filme",
    genres: ["Comédia", "Terror"],
    tags: ["Paródia", "Máscara", "Filme"],
    synopsis:
      "Uma comédia que brinca com o terror moderno e seus clichês, reunindo uma nova rodada de personagens perseguidos por um assassino mascarado.",
    poster: poster("scary-movie_2f25860f.jpg"),
    seasons: "1h36 · filme",
    language: "Dublado / Full HD",
    availability: "Filme disponível",
    accessLinks: [
      { label: "Abrir filme", kind: "drive", href: "https://drive.google.com/file/d/1Xm0ikQCCjqEBRnbXHau5ermfsysmI2zi/view" },
    ],
  },
  {
    id: "professor-madman",
    title: "O Gênio e o Louco",
    year: "2019",
    type: "Filme",
    genres: ["Drama", "História", "Biografia"],
    tags: ["Oxford", "Palavras", "Século XIX"],
    synopsis:
      "A vida do professor James Murray é retratada a partir do momento em que ele começa a trabalhar na compilação de palavras para a primeira edição do Dicionário de Inglês de Oxford, em meados do século XIX.",
    poster: poster("professor-madman_ee6efec0.jpg"),
    seasons: "Filme",
    language: "Não informado",
    availability: "Filme disponível",
    accessLinks: [
      { label: "Assistir filme", kind: "drive", href: "https://drive.google.com/file/d/1-DlY_OB0MCDCCSH1_yi6saGZ4xf2pzXH/view" },
    ],
  },
  {
    id: "imitation-game",
    title: "O Jogo da Imitação",
    year: "2015",
    type: "Filme",
    genres: ["Drama", "História", "Biografia"],
    tags: ["Alan Turing", "Enigma", "Segunda Guerra"],
    synopsis:
      "Em 1939, Alan Turing é recrutado pela inteligência britânica para ajudar a decifrar códigos nazistas, enquanto constrói uma máquina capaz de enfrentar o Enigma e muda o curso da guerra.",
    poster: poster("imitation-game_d5b8a0e4.jpg"),
    seasons: "Filme",
    language: "Não informado",
    availability: "Filme disponível",
    accessLinks: [
      { label: "Assistir filme", kind: "drive", href: "https://drive.google.com/file/d/1hcfme9SrSp6-jGqS5q4ClblnZB2yVBnb/view?usp=drivesdk" },
    ],
  },
  {
    id: "odyssey",
    title: "A Odisseia",
    year: "2026",
    type: "Filme",
    genres: ["Ação", "Fantasia", "Aventura"],
    tags: ["Mitologia", "Deuses", "Jornada"],
    synopsis:
      "O rei grego Odisseu tenta voltar para casa em Ítaca após a Guerra de Troia. Enfrentando deuses furiosos e criaturas míticas, sua jornada se estende enquanto Penélope resiste aos pretendentes do trono.",
    poster: poster("odyssey_52071e3c.jpg"),
    seasons: "Filme · HDCAM",
    language: "Dublado / Legendado",
    availability: "GoFile · acesso direto",
    accessLinks: [
      { label: "Assistir filme", kind: "drive", href: "https://gofile.io/d/OxZH55" },
    ],
  },
  {
    id: "chicago-fire",
    title: "Chicago Fire: Heróis Contra o Fogo",
    year: "2012",
    type: "Série",
    genres: ["Drama", "Ação"],
    tags: ["Bombeiros", "Equipe", "Resgate"],
    synopsis:
      "As vidas profissionais e pessoais dos bombeiros e paramédicos que enfrentam chamados extremos enquanto tentam manter a própria equipe unida.",
    poster: poster("chicago-fire_91d76e9f.jpg"),
    seasons: "6 temporadas informadas",
    language: "Não informado",
    availability: "Pastas por temporada",
    accessLinks: [
      { label: "Temporada 1", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1GwnrcAN8tBtJQQ46cD5mn1r3-rcqGQHi" },
      { label: "Temporada 2", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1M-g92ZMZ7781ly9Lz-AfOt16z74OZpTu" },
      { label: "Temporada 3", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1R1BvK92W15W6hUVtqVxt-15W98JMI_SV" },
      { label: "Temporada 4", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1mQvZPZFOoXVnhn2q2Z3vfsm-oEp5jr8d" },
      { label: "Temporada 5", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1pTFzx48f8pEEfNv9q_D_e_3MiUg8vr92" },
      { label: "Temporada 6", kind: "drive", href: "https://drive.google.com/drive/u/0/mobile/folders/1iAqsb-CeTxCoW_dkNZTJvNqJHUq4LVVz" },
    ],
  },
];

export const collections = [
  {
    id: "doors",
    eyebrow: "Seleção sobrenatural",
    title: "Para assistir no escuro",
    description: "Caçadores, sonhos e outras histórias para começar agora.",
    itemIds: ["constantine", "supernatural", "supernatural-anime", "sandman", "penny-dreadful", "witcher-nightmare"],
  },
  {
    id: "terror",
    eyebrow: "Noites de terror",
    title: "O medo muda de forma",
    description: "Antologias, laboratórios e rituais para quem gosta de deixar a luz acesa.",
    itemIds: ["se-desejos-matassem", "50-states-of-fright", "into-the-dark", "helix", "ratched"],
  },
  {
    id: "long-night",
    eyebrow: "Para maratonar",
    title: "Para atravessar a madrugada",
    description: "Universos extensos e temporadas esperando pelo próximo play.",
    itemIds: ["the-boys", "handmaids-tale", "chicago-fire", "tapas-e-beijos", "alphas"],
  },
  {
    id: "archive",
    eyebrow: "Mais histórias",
    title: "Histórias fora do radar",
    description: "Clássicos, comédias e descobertas para assistir sem pressa.",
    itemIds: ["time-tunnel", "spider-man", "vincenzo", "elle-legalmente-loira", "scary-movie"],
  },
  {
    id: "films",
    eyebrow: "Filmes",
    title: "Escolha seu próximo filme",
    description: "Histórias reais, jornadas lendárias e comédias para assistir agora.",
    itemIds: ["scary-movie", "professor-madman", "imitation-game", "odyssey"],
  },
];

export const getCatalogItem = (id: string) => catalog.find((item) => item.id === id);
