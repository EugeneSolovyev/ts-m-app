package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.PhoneFormatValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Проверка формата номера телефона пользователя
 *
 * @author evgeniycheban
 */
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PhoneFormatValidator.class)
public @interface PhoneFormat {
    String message() default "{user.phone.format}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
