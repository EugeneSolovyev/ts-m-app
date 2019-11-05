package com.musicapp.web.controller;

import com.musicapp.domain.PhoneVerificationType;
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
 * Методы для верификации номера телефона.
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
     * Метод для отправки кода подтверждения на номер телефона.
     *
     * @param phoneDto dto номера телефона пользователя
     * @param type     тип отправки кода подтверждения
     */
    @PostMapping(value = "/{type}/send-code", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void sendCode(@Validated(PhoneSequence.class) @RequestBody PhoneDto phoneDto,
                         @PathVariable PhoneVerificationType type) {
        service.sendCode(phoneDto.getPhone(), type);
    }

    /**
     * Метод для проверки номера телефона и кода подтверждения.
     *
     * @param phoneCodeDto dto номера телефона и кода подтверждения
     * @return ответ с jwt токеном
     */
    @PostMapping(value = "/check-phone-code")
    public TokenDto checkPhoneCode(@Validated(PhoneCodeSequence.class) @RequestBody PhoneCodeDto phoneCodeDto) {
        log.debug("Verified phone: {}", phoneCodeDto.getPhone());

        String token = TokenContextHolder.getToken();

        return new TokenDto(token);
    }

}
