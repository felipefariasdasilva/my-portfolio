package com.felipe.myportfolio.article;

import com.felipe.myportfolio.article.form.ArticleForm;
import com.felipe.myportfolio.model.Article;
import com.felipe.myportfolio.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/articles")
@CrossOrigin
public class ArticleController {

    @Autowired private ArticleRepository articleRepository;

    @GetMapping
    public ResponseEntity<List<Article>> getArticles(){
        return new ResponseEntity(articleRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") String id){
        final Optional<Article> article = articleRepository.findById(id);
        if(article.isPresent()){
            int views = article.get().getViews() + 1;
            article.get().setViews(views);
            articleRepository.save(article.get());
        }
        return new ResponseEntity<>(article.orElse(null), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createArticle(@RequestBody ArticleForm form,
                                        UriComponentsBuilder uriComponentsBuilder){

        System.out.println("criando novo artigo");
        Article article = new Article(form.getTitle(), form.getText());
        articleRepository.save(article);
        URI uri = uriComponentsBuilder
                .path("/articles/{id}")
                .buildAndExpand(article.getId())
                .toUri();

        return ResponseEntity.created(uri).body(article);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteArticleById(@PathVariable("id") String id){
        articleRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateArticleById(
            @PathVariable("id") String id,
            @RequestBody ArticleForm form,
            UriComponentsBuilder uriComponentsBuilder){

        final Optional<Article> oldArticle = articleRepository.findById(id);
        Article article = new Article();
        URI uri = null;

        System.out.println(form);
        if(oldArticle.isPresent()){

            article.setId(oldArticle.get().getId());
            article.setTitle(form.getTitle());
            article.setText(form.getText());
            article.setViews(oldArticle.get().getViews());
            article.setComments(oldArticle.get().getComments());
            article.setLastEdition(LocalDate.now().toString());

            articleRepository.save(article);
            uri = uriComponentsBuilder
                    .path("/articles/{id}")
                    .buildAndExpand(article.getId())
                    .toUri();
        }

        return ResponseEntity.created(uri).body(article);

    }

}
