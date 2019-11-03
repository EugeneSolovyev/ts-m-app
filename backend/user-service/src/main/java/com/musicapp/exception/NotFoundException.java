package com.musicapp.exception;

import lombok.Getter;

/**
 * Исключение при нахождении сущности
 *
 * @author evgeniycheban
 */
@Getter
public class NotFoundException extends RuntimeException {

    private final String field;

    /**
     * @param message сообщение об ошибке
     * @param field   поле сущности
     */
    public NotFoundException(String message, String field) {
        super(message);
        this.field = field;
    }

}
