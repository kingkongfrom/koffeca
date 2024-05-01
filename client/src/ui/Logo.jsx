import logo from "../images/logo.png";

const Logo = ({ width, height }) => {
    return (
        <img src={logo} width={width} height={height} alt="Koffeeca logo"/>
    );
};
export default Logo;
