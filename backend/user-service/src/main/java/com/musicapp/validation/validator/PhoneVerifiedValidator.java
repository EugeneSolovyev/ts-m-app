package com.musicapp.validation.validator;

import com.musicapp.service.PhoneVerificationService;
import com.musicapp.validation.annotation.PhoneVerified;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на верифицированность номера телефона пользователя
 *
 * @author evgeniycheban
 */
public class PhoneVerifiedValidator implements ConstraintValidator<PhoneVerified, String> {

    private final PhoneVerificationService service;

    /**
     * @param service - сервис верификации номера телефона пользователя
     */
    public PhoneVerifiedValidator(PhoneVerificationService service) {
        this.service = service;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void initialize(PhoneVerified constraintAnnotation) {

    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        return service.isVerified(phone);
    }

}
