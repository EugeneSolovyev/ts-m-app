package com.musicapp.domain;

import org.springframework.security.core.GrantedAuthority;

/**
 * Перечисления ролей пользователя
 *
 * @author evgeniycheban
 */
public enum Role implements GrantedAuthority {

    /**
     * Администратор
     */
    ROLE_ADMIN,

    /**
     * Пользователь
     */
    ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
