package com.musicapp.controller;

import com.musicapp.service.AuthenticationService;
import com.musicapp.dto.AuthenticationRequestDto;
import com.musicapp.dto.AuthenticationResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * REST API для авторизации
 *
 * @author evgeniycheban
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService service;

    /**
     * @param service - сервис авторизации
     */
    @Autowired
    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    /**
     * @param request - DTO сущности пользователя (username + password)
     * @return ответ с jwt токеном авторизации
     */
    @PostMapping
    public AuthenticationResponseDto authenticate(@Valid @RequestBody AuthenticationRequestDto request) {
        String token = service.authenticate(request.getUsername(), request.getPassword());

        return new AuthenticationResponseDto(token);
    }

}
