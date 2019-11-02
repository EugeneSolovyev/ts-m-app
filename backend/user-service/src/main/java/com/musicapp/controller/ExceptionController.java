package com.musicapp.controller;

import com.musicapp.exception.NotFoundException;
import com.musicapp.util.ExceptionUtils;
import org.hibernate.validator.internal.engine.path.NodeImpl;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Контроллер-обработчик ошибок
 *
 * @author evgeniycheban
 */
@ControllerAdvice(annotations = RestController.class)
@ResponseBody
public class ExceptionController {

    private static final Map<String, String> CONSTRAINT_CODE_MAP = new HashMap<String, String>() {
        {
            put("email", "user.email.duplicate");
            put("phone", "user.phone.duplicate");
            put("username", "user.username.duplicate");
        }
    };

    private final MessageSource messageSource;

    /**
     * @param messageSource - хранилище сообщений
     */
    @Autowired
    public ExceptionController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Обработка ошибок валидации
     *
     * @param e - ошибка валидации
     * @return ошибки валидации в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationError(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> errors = bindingResult.getFieldErrors();

        return errors.stream().collect(Collectors.toMap(FieldError::getField, DefaultMessageSourceResolvable::getDefaultMessage));
    }

    /**
     * Обработка ошибок валидации
     *
     * @param e - ошибка валидации
     * @return ошибки валидации в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Map<String, String> handleValidationError(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();

        return constraintViolations.stream().collect(Collectors.toMap(this::getFieldName, ConstraintViolation::getMessage));
    }

    /**
     * Обработка конфликтов
     *
     * @param e - ошибка конфликта
     * @return ошибки конликтов в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseBody
    public Map<String, String> handleConflict(DataIntegrityViolationException e) {
        String rootMessage = ExceptionUtils.getRootCause(e).getMessage();

        return CONSTRAINT_CODE_MAP.entrySet().stream()
                .filter(entry -> rootMessage.contains(entry.getKey()))
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> getMessage(entry.getValue())));
    }

    /**
     * Обработка ошибок при отсутствии сущности в бд.
     *
     * @param e - ошибка при отсутствии сущности в бд.
     * @return ошибки при отсутствии сущности в бд, в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    public Map<String, String> handleNotFound(NotFoundException e) {
        return Collections.singletonMap(e.getField(), getMessage(e.getMessage()));
    }

    private String getMessage(String code) {
        return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
    }

    private String getFieldName(ConstraintViolation<?> violation) {
        PathImpl path = (PathImpl) violation.getPropertyPath();
        NodeImpl node = path.getLeafNode();

        return node.getName();
    }

}
