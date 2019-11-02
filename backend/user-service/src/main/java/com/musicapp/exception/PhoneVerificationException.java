package com.musicapp.exception;

/**
 * Исключение для ошибок верификации номера телефона
 *
 * @author evgeniycheban
 */
public class PhoneVerificationException extends RuntimeException {

    /**
     * @param message - сообщение об ошибке
     */
    public PhoneVerificationException(String message) {
        super(message);
    }
}
