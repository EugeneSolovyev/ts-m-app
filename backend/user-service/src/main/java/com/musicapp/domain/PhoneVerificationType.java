package com.musicapp.domain;

/**
 * Перечисление типов отправки кода подтверждения номера телефона.
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
