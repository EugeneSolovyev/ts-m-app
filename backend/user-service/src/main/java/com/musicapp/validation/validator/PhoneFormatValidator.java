package com.musicapp.validation.validator;

import com.musicapp.exception.PhoneParseException;
import com.musicapp.util.PhoneUtils;
import com.musicapp.validation.annotation.PhoneFormat;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка формата номера телефона
 *
 * @author evgeniycheban
 */
public class PhoneFormatValidator implements ConstraintValidator<PhoneFormat, String> {

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        try {
            return PhoneUtils.isValid(phone);
        } catch (PhoneParseException e) {
            return false;
        }
    }

}
