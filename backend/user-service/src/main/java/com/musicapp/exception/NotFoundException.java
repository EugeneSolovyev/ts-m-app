package com.musicapp.exception;

import lombok.Getter;

/**
 * Генерируется если сущность не найдена.
 *
 * @author evgeniycheban
 */
@Getter
public class NotFoundException extends RuntimeException {

    private final String field;

    public NotFoundException(String message, String field) {
        super(message);
        this.field = field;
    }

}
