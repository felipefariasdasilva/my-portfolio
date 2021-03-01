package com.felipe.myportfolio.repository;

import com.felipe.myportfolio.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, String> {
}
