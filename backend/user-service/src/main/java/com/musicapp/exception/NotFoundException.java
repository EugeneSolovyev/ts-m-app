package com.musicapp.exception;

/**
 * Исключение при нахождении сущности
 *
 * @author evgeniycheban
 */
public class NotFoundException extends RuntimeException {
    private final String field;

    /**
     * @param message - сообщение об ошибке
     * @param field   - поле сущности
     */
    public NotFoundException(String message, String field) {
        super(message);
        this.field = field;
    }

    /**
     * @return поле сущности
     */
    public String getField() {
        return field;
    }

}
