package com.musicapp.validation.validator;

import com.musicapp.service.PhoneVerificationService;
import com.musicapp.validation.annotation.PhoneVerified;
import lombok.RequiredArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на верифицированность номера телефона пользователя
 *
 * @author evgeniycheban
 */
@RequiredArgsConstructor
public class PhoneVerifiedValidator implements ConstraintValidator<PhoneVerified, String> {

    private final PhoneVerificationService service;

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        return service.isVerified(phone);
    }

}
