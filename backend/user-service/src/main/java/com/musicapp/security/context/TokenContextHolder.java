package com.musicapp.security.context;

/**
 * Thread local хранилище для jwt токена
 *
 * @author evgeniycheban
 */
public final class TokenContextHolder {
    private static final ThreadLocal<String> TOKEN_THREAD_LOCAL = new ThreadLocal<>();

    private TokenContextHolder() {
        // holder
    }

    /**
     * Возвращает jwt токен из thread local переменной
     *
     * @return jwt токен
     */
    public static String getToken() {
        return TOKEN_THREAD_LOCAL.get();
    }

    /**
     * Установка jwt токена в thread local переменную
     *
     * @param token - jwt токен
     */
    public static void setToken(String token) {
        TOKEN_THREAD_LOCAL.set(token);
    }

}
