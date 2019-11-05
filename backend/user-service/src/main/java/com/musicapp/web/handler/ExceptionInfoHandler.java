package com.musicapp.web.handler;

import com.musicapp.exception.NotFoundException;
import com.musicapp.util.ExceptionUtils;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.internal.engine.path.NodeImpl;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Обработчик ошибок.
 *
 * @author evgeniycheban
 */
@ControllerAdvice(annotations = RestController.class)
@ResponseBody
@RequiredArgsConstructor
public class ExceptionInfoHandler {

    private static final Map<String, String> CONSTRAINT_CODE_MAP = new HashMap<String, String>() {
        {
            put("email", "user.email.duplicate");
            put("phone", "user.phone.duplicate");
            put("username", "user.username.duplicate");
        }
    };

    private final MessageSource messageSource;

    /**
     * Обрабатывает ошибки валидации.
     *
     * @param e ошибка валидации
     * @return ошибки валидации в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationError(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> errors = bindingResult.getFieldErrors();

        return errors.stream()
                .collect(Collectors.toMap(FieldError::getField, DefaultMessageSourceResolvable::getDefaultMessage));
    }

    /**
     * Обрабатывает ошибки валидации.
     *
     * @param e ошибка валидации
     * @return ошибки валидации в формате название поля - сообщение об ошибке
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Map<String, String> handleValidationError(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();

        return constraintViolations.stream()
                .collect(Collectors.toMap(this::getFieldName, ConstraintViolation::getMessage));
    }

    /**
     * Обрабатывает ошибку конфликта.
     *
     * @param e ошибка конфликта
     * @return ошибка конликта в формате название поля - сообщение об ошибке
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
     * Обрабатывает ошибку при отсутствии сущности в бд.
     *
     * @param e ошибка при отсутствии сущности в бд.
     * @return ошибка при отсутствии сущности в бд, в формате название поля - сообщение об ошибке
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
