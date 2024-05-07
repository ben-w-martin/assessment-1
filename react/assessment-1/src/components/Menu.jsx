function Menu(props) {
  return (
    <div
      onClick={props.onMenuClick}
      className="nav__menu"
      htmlFor="menu-checkbox"
    >
      <span className="nav__menu--span">&nbsp;</span>
    </div>
  );
}

export { Menu };
