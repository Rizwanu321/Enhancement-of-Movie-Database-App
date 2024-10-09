import {useState, useEffect, useCallback} from 'react'
import Header from '../Header'
import MovieList from '../MovieList'
import Pagination from '../Pagination'
import './index.css'

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  const updatedData = data => ({
    results: data.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  const getData = useCallback(async (page = 1) => {
    const API_KEY = '7333bceec5b6a36519b2ae68f1698d4c'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const options = {method: 'GET', headers: {accept: 'application/json'}}

    try {
      const res = await fetch(apiUrl, options)
      const responseData = await res.json()

      if (res.ok) {
        const data = updatedData(responseData)
        setMovies(data.results)
        setTotalPages(responseData.total_pages)
        setError(null)
      } else {
        setError('Something went wrong')
      }
    } catch (err) {
      setError('Failed to fetch data')
    }
  }, [])

  useEffect(() => {
    getData(currentPage)
  }, [currentPage, getData])

  const renderMovies = () => {
    if (error) {
      return (
        <div className="err-container">
          <p className="err">{error}</p>
          <button
            type="button"
            className="retry-btn"
            onClick={() => getData(currentPage)}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="home-container">
        <h1 className="page-heading">Upcoming</h1>
        <ul className="responsive-movie-list-container">
          {movies.map(movie => (
            <MovieList key={movie.id} movieData={movie} />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    )
  }

  return (
    <>
      <Header />
      {renderMovies()}
    </>
  )
}

export default Upcoming
