package com.musicapp.service;

/**
 * Сервис верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
public interface PhoneVerificationService {

    /**
     * Отправление кода подтверждения номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @param type  - тип отправки кода (sms, voice)
     */
    void sendCode(String phone, String type);

    /**
     * Верификация номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @param code  - код подтверждения номера телефона пользователя
     * @return true если номер телефона был верифицирован
     */
    boolean verify(String phone, String code);

    /**
     * Проверка на верифицированность номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @return true если номер телефона был верифицирован
     */
    boolean isVerified(String phone);

}
