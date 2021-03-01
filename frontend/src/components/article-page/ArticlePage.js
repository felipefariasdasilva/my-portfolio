import { Button, Divider } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useApi from '../../services/api'
import './style.css'
import { Markup } from 'interweave';

export default function ArticlePage() {
    
    const api = useApi()
    const history = useHistory()

    const [article, setArticle] = useState({})
    const params = useParams()
    const [text, setText] = useState('')

    useEffect( () => {
       
        const getArticleById = async () => {

            const json = await api.getArticleById(params.id)
            console.log(json);
            setArticle(json)
        }

        getArticleById()

        setText(article.text)

    }, [])

    return (

        <div className="new-article-button">

            <Button
                variant="contained"
                color="primary"
                onClick={ () => history.push('/articles')} 
            >
                Ver artigos
            </Button>

            <div className="article-body">

            {article && 
                <div>
                    <h1>{ article.title } </h1>
                    <p>{ article.lastEdition } </p>
                    <br/>
                    <Divider />
                 
                    <br/>
                    <Markup content={article.text} />

                </div>
            }
            
            </div>
        </div>

        

    )
}
