import "./App.css";
import { NumberView } from "./features/NumberView";
import { ThunkMiddleware } from "redux-thunk";
import axios from "axios";
import createStore from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

export const addListings = (listings) => {
  return {
    type: "ADD_LISTINGS",
    listings,
  };
};

export const loadingListings = () => {
  return {
    type: "LOADING_LISTINGS",
  };
};

export const resetAllLoaded = () => {
  return {
    type: "RESET_ALL_LOADED",
  };
};

/* eslint-disable */
switch (action.type) {
  case "LOADING_LISTINGS": {
    return { ...state, loading: true };
  }
  case "RESET_ALL_LOADED": {
    return { ...state, allLoaded: false };
  }
  case "ADD_LISTINGS": {
    return {
      ...state,
      pageNumber: state.pageNumber + 1,
      listings: [...state.listings, ...action.listings],
      allLoaded: action.listings.length < 21 ? true : false,
      loading: false,
      show: {},
    };
  }
  default:
    return state;
}

const listingURL = "https://jsonplaceholder.typicode.com/photos";
export const fetchListings = (pageNumber) => {
  return (dispatch) => {
    dispatch(loadingListings());
    fetch(listingURL + "?q=" + pageNumber)
      .then((res) => res.json())
      .then((listings) => dispatch(addListings(listings)));
  };
};

const isBottom = (el) => {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
};
const trackScrolling = useCallback(() => {
  const el = document.getElementById("listing-container");
  if (isBottom(el) && !loading) {
    fetchListings(pageNumber)(dispatch);
  }
}, [pageNumber, dispatch, loading]);

useEffect(() => {
  if (!allLoaded) document.addEventListener("scroll", trackScrolling);
  return () => {
    document.removeEventListener("scroll", trackScrolling);
  };
}, [trackScrolling, allLoaded, dispatch]);

useEffect(() => {
  return () => dispatch(resetAllLoaded());
}, [dispatch]);
function App() {
  return (
    <div className="App">
      <div id="listing-container">
        <div className="row row-cols-1 row-cols-md-3 gx-3">
          {listings.map((listing) => (
            <Listing listing={listing} />
          ))}
        </div>
      </div>
      {loading && <LoadingListing />}
    </div>
  );
}

export default App;
