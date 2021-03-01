package com.felipe.myportfolio.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString
public class Article {

    @Id
    private String id;
    private String title;

    @Lob
    private String text;
    private int views;
    private int comments;
    private String lastEdition;

    public Article(final String title, final String text) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.text = text;
        this.views = 0;
        this.comments = 0;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        this.lastEdition = LocalDate.now().format(formatter);
    }
}
