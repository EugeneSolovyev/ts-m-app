package com.musicapp.web.controller;

import com.musicapp.dto.AuthenticationRequestDto;
import com.musicapp.dto.TokenDto;
import com.musicapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Методы для аутентификации.
 *
 * @author evgeniycheban
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * Метод аутентификации.
     *
     * @param request dto запрос аутентификации
     * @return ответ с jwt токеном
     */
    @PostMapping
    public TokenDto authenticate(@Valid @RequestBody AuthenticationRequestDto request) {
        String token = service.authenticate(request.getUsername(), request.getPassword());

        return new TokenDto(token);
    }

}
