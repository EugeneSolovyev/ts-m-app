package com.musicapp.domain;

import javax.persistence.*;

/**
 * Базовая сущность
 *
 * @author evgeniycheban
 */
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    /**
     * @return идентификатор
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id - идентификатор
     */
    public void setId(Long id) {
        this.id = id;
    }

}
