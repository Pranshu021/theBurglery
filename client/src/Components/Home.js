import '../CSS/Home.css'
import Menu from './Menu';

const Home = (props) => {

  // const loggedIn = useSelector(state => state.loginInfo);
// 
  // useEffect (() => {
    
  //   if(!loggedIn.isLoggedIn){ 
  //     navigate('/login');
  //     console.log('not logged in');
  //   }
  // } , []);

  return (
    
    <div className="container home-container">
      <div className="row">
          <div className="col-lg-12">
            <h2>Menu</h2>
            </div>
          <Menu />
      </div>
    </div>
  );
};

export default Home;