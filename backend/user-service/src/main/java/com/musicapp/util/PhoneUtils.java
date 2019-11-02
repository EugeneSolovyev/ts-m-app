package com.musicapp.util;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;
import com.musicapp.exception.PhoneParseException;

/**
 * Вспомогательный класс для работы с телефонами
 *
 * @author evgeniycheban
 */
public final class PhoneUtils {
    private static final PhoneNumberUtil PHONE_NUMBER_UTIL = PhoneNumberUtil.getInstance();

    private PhoneUtils() {
        // utils
    }

    /**
     * Парсинг номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @return объект PhoneNumber
     */
    public static Phonenumber.PhoneNumber parse(String phone) {
        return parse(phone, null);
    }

    /**
     * Парсинг номера телефона пользователя
     *
     * @param phone         - номер телефона пользователя
     * @param defaultRegion - регион по умолчанию
     * @return объект PhoneNumber
     */
    public static Phonenumber.PhoneNumber parse(String phone, String defaultRegion) {
        try {
            return PHONE_NUMBER_UTIL.parse(phone, defaultRegion);
        } catch (NumberParseException e) {
            throw new PhoneParseException(e.getMessage(), e);
        }
    }

    /**
     * Проверка на валидность номера телефона пользователя
     *
     * @param phone - номер телефона пользователя
     * @return true если номер телефона пользователя валиден
     */
    public static boolean isValid(String phone) {
        Phonenumber.PhoneNumber phoneNumber = parse(phone);

        return PHONE_NUMBER_UTIL.isValidNumber(phoneNumber);
    }

}
