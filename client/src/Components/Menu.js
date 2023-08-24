import '../CSS/menu.css';
import FlipCard from './FlipCard';
import useFetch from '../hooks/useFetch';

const Menu = (props) => {
    // const {data:burgerData, isLoading,  isError: error} = useFetch('https://api.jsonbin.io/v3/b/64ddcbbf9d312622a3927e81');
    const {data:burgerData, isLoading,  isError: error} = useFetch('/api/burgers/burgersList');
    
    return (
        <div className="container menu-container">
           <div className="row menu-row g-3">
               {isLoading && <div className="alert alert-warning">Loading...</div>}
               {error && <div className="alert alert-danger">{error}</div>}
               {burgerData && burgerData.map(burger => {
                  return <FlipCard 
                  key={burger._id} 
                  burgerName={burger.burger_name} 
                  burgerPrice={burger.burger_price}
                  />
              })}
           </div>
        </div>
    )
};

// burgerImage={burger.image_path}

export default Menu;
