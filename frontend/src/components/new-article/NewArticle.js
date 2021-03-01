import React, {useState, useRef, useMemo} from 'react'
import {
    Button,
    Input,
    TextareaAutosize,
    Typography
} from '@material-ui/core';
import useApi from '../../services/api'
import './style.css'
import { useHistory } from 'react-router-dom';
import JoditEditor from 'jodit-react';

export default function NewArticle() {

    const api = useApi()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handlePublishArticle = async () => {
        let json = {}
        if(title !== '' && text !== ''){
            console.log("title: " + title);
            console.log("text: " + text);
            const body = { "title": title, "text": text } 
            json = await api.createArticle(body)
            console.log(json);
            history.push(`/article/${json.id}`)
        }
    }

    const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    const handleChange = (e) => {        
        setText(e)
    }

    return useMemo(() => ( 

        <div className="new-article">

            <form>

                <Typography>
                    <h2>Título</h2>
                </Typography>
                <Input 
                    onChange={ e => setTitle(e.target.value)}
                />

                <br/><br/><br/>

                <JoditEditor
                    ref={editor}                  
                    config={config}
                    value={text}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)} 
                    onChange={e => setText(e)}
                />

            </form>

            <br/>

            <Button
                variant="contained"
                color="primary"
                onClick={handlePublishArticle}
            >
                Publicar
            </Button>

            <br />

        </div>
    ), [])
}
