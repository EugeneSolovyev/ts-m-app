package com.musicapp.service;

import com.musicapp.domain.PhoneVerificationType;
import com.musicapp.exception.PhoneVerificationException;

/**
 * Интерфейс сервиса для верификации номера телефона.
 *
 * @author evgeniycheban
 */
public interface PhoneVerificationService {

    /**
     * Отправляет код подтверждения на номер телефона.
     *
     * @param phone номер телефона
     * @param type  тип отправки кода
     * @throws PhoneVerificationException в случае ошибки при отправке кода на номер телефона
     */
    void sendCode(String phone, PhoneVerificationType type);

    /**
     * Верифицирует номер телефона.
     *
     * @param phone номер телефона
     * @param code  код подтверждения номера телефона
     * @return true если номер телефона был верифицирован
     */
    boolean verify(String phone, String code);

    /**
     * Проверяет, что номер телефона верифицирован.
     *
     * @param phone номер телефона
     * @return true если номер телефона верифицирован
     */
    boolean isVerified(String phone);

}
