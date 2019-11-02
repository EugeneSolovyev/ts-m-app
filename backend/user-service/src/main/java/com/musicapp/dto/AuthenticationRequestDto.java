package com.musicapp.dto;

import javax.validation.constraints.NotBlank;

public class AuthenticationRequestDto {
    private String username;
    private String password;

    @NotBlank(message = "{user.username.empty}")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotBlank(message = "{user.password.empty}")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthenticationRequest{" +
                "username='" + username + '\'' +
                '}';
    }

}
