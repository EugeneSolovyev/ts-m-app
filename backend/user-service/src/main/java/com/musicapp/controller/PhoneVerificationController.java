package com.musicapp.controller;

import com.musicapp.dto.PhoneCodeDto;
import com.musicapp.dto.PhoneDto;
import com.musicapp.dto.TokenDto;
import com.musicapp.security.context.TokenContextHolder;
import com.musicapp.service.PhoneVerificationService;
import com.musicapp.validation.sequence.PhoneCodeSequence;
import com.musicapp.validation.sequence.PhoneSequence;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST API для верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
@RestController
@RequestMapping("/verification/phone")
@RequiredArgsConstructor
@Slf4j
public class PhoneVerificationController {

    private final PhoneVerificationService service;

    /**
     * Отправка кода подтверждения номера телефона пользователя
     *
     * @param phoneDto DTO номера телефона пользователя
     * @param type     тип отправки (sms, voice)
     */
    @PostMapping(value = "/{type}/send-code", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void sendCode(@Validated(PhoneSequence.class) @RequestBody PhoneDto phoneDto, @PathVariable String type) {
        service.sendCode(phoneDto.getPhone(), type);
    }

    /**
     * Проверка кода подтверждения номера телефона пользователя
     *
     * @param phoneCodeDto DTO номера телефона пользователя с кодом подтверждения
     * @return ответ с jwt токеном
     */
    @PostMapping(value = "/check-phone-code")
    public TokenDto checkPhoneCode(@Validated(PhoneCodeSequence.class) @RequestBody PhoneCodeDto phoneCodeDto) {
        log.debug("Verified phone: {}", phoneCodeDto.getPhone());

        String token = TokenContextHolder.getToken();

        return new TokenDto(token);
    }

}
