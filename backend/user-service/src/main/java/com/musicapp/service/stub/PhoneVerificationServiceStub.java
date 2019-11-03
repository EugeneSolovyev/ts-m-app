package com.musicapp.service.stub;

import com.musicapp.service.AbstractPhoneVerificationService;
import com.musicapp.service.TokenService;
import com.musicapp.util.constants.ProfileConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile(ProfileConstants.LOCAL)
@Slf4j
public class PhoneVerificationServiceStub extends AbstractPhoneVerificationService {

    private static final String STUB_PHONE_CODE = "9999";

    public PhoneVerificationServiceStub(TokenService tokenService) {
        super(tokenService);
    }

    @Override
    public void sendCode(String phone, String type) {
        log.debug("sendCode stub");
    }

    @Override
    protected boolean isValid(String phone, String code) {
        log.debug("isValid stub");

        return STUB_PHONE_CODE.equals(code);
    }

}
