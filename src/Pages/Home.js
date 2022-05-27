import Recipes from "../Components/Recipes";
import { Row } from 'react-bootstrap'
import Search from "../Components/Search";
import { useEffect, useState } from "react";
import Cuisines from "../Components/Cuisines";

const Home = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [cuisine, setCuisine] = useState('');
    const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European',
        'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean',
        'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

    useEffect(() => {
        setIsPending(true);
        setData(null);
        let url = `random?apiKey=${process.env.REACT_APP_RESHAD}&number=9`;
        if (query || cuisine) {
            url = `complexSearch?apiKey=${process.env.REACT_APP_RESHAD}&query=${query}&cuisine=${cuisine}`;
        }
        const abortcont = new AbortController();
        fetch(`https://api.spoonacular.com/recipes/${url}`, { signal: abortcont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                if (query || cuisine) {
                    setData(data.results);
                }
                else {
                    setData(data.recipes);
                }
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                }
                else {
                    setIsPending(false)
                    setError(err.message)
                    setData(null)
                }
            })
        return () => abortcont.abort();
    }, [query, cuisine])

    return (
        <div className="Home">
            <Row>
                <Search query={query} setQuery={setQuery} />
                <Cuisines cuisines={cuisines} cuisine={cuisine} setCuisine={setCuisine} />
                <Recipes recipes={data} isPending={isPending} error={error} />
            </Row>
        </div>);
}

export default Home;