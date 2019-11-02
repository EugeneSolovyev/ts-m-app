package com.musicapp.util;

import java.util.function.Supplier;

/**
 * Вспомогательные методы для работы с исключениями/условиями
 *
 * @author evgeniycheban
 */
public final class ExceptionUtils {
    private ExceptionUtils() {
        // utils
    }

    /**
     * Проверяет, что переданное условие == true, иначе бросает переданное исключение
     *
     * @param <X>               - тип исключения
     * @param condition         - условие
     * @param exceptionSupplier - поставщик исключения
     * @throws X - если условие != true
     */
    public static <X extends Throwable> void checkOrElseThrow(boolean condition, Supplier<? extends X> exceptionSupplier) throws X {
        if (!condition) {
            throw exceptionSupplier.get();
        }
    }

    /**
     * Получение корневой ошибки
     *
     * @param throwable - ошибка
     * @return корневая ошибка
     */
    public static Throwable getRootCause(Throwable throwable) {
        Throwable result = throwable;
        Throwable cause;

        while (null != (cause = result.getCause()) && (result != cause)) {
            result = cause;
        }

        return result;
    }

}
