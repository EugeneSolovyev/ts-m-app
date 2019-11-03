package com.musicapp.service.impl;

import com.authy.AuthyApiClient;
import com.authy.api.Params;
import com.authy.api.Verification;
import com.google.i18n.phonenumbers.Phonenumber;
import com.musicapp.exception.PhoneVerificationException;
import com.musicapp.security.context.TokenContextHolder;
import com.musicapp.service.PhoneVerificationService;
import com.musicapp.service.TokenService;
import com.musicapp.util.PhoneUtils;
import com.musicapp.util.constants.ClaimConstants;
import com.musicapp.util.constants.ProfileConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * Реализация сервиса верификации номера телефона пользователя
 *
 * @author evgeniycheban
 */
@Service
@Profile(ProfileConstants.PROD)
@RequiredArgsConstructor
public class PhoneVerificationServiceImpl implements PhoneVerificationService {

    private final AuthyApiClient authyApiClient;
    private final TokenService tokenService;

    @Override
    public void sendCode(String phone, String type) {
        Phonenumber.PhoneNumber phoneNumber = PhoneUtils.parse(phone);

        Params params = new Params();
        Verification response = authyApiClient.getPhoneVerification().start(
                String.valueOf(phoneNumber.getNationalNumber()),
                String.valueOf(phoneNumber.getCountryCode()),
                type,
                params
        );

        if (!response.isOk()) {
            throw new PhoneVerificationException(response.getMessage());
        }
    }

    @Override
    public boolean verify(String phone, String code) {
        Phonenumber.PhoneNumber phoneNumber = PhoneUtils.parse(phone);

        Verification response = authyApiClient.getPhoneVerification().check(
                String.valueOf(phoneNumber.getNationalNumber()),
                String.valueOf(phoneNumber.getCountryCode()),
                code
        );

        boolean verified = response.isOk();

        if (verified) {
            Claims claims = Jwts.claims();
            claims.put(ClaimConstants.VERIFIED_PHONE, phone);
            String token = tokenService.generate(claims);
            TokenContextHolder.setToken(token);
        }

        return verified;
    }

    @Override
    public boolean isVerified(String phone) {
        String token = TokenContextHolder.getToken();
        if (StringUtils.isBlank(token)) {
            return false;
        }

        Claims claims = tokenService.getClaims(token);
        String verifiedPhone = claims.get(ClaimConstants.VERIFIED_PHONE, String.class);

        return phone.equals(verifiedPhone);
    }

}
