import Recipes from "../Components/Recipes";
import { Row } from 'react-bootstrap'
import Search from "../Components/Search";
import { useEffect, useRef, useState } from "react";
import Cuisines from "../Components/Cuisines";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../Redux/Recipe";

const Home = () => {
    const recipe = useSelector((state) => state.recipe);
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [cuisine, setCuisine] = useState('');
    const queryRef = useRef(query);
    const cuisineRef = useRef(cuisine);
    const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European',
        'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean',
        'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

    useEffect(() => {
        const abortcont = new AbortController();
        if (!recipe.data || queryRef.current !== query || cuisineRef.current !== cuisine) {
            queryRef.current = query
            cuisineRef.current = cuisine
            setIsPending(true);
            dispatch(addRecipe(null))
            let url = `random?apiKey=${process.env.REACT_APP_RESHAD}&number=9`;
            if (query || cuisine) {
                url = `complexSearch?apiKey=${process.env.REACT_APP_RESHAD}&query=${query}&cuisine=${cuisine}`;
            }
            fetch(`https://api.spoonacular.com/recipes/${url}`, { signal: abortcont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setTimeout(() => {
                        if (query || cuisine) {
                            dispatch(addRecipe(data.results))
                        }
                        else {
                            dispatch(addRecipe(data.recipes))
                        }
                        setIsPending(false);
                    }, 1000);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    }
                    else {
                        setIsPending(false)
                        setError(err.message)
                        dispatch(addRecipe(null))
                    }
                })
        }
        return () => abortcont.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, cuisine])

    return (
        <div className="Home">
            <Row>
                <Search query={query} setQuery={setQuery} />
                <Cuisines cuisines={cuisines} cuisine={cuisine} setCuisine={setCuisine} />
                <Recipes recipes={recipe.data} isPending={isPending} error={error} />
            </Row>
        </div>);
}

export default Home;