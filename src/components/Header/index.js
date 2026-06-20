import {useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'

import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  // Helper to determine if a link is active
  const isActive = path => (location.pathname === path ? 'active-nav-link' : '')

  return (
    <nav className="nav-header">
      <div className="nav-content desktop-nav">
        <Link to="/" className="nav-logo-container">
          <img
            src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781943535/logo_jtmsn3.png"
            alt="website logo"
            className="header-logo"
          />
          <h1 className="header-title">Tasty Kitchens</h1>
        </Link>

        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/cart" className={`nav-link ${isActive('/cart')}`}>
              Cart
            </Link>
          </li>
          <li className="nav-menu-item">
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="nav-content mobile-nav">
        <div className="mobile-header-top">
          <Link to="/" className="nav-logo-container">
            <img
              src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781943535/logo_jtmsn3.png"
              alt="website logo"
              className="header-logo"
            />
            <h1 className="header-title">Tasty Kitchens</h1>
          </Link>
          <button type="button" className="hamburger-btn" onClick={toggleMenu}>
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu-dropdown">
            <ul className="nav-menu-mobile">
              <li className="nav-menu-item">
                <Link to="/" className={`nav-link ${isActive('/')}`}>
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/cart" className={`nav-link ${isActive('/cart')}`}>
                  Cart
                </Link>
              </li>
              <li className="nav-menu-item">
                <button
                  type="button"
                  className="logout-mobile-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-menu-btn"
              onClick={toggleMenu}
            >
              <AiOutlineCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
