package com.musicapp.projection;

import com.musicapp.domain.Role;

/**
 * Проекция пользователя с полями для авторизации.
 *
 * @author evgeniycheban
 */
public interface AuthorizedUserProjection {

    Long getId();

    String getUsername();

    String getPassword();

    Role getRole();

}
