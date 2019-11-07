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
 * Аннотация для проверки существования сущности.
 *
 * @author evgeniycheban
 */
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ExistenceValidator.class)
public @interface Existence {

    /**
     * Возвращает класс сущности.
     *
     * @return класс сущности
     */
    Class<?> entity();

    /**
     * Возвращает поле сущности.
     *
     * @return поле сущности
     */
    String field();

    /**
     * Возвращает признак, что сущность должна существовать, по умолчанию false.
     *
     * @return true если сущность должна существовать, по умолчанию false
     */
    boolean exists() default false;

    /**
     * Возвращает валидационное сообщение.
     *
     * @return валидационное сообщение
     */
    String message();

    /**
     * Возвращает группы валидации.
     *
     * @return группы валидации
     */
    Class<?>[] groups() default {};

    /**
     * Возвращает payload.
     *
     * @return payload
     */
    Class<? extends Payload>[] payload() default {};

}
