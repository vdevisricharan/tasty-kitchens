import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781951402/erroring_1_1_t7jjir.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-text">
          We are sorry, the page you requested could not be found. <br />
          Please go back to the homepage
        </p>
        <Link to="/">
          <button type="button" className="home-page-btn">
            Home Page
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
