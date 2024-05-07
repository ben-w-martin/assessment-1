import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

function NavBar() {
  const [showOpenMenu, setShowOpenMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", onViewPortChange);
  }, []);

  const onViewPortChange = (e) => {
    const { innerWidth } = e.currentTarget;

    if (innerWidth > 1000) {
      setShowMenu(false);
      setShowOpenMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const onMenuClick = () => {
    console.log("menu clicked");
    setShowOpenMenu(!showOpenMenu);
  };

  const onDropdownEnter = () => {
    setShowDropdown(true);
  };

  const onDropdownLeave = () => {
    setShowDropdown(false);
  };

  const onShopClick = () => {
    navigate("/products");
  };

  const onHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__left">
            <div className="nav__logo">
              <a onClick={onHomeClick} className="nav__logo--link" href="">
                EverGlow
              </a>
            </div>
          </div>
          {showMenu && <Menu onMenuClick={onMenuClick} />}
          <div
            className={
              !showOpenMenu ? "nav__right" : "nav__right nav__right--show"
            }
          >
            <div className="nav__item nav__item--profile">
              <a href="#" className="nav-link">
                Profile
              </a>
            </div>
            <div className="nav__item">
              <div
                onMouseEnter={onDropdownEnter}
                onMouseLeave={onDropdownLeave}
                className="nav__item--dropdown"
              >
                <a className="nav-link" href="#">
                  About Us
                  <span className="dropdown-caret">
                    <i
                      className={
                        !showDropdown
                          ? "fa-solid fa-caret-down"
                          : "fa-solid fa-caret-up"
                      }
                    ></i>
                  </span>
                </a>
                {showDropdown && (
                  <ul className="dropdown">
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Our Story
                      </a>
                    </li>
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Non-profit
                      </a>
                    </li>
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Whom We Support
                      </a>
                    </li>
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Blog
                      </a>
                    </li>
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Podcast
                      </a>
                    </li>
                    <li className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        Volunteer
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="nav__item">
              <a href="#" className="nav-link">
                Our Values
              </a>
            </div>
            <div className="nav__item">
              <a href="#" className="nav-link">
                Our Mission
              </a>
            </div>
            <div className="nav__item">
              <a onClick={onShopClick} className="nav-link">
                Shop
              </a>
            </div>
            <div className="nav__item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </div>
            <div className="nav__item">
              <a href="#" className="nav-link">
                Careers
              </a>
            </div>
          </div>
          <div className="nav__user">
            <div className="nav__user--name">Rachel Smith</div>
            <div className="nav__user--icon">
              <a href="#">
                <img
                  className="nav__user--img"
                  src="\src\assets\user.jpeg"
                  alt="user icon"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { NavBar };
