package com.musicapp.validation.validator;

import com.musicapp.dto.UserDto;
import com.musicapp.validation.annotation.SamePassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на совпадение пароля
 *
 * @author evgeniycheban
 */
public class SamePasswordValidator implements ConstraintValidator<SamePassword, UserDto> {
    private String message;

    /**
     * {@inheritDoc}
     */
    @Override
    public void initialize(SamePassword constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
        boolean valid = userDto.getPassword().equals(userDto.getRepeatPassword());
        if (!valid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(this.message)
                    .addPropertyNode("repeatPassword")
                    .addConstraintViolation();
        }

        return valid;
    }

}
