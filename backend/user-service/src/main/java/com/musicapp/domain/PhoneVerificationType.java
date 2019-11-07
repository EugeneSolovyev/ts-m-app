package com.musicapp.domain;

/**
 * Перечисление типов отправки кода подтверждения на номер телефона.
 *
 * @author evgeniycheban
 */
public enum PhoneVerificationType {

    /**
     * СМС код подтверждения.
     */
    SMS,

    /**
     * Звонок с кодом подтверждения.
     */
    CALL
}
