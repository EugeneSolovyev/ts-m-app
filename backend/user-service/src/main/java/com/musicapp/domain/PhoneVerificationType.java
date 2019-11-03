package com.musicapp.domain;

/**
 * Тип отправки кода подтверждения номера телефона пользователя
 *
 * @author evgeniycheban
 */
public enum PhoneVerificationType {

    /**
     * смс код подтверждения
     */
    SMS,

    /**
     * звонок с кодом подтверждения
     */
    CALL
}
