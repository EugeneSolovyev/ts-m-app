package com.musicapp.projection;

import com.musicapp.domain.Role;

public interface AuthorizedUserProjection {
    Long getId();

    String getUsername();

    String getPassword();

    Role getRole();
}
