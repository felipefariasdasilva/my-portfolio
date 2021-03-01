import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Body from './components/body/Body'
import Article from './components/article/Article'
import Project from './components/project/Project'
import ArticlePage from './components/article-page/ArticlePage'
import NewArticle from './components/new-article/NewArticle'

function Routes(){

    return(

        <BrowserRouter>
        
            <Switch>

                <Route exact path="/" component={Body} />
                <Route path="/articles" component={Article} />
                <Route path="/article/:id" component={ArticlePage}/>
                <Route path="/new-article" component={NewArticle}/>
                <Route path="/projects" component={Project} />

            </Switch>

        </BrowserRouter>

    )

}

export default Routes