package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.PhoneVerifiedValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Проверка на верифицированность номера телефона пользователя
 *
 * @author evgeniycheban
 */
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PhoneVerifiedValidator.class)
public @interface PhoneVerified {
    String message() default "{user.phone.unverified}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
