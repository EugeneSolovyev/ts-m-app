package com.musicapp.service;

import com.musicapp.domain.PhoneVerificationType;
import com.musicapp.exception.PhoneVerificationException;

/**
 * Сервис верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
public interface PhoneVerificationService {

    /**
     * Отправление кода подтверждения номера телефона пользователя
     *
     * @param phone номер телефона пользователя
     * @param type  тип отправки кода подтверждения номера телефона пользователя
     * @throws PhoneVerificationException в случае ошибки при отправке кода на номер телефона пользователя
     */
    void sendCode(String phone, PhoneVerificationType type);

    /**
     * Верификация номера телефона пользователя
     *
     * @param phone номер телефона пользователя
     * @param code  код подтверждения номера телефона пользователя
     * @return true если номер телефона был верифицирован
     */
    boolean verify(String phone, String code);

    /**
     * Проверка на верифицированность номера телефона пользователя
     *
     * @param phone номер телефона пользователя
     * @return true если номер телефона был верифицирован
     */
    boolean isVerified(String phone);

}
