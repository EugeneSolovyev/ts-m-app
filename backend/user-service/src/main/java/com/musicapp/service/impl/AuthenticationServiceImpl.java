package com.musicapp.service.impl;

import com.musicapp.security.AuthorizedUser;
import com.musicapp.service.AuthenticationService;
import com.musicapp.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * Реализация сервиса аутентификации
 *
 * @author evgeniycheban
 */
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    /**
     * @param authenticationManager - менеджер аутентификации
     * @param tokenService          - сервис для работы с jwt
     */
    @Autowired
    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,
                                     TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String authenticate(String username, String password) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
        authentication = authenticationManager.authenticate(authentication);
        AuthorizedUser authorizedUser = (AuthorizedUser) authentication.getPrincipal();

        return tokenService.generate(authorizedUser);
    }

}
