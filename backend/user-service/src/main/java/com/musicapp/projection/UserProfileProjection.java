package com.musicapp.projection;

/**
 * Проекция пользователя с полями для профиля.
 *
 * @author evgeniycheban
 */
public interface UserProfileProjection {

    Long getId();

    String getFirstName();

    String getLastName();

    String getEmail();

    String getPhone();

    String getUsername();

}
