import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/reducers/authSlice';
import logo from '../images/argentBankLogo.webp';
import { Link, useNavigate } from "react-router-dom";



function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);  
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    navigate('/')
    dispatch(logout());    
  };
      
    return (
        <nav className="main-nav">
          <Link to="/" className="main-nav-logo">
          <img
              className="main-nav-logo-image"
              src={logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>          
          <div>
          {token ? (
            <div className="main-nav">
              <div>
                <i className="fa fa-user-circle"></i>
               
              </div>
              <Link className="main-nav-item" to="/user">{user.userName}</Link>
           
              {token && ( //i className="=fa fa-sign-out a mettre devant le logout pour l'icone //
                <Link className="main-nav-item" to="/" onClick={handleLogout}> <i className="fa fa-sign-out"></i>
                  Logout
                </Link>
              )}               
            </div>
            
          ) : (
            <a className="main-nav-item" href={"./login"} >
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          )}
          </div>
      </nav>
    );
  };
  
  export default Nav;