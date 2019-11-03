package com.musicapp.exception;

/**
 * Генерируется в случае ошибок при верификации номера телефона.
 *
 * @author evgeniycheban
 */
public class PhoneVerificationException extends RuntimeException {

    public PhoneVerificationException(String message) {
        super(message);
    }

}
