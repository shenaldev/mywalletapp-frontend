function HamburgerButton(props) {
  const HambergerClickHandler = () => {
    props.onClick();
  };

  return (
    <div className={`lg:hidden hamburger-icon ${props.className ? props.className : ""}`} onClick={HambergerClickHandler}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerButton;
