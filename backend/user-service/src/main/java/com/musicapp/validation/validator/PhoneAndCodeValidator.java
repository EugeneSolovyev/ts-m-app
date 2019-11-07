package com.musicapp.validation.validator;

import com.musicapp.dto.PhoneCodeDto;
import com.musicapp.service.PhoneVerificationService;
import com.musicapp.validation.annotation.PhoneAndCode;
import lombok.RequiredArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Валидатор для проверки номера телефона и кода подтверждения.
 *
 * @author evgeniycheban
 */
@RequiredArgsConstructor
public class PhoneAndCodeValidator implements ConstraintValidator<PhoneAndCode, PhoneCodeDto> {

    private String message;

    private final PhoneVerificationService service;

    @Override
    public void initialize(PhoneAndCode constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

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
