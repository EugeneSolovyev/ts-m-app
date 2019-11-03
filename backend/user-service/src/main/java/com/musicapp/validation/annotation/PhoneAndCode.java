package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.PhoneAndCodeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Проверка кода подтверждения номера телефона пользователя
 *
 * @author evgeniycheban
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PhoneAndCodeValidator.class)
public @interface PhoneAndCode {
    String message() default "{user.phoneCode.incorrect}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
