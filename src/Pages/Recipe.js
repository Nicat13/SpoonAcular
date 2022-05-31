import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import RecipeInfo from '../Components/RecipeInfo'
import Recipes from "../Components/Recipes";

function Recipe() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [similarRecipes, setSimilarRecipes] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setRecipe(null)
        const abortcont = new AbortController();
        fetch(`https://api.spoonacular.com/recipes/${slug}/information?apiKey=${process.env.REACT_APP_RESHAD}`, { signal: abortcont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setTimeout(() => {
                    setRecipe(data)
                }, 1000);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                }
            })

        setIsPending(true);
        setSimilarRecipes(null);
        fetch(`https://api.spoonacular.com/recipes/${slug}/similar?apiKey=${process.env.REACT_APP_RESHAD}`, { signal: abortcont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                let response = [];
                data.map((item) => (
                    response.push({ 'title': item.title, 'id': item.id, 'image': `https://spoonacular.com/recipeImages/${item.id}-556x370.jpg` })
                ))
                setTimeout(() => {
                    setSimilarRecipes(response);
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
                    setSimilarRecipes(null)
                }
            })
        return () => abortcont.abort();
    }, [slug])



    return (
        <div className='Recipe'>
            <Link style={{ color: '#614124', textDecoration: 'none', display: 'block', paddingBottom: '8px' }} to={`/`}>{'<'} Home</Link>
            <Row>
                <RecipeInfo recipe={recipe} />
                <h5 style={{ paddingTop: '40px', paddingBottom: '20px', color: '#614124', fontSize: '25px', fontWeight: '500' }}>Similar recipes</h5>
                <Recipes recipes={similarRecipes} isPending={isPending} error={error} />
            </Row>
        </div>
    )
}

export default Recipe