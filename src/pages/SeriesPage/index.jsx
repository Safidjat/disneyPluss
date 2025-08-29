import MoviesSeriesView from "../../components/main/MoviesSeriesView"
import useMoviesSeriesPagesLogic from "../../hooks/useMoviesSeriesPagesLogic";

function SeriesPage() {
    return <MoviesSeriesView {...useMoviesSeriesPagesLogic('series')} />;
}

export default SeriesPage
