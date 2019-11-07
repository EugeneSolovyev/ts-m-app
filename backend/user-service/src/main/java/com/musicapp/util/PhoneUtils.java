package com.musicapp.util;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;
import com.musicapp.exception.PhoneParseException;
import lombok.experimental.UtilityClass;

/**
 * Вспомогательный класс для работы с телефонами.
 *
 * @author evgeniycheban
 */
@UtilityClass
public class PhoneUtils {

    /**
     * Парсинг номера телефона.
     *
     * @param phone номер телефона
     * @return объект PhoneNumber
     * @throws PhoneParseException в случае ошибки парсинга номера телефона
     */
    public Phonenumber.PhoneNumber parse(String phone) {
        return parse(phone, null);
    }

    /**
     * Парсинг номера телефона.
     *
     * @param phone         номер телефона
     * @param defaultRegion регион по умолчанию
     * @return объект PhoneNumber
     * @throws PhoneParseException в случае ошибки парсинга номера телефона
     */
    public Phonenumber.PhoneNumber parse(String phone, String defaultRegion) {
        try {
            return PhoneNumberUtil.getInstance().parse(phone, defaultRegion);
        } catch (NumberParseException e) {
            throw new PhoneParseException(e.getMessage(), e);
        }
    }

    /**
     * Проверка на валидность номера телефона.
     *
     * @param phone номер телефона
     * @return true если номер телефона валиден
     * @throws PhoneParseException в случае ошибки парсинга номера телефона
     */
    public boolean isValid(String phone) {
        Phonenumber.PhoneNumber phoneNumber = parse(phone);

        return PhoneNumberUtil.getInstance().isValidNumber(phoneNumber);
    }

}
