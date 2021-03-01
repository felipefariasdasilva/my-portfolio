import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Button,
    ButtonBase,
    Dialog,
    DialogTitle,
    Input,
    TextareaAutosize,
    Typography
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import useApi from '../../services/api'
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css'
import { Link, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Article() {

    const [id, setId] = useState('')
    const [articles, setArticles] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const api = useApi()
    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    const getArticles = async () => {

        const json = await api.getArticles()
        if (json) {
            console.log(json);
            setArticles(json)
        }
    } 

    const handlePublishButton = async () => {

        const data = {
            "title": title,
            "text": text
        }
        
        const json = await api.updateArticle(id, data)
        setTitle('')
        setText('')
        setOpenModal(false)
        getArticles()

    }

    const handleClickDelete = async (id) => {
        const json = await api.deleteArticle(id)
        getArticles()
    }

    const handleClickUpdate = async (id) => {

        const articleById = await api.getArticleById(id)

        setTitle(articleById.title)
        setText(articleById.text)
        setId(id)

        setOpenModal(true)
       
    }

    return (

        <div className='article'>

            <Button 
                variant="contained" 
                color="primary" 
                className='new-article-button'
            >
                <Link to="/new-article">
                    Novo artigo
                </Link>
            </Button>

            <TableContainer component={Paper}>

                <Table size="small" aria-label="a dense table">

                    <TableHead>

                        <TableRow>

                            <TableCell>Título</TableCell>
                            <TableCell align="right">Última Edição</TableCell>
                            <TableCell align="right">Vizualizações</TableCell>
                            <TableCell align="right">Comentários</TableCell>
                            <TableCell align="right">Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        { articles && articles.map(article => (

                            <TableRow key={ article.title }>

                                <TableCell component="th" scope="row">
                                    <b>{ article.title }</b>
                                </TableCell>

                                <TableCell align="right">
                                    { article.lastEdition }
                                </TableCell>

                                <TableCell align="right">
                                    { article.views }
                                </TableCell>

                                <TableCell align="right">
                                    2
                                </TableCell>

                                <TableCell align="right">

                                <div className="action-buttons">
            
                                    <Button 
                                        variant="contained" 
                                        color="secondary"
                                    >
                                        <Link to={`/article/${article.id}`}>
                                            View
                                        </Link>
                                    </Button>

                                    <ButtonBase
                                        variant="contained" 
                                        color="primary"
                                        onClick={ () => handleClickUpdate(article.id)}
                                    >
                                        <EditIcon>
                                            Editar
                                        </EditIcon>
                                    </ButtonBase>

                                    <ButtonBase
                                        variant="contained" 
                                        color="secondary"
                                        onClick={ () => handleClickDelete(article.id)}
                                    >
                                        <DeleteIcon>
                                        Excluir
                                        </DeleteIcon>
                                        
                                    </ButtonBase>

                                </div>

                                </TableCell>

                            </TableRow>

                        ))}
 
                    </TableBody>

                </Table>

            </TableContainer>

            <Dialog 
                open={openModal}
                onClose={ () => setOpenModal(false) }
            >

                <DialogTitle id="alert-dialog-title">
                    Editart Artigo
                </DialogTitle>

                <DialogContent>

                    <form>

                        <Typography>Título</Typography>
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Typography>Texto</Typography>
                        <TextareaAutosize 
                            value={text}
                            className="new-article-text-area"
                            rowsMin={15}
                            onChange={e => setText(e.target.value)}
                        />

                    </form>

                </DialogContent>

                <DialogActions>

                    <Button 
                        onClick={ () => setOpenModal(false) }
                        variant="contained"
                        color="secondary"
                    >
                        Cancelar
                    </Button>

                    <Button 
                        onClick={handlePublishButton}
                        variant="contained"
                        color="primary"
                        autoFocus
                    >
                        Publicar
                    </Button>

                </DialogActions>
            </Dialog>

        </div>

    );
}

export default Article
