package com.musicapp.security;

import com.musicapp.domain.Role;
import com.musicapp.projection.AuthorizedUserProjection;
import lombok.Getter;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;

/**
 * Авторизованный пользователь.
 *
 * @author evgeniycheban
 */
@Getter
public class AuthorizedUser extends User {

    private final Long id;

    public AuthorizedUser(Long id, String username, Collection<Role> roles) {
        this(id, username, "", roles);
    }

    AuthorizedUser(AuthorizedUserProjection projection) {
        this(projection.getId(), projection.getUsername(), projection.getPassword(),
                Collections.singleton(projection.getRole()));
    }

    private AuthorizedUser(Long id, String username, String password, Collection<Role> roles) {
        super(username, password, roles);
        this.id = id;
    }

}
