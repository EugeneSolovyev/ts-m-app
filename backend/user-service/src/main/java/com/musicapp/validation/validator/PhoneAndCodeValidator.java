package com.musicapp.validation.validator;

import com.musicapp.service.PhoneVerificationService;
import com.musicapp.validation.annotation.PhoneAndCode;
import com.musicapp.dto.PhoneCodeDto;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка кода подтверждения номера телефона пользователя
 *
 * @author evgeniycheban
 */
public class PhoneAndCodeValidator implements ConstraintValidator<PhoneAndCode, PhoneCodeDto> {
    private String message;

    private final PhoneVerificationService service;

    /**
     * @param service - сервис верификации
     */
    @Autowired
    public PhoneAndCodeValidator(PhoneVerificationService service) {
        this.service = service;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void initialize(PhoneAndCode constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isValid(PhoneCodeDto phoneCodeDto, ConstraintValidatorContext context) {
        boolean verified = service.verify(phoneCodeDto.getPhone(), phoneCodeDto.getCode());
        if (!verified) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message)
                    .addPropertyNode("code")
                    .addConstraintViolation();
        }

        return verified;
    }

}
