package com.musicapp.domain;

import lombok.Data;

/**
 * Доменное событие
 *
 * @author evgeniycheban
 */
@Data
public class DomainEvent<T> {

    /**
     * объект доменного события
     */
    private final T subject;

    /**
     * тип доменного события
     */
    private final DomainEventType type;

}
