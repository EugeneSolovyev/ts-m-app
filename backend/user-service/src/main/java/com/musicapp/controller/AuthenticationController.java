package com.musicapp.controller;

import com.musicapp.dto.AuthenticationRequestDto;
import com.musicapp.dto.AuthenticationResponseDto;
import com.musicapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * @param request DTO запроса авторизации
     * @return ответ с jwt токеном авторизации
     */
    @PostMapping
    public AuthenticationResponseDto authenticate(@Valid @RequestBody AuthenticationRequestDto request) {
        String token = service.authenticate(request.getUsername(), request.getPassword());

        return new AuthenticationResponseDto(token);
    }

}
