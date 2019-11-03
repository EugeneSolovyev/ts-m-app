package com.musicapp.security.context;

import lombok.experimental.UtilityClass;

/**
 * Thread local хранилище для jwt токена
 *
 * @author evgeniycheban
 */
@UtilityClass
public class TokenContextHolder {

    private final ThreadLocal<String> TOKEN_THREAD_LOCAL = new ThreadLocal<>();

    /**
     * Возвращает jwt токен из thread local переменной
     *
     * @return jwt токен
     */
    public String getToken() {
        return TOKEN_THREAD_LOCAL.get();
    }

    /**
     * Установка jwt токена в thread local переменную
     *
     * @param token jwt токен
     */
    public void setToken(String token) {
        TOKEN_THREAD_LOCAL.set(token);
    }

}
