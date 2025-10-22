import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllArtisans, getArtisansByCategory, searchArtisan } from "../services/api";
import CardArtisan from "../components/CardArtisan";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);
  const query = useQuery();
  const category = query.get("category");
  const search = query.get("search");

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        if (search) {
          const res = await searchArtisan(search);
          setArtisans(res.data);
        } else if (category) {
          const res = await getArtisansByCategory(category);
          setArtisans(res.data);
        } else {
          const res = await getAllArtisans();
          setArtisans(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtisans();
  }, [category, search]);

  return (
    <div>
      <h1>Liste des artisans</h1>
      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        artisans.map(a => <CardArtisan key={a.id} artisan={a} />)
      )}
    </div>
  );
};

export default Artisans;
