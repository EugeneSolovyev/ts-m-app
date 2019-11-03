package com.musicapp.service.impl;

import com.authy.AuthyApiClient;
import com.authy.api.Params;
import com.authy.api.Verification;
import com.google.i18n.phonenumbers.Phonenumber;
import com.musicapp.domain.PhoneVerificationType;
import com.musicapp.exception.PhoneVerificationException;
import com.musicapp.service.AbstractPhoneVerificationService;
import com.musicapp.service.TokenService;
import com.musicapp.util.PhoneUtils;
import com.musicapp.util.constants.ProfileConstants;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * Реализация сервиса верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
@Service
@Profile(ProfileConstants.PROD)
public class PhoneVerificationServiceImpl extends AbstractPhoneVerificationService {

    private final AuthyApiClient authyApiClient;

    public PhoneVerificationServiceImpl(TokenService tokenService, AuthyApiClient authyApiClient) {
        super(tokenService);
        this.authyApiClient = authyApiClient;
    }

    @Override
    public void sendCode(String phone, PhoneVerificationType type) {
        Phonenumber.PhoneNumber phoneNumber = PhoneUtils.parse(phone);

        Params params = new Params();
        Verification response = authyApiClient.getPhoneVerification().start(
                String.valueOf(phoneNumber.getNationalNumber()),
                String.valueOf(phoneNumber.getCountryCode()),
                type.name(),
                params
        );

        if (!response.isOk()) {
            throw new PhoneVerificationException(response.getMessage());
        }
    }

    @Override
    protected boolean isValid(String phone, String code) {
        Phonenumber.PhoneNumber phoneNumber = PhoneUtils.parse(phone);

        Verification response = authyApiClient.getPhoneVerification().check(
                String.valueOf(phoneNumber.getNationalNumber()),
                String.valueOf(phoneNumber.getCountryCode()),
                code
        );

        return response.isOk();
    }

}
