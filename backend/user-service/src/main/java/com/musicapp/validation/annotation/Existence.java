package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.ExistenceValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Аннотация валидирующая существования сущности
 *
 * @author evgeniycheban
 */
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ExistenceValidator.class)
public @interface Existence {

    /**
     * @return класс сущности
     */
    Class<?> entity();

    /**
     * @return поле сущности
     */
    String field();

    /**
     * @return true если сущность должна существовать, по умолчанию false
     */
    boolean exists() default false;

    /**
     * @return валидационное сообщение
     */
    String message();

    /**
     * @return группы валидации
     */
    Class<?>[] groups() default {};

    /**
     * @return payload - не используется
     */
    Class<? extends Payload>[] payload() default {};

}
