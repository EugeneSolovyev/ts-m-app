package com.musicapp.util;

import lombok.experimental.UtilityClass;

/**
 * Вспомогательные методы для работы с исключениями.
 *
 * @author evgeniycheban
 */
@UtilityClass
public class ExceptionUtils {

    /**
     * Получение корневого исключения.
     *
     * @param throwable исключение.
     * @return корневое исключение
     */
    public Throwable getRootCause(Throwable throwable) {
        Throwable result = throwable;
        Throwable cause;

        while (null != (cause = result.getCause()) && (result != cause)) {
            result = cause;
        }

        return result;
    }

}
