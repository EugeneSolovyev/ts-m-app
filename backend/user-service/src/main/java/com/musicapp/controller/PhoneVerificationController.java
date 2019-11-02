package com.musicapp.controller;

import com.musicapp.service.PhoneVerificationService;
import com.musicapp.dto.PhoneCodeDto;
import com.musicapp.dto.PhoneDto;
import com.musicapp.dto.TokenDto;
import com.musicapp.security.context.TokenContextHolder;
import com.musicapp.validation.sequence.PhoneCodeSequence;
import com.musicapp.validation.sequence.PhoneSequence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * REST API для верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
@RestController
@RequestMapping("/verification/phone")
public class PhoneVerificationController {
    private static final Logger LOG = LoggerFactory.getLogger(PhoneVerificationController.class);

    private final PhoneVerificationService service;

    /**
     * @param service - сервис верификации
     */
    @Autowired
    public PhoneVerificationController(PhoneVerificationService service) {
        this.service = service;
    }

    /**
     * Отправка кода подтверждения номера телефона пользователя
     *
     * @param phoneDto - DTO сущности пользователя
     * @param type     - тип отправки (sms, voice)
     */
    @PostMapping(value = "/{type}/send-code", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void sendCode(@Validated(PhoneSequence.class) @RequestBody PhoneDto phoneDto, @PathVariable String type) {
        service.sendCode(phoneDto.getPhone(), type);
    }

    /**
     * Проверка кода подтверждения номера телефона пользователя
     *
     * @param phoneCodeDto - DTO (номер + код)
     * @return ответ с jwt токеном
     */
    @PostMapping(value = "/check-phone-code")
    public TokenDto checkPhoneCode(@Validated(PhoneCodeSequence.class) @RequestBody PhoneCodeDto phoneCodeDto) {
        LOG.debug("Verified phone: {}", phoneCodeDto.getPhone());

        String token = TokenContextHolder.getToken();

        return new TokenDto(token);
    }

}
