package com.musicapp.util.constants;

/**
 * Константы для работы с jwt
 *
 * @author evgeniycheban
 */
public final class TokenConstants {

    /**
     * Префикс токена в заголовке Authorization
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * Атрибуты токена
     */
    public static class Claims {

        /**
         * Идентификатор пользователя
         */
        public static final String ID = "id";

        /**
         * Имя пользователя
         */
        public static final String USERNAME = "username";

        /**
         * Роли пользователя
         */
        public static final String ROLES = "roles";

        /**
         * Верифицированный номер телефона пользователя
         */
        public static final String VERIFIED_PHONE = "verifiedPhone";
    }

    private TokenConstants() {
        // constants
    }

}
