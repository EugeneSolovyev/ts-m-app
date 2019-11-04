package com.musicapp.domain;

import lombok.Data;

/**
 * Доменное событие.
 *
 * @author evgeniycheban
 */
@Data
public class DomainEvent<T> {

    private final T subject;

    private final DomainEventType type;

}
