import {
  GENRES_REQUEST,
  GENRES_SUCCESS,
  GENRES_FAILED,
  SUBMIT_SUBGENRE,
  SUBMIT_SUBGENRE_SUCCESS,
  SUBMIT_BOOK,
  SUBMIT_BOOK_SUCCESS,
  SUBMIT_BOOK_FAILED,
} from '../actions';

const entitiesDefaultState = {
  genres: {},
  genresIds: [],
  subgenres: {},
  isLoading: true
};

function addSubgenreToGenre(genres, payload) {
  const genreId = payload.genre;
  const subGenreId = payload.id;
  const genre = genres[genreId];
  return {
    ...genres,
    [genreId]: {
      ...genre,
      subgenres: genre.subgenres.concat(subGenreId)
    }
  }
}

function addSubgenre(subgenres, payload) {
  return {
    ...subgenres,
    [payload.id]: {
      id: payload.id,
      name: payload.name,
      // if not checked it won't be sent to the server
      // payload is server processed response
      isDescriptionRequired: payload.isDescriptionRequired || false
    }
  }
}

const entities = (state = entitiesDefaultState, action) => {
  switch (action.type) {
    case SUBMIT_SUBGENRE:
    case SUBMIT_BOOK:
    case GENRES_REQUEST:
      return Object.assign({}, state, {isLoading: true});
    case GENRES_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.entities,
        genresIds: action.data.result,
        isLoading: false
      });
    case GENRES_FAILED:
      return state;
    case SUBMIT_SUBGENRE_SUCCESS:
      return {
        ...state,
        genres: addSubgenreToGenre(state.genres, action.payload),
        subgenres: addSubgenre(state.subgenres, action.payload)
      };
    case SUBMIT_BOOK_SUCCESS:
      // book could be added to entities for preview
      console.log('PRINTING BOOK DATA');
      console.dir(action.payload);
      return Object.assign({}, state, {isLoading: false});
    case SUBMIT_BOOK_FAILED:
      return Object.assign({}, state, {isLoading: false});
    default:
      return state;
  }
}

export default entities;