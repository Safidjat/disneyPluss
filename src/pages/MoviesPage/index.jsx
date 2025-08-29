import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import useMoviesSeriesPagesLogic from "../../hooks/useMoviesSeriesPagesLogic";

function MoviesPage() {
    return <MoviesSeriesView {...useMoviesSeriesPagesLogic('movie')} />;
}

export default MoviesPage
