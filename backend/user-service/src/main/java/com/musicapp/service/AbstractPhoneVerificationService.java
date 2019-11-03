package com.musicapp.service;

import com.musicapp.security.context.TokenContextHolder;
import com.musicapp.util.constants.ClaimConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@RequiredArgsConstructor
public abstract class AbstractPhoneVerificationService implements PhoneVerificationService {

    private final TokenService tokenService;

    @Override
    public boolean verify(String phone, String code) {
        boolean valid = isValid(phone, code);

        if (valid) {
            Claims claims = Jwts.claims();
            claims.put(ClaimConstants.VERIFIED_PHONE, phone);

            String token = tokenService.generate(claims);
            TokenContextHolder.setToken(token);
        }

        return valid;
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

    protected abstract boolean isValid(String phone, String code);

}
