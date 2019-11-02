package com.musicapp.validation.annotation;

import com.musicapp.validation.validator.ExistsValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Аннотация валидирующая существования сущности
 *
 * @author evgeniycheban
 */
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ExistsValidator.class)
public @interface Exists {

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
