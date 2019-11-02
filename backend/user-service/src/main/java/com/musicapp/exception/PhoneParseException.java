package com.musicapp.exception;

/**
 * Исключение для ошибок парсинга номера телефона
 *
 * @author evgeniycheban
 */
public class PhoneParseException extends RuntimeException {

    /**
     * @param message - сообщение об ошибке
     * @param cause   - оборачиваемое исключение
     */
    public PhoneParseException(String message, Throwable cause) {
        super(message, cause);
    }
}
