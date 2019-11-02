package com.musicapp.service.stub;

import com.musicapp.security.context.TokenContextHolder;
import com.musicapp.service.TokenService;
import com.musicapp.util.constants.Profiles;
import com.musicapp.service.PhoneVerificationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import static com.musicapp.util.constants.TokenConstants.Claims.VERIFIED_PHONE;

@Service
@Profile(Profiles.LOCAL)
public class PhoneVerificationServiceStub implements PhoneVerificationService {
    private static final Logger LOG = LoggerFactory.getLogger(PhoneVerificationServiceStub.class);

    private static final String STUB_PHONE_CODE = "9999";

    private final TokenService tokenService;

    @Autowired
    public PhoneVerificationServiceStub(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sendCode(String phone, String type) {
        LOG.debug("sendCode stub");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean verify(String phone, String code) {
        LOG.debug("verify stub");

        boolean verified = STUB_PHONE_CODE.equals(code);
        if (verified) {
            Claims claims = Jwts.claims();
            claims.put(VERIFIED_PHONE, phone);
            String token = tokenService.generate(claims);
            TokenContextHolder.setToken(token);
        }

        return verified;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isVerified(String phone) {
        String token = TokenContextHolder.getToken();
        if (StringUtils.isBlank(token)) {
            return false;
        }

        Claims claims = tokenService.getClaims(token);
        String verifiedPhone = claims.get(VERIFIED_PHONE, String.class);

        return phone.equals(verifiedPhone);
    }

}
