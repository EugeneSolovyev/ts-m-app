package com.musicapp.exception;

/**
 * Генерируется в случае ошибки парсинга номера телефона.
 *
 * @author evgeniycheban
 */
public class PhoneParseException extends RuntimeException {

    public PhoneParseException(String message, Throwable cause) {
        super(message, cause);
    }

}
