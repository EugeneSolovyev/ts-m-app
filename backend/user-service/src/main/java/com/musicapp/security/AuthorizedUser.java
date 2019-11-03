package com.musicapp.security;

import com.musicapp.domain.Role;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * Авторизованный пользователь
 *
 * @author evgeniycheban
 */
@Getter
public class AuthorizedUser extends User {
    private static final String NO_AUTHORIZED_USER_ERROR_MESSAGE = "No authorized user found";

    private final Long id;

    /**
     * @param id       идентификатор пользователя
     * @param username имя пользователя
     * @param roles    роли пользователя
     */
    public AuthorizedUser(Long id, String username, Collection<Role> roles) {
        this(id, username, StringUtils.EMPTY, roles);
    }

    /**
     * @param id       идентификатор пользователя
     * @param username имя пользователя
     * @param password пароль пользователя
     * @param roles    роли пользователя
     */
    public AuthorizedUser(Long id, String username, String password, Collection<Role> roles) {
        super(username, password, roles);
        this.id = id;
    }

}
