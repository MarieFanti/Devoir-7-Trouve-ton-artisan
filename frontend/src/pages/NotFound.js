import backgroundImage from '../assets/404page.jpg';

const NotFound = () => (
  <div
    className="notfound-container"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="overlay"></div>
    <h1>Page non trouvée</h1>
    <p>La page que vous avez demandée n’existe pas.</p>
  </div>
);

export default NotFound;
