package com.musicapp.security;

import com.musicapp.domain.Role;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Objects;

/**
 * Авторизованный пользователь
 *
 * @author evgeniycheban
 */
public class AuthorizedUser extends User {
    private static final String NO_AUTHORIZED_USER_ERROR_MESSAGE = "No authorized user found";

    private final Long id;

    /**
     * @param id       - идентификатор пользователя
     * @param username - имя пользователя
     * @param roles    - роли пользователя
     */
    public AuthorizedUser(Long id, String username, Collection<Role> roles) {
        this(id, username, StringUtils.EMPTY, roles);
    }

    /**
     * @param id       - идентификатор пользователя
     * @param username - имя пользователя
     * @param password - пароль пользователя
     * @param roles    - роли пользователя
     */
    public AuthorizedUser(Long id, String username, String password, Collection<Role> roles) {
        super(username, password, roles);
        this.id = id;
    }

    /**
     * @return идентификатор пользователя
     */
    public Long getId() {
        return id;
    }

    /**
     * @return идентификатор авторизованного пользователя
     */
    public static Long id() {
        return get().id;
    }

    /**
     * @return авторизованный пользователь
     */
    public static AuthorizedUser get() {
        AuthorizedUser user = safeGet();
        Objects.requireNonNull(user, NO_AUTHORIZED_USER_ERROR_MESSAGE);

        return user;
    }

    private static AuthorizedUser safeGet() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }

        Object user = auth.getPrincipal();

        return user instanceof AuthorizedUser ? (AuthorizedUser) user : null;
    }

}
