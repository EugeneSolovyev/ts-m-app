package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.SamePasswordValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Проверка на совпадение пароля
 *
 * @author evgeniycheban
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = SamePasswordValidator.class)
public @interface SamePassword {
    String message() default "{user.repeatPassword.ne}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
