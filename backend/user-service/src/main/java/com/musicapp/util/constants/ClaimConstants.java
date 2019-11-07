package com.musicapp.util.constants;

import lombok.experimental.UtilityClass;

/**
 * Константы параметров jwt токена.
 *
 * @author evgeniycheban
 */
@UtilityClass
public class ClaimConstants {

    /**
     * Идентификатор пользователя.
     */
    public final String id = "id";

    /**
     * Имя пользователя.
     */
    public final String username = "username";

    /**
     * Роли пользователя.
     */
    public final String roles = "roles";

    /**
     * Верифицированный номер телефона пользователя.
     */
    public final String verifiedPhone = "verifiedPhone";

}
