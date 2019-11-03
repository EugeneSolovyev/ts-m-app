package com.musicapp.service.stub;

import com.musicapp.service.PhoneVerificationService;
import com.musicapp.util.constants.ProfileConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile(ProfileConstants.LOCAL)
@RequiredArgsConstructor
@Slf4j
public class PhoneVerificationServiceStub implements PhoneVerificationService {

    private static final String STUB_PHONE_CODE = "9999";

    @Override
    public void sendCode(String phone, String type) {
        log.debug("sendCode stub");
    }

    @Override
    public boolean verify(String phone, String code) {
        log.debug("verify stub");

        return STUB_PHONE_CODE.equals(code);
    }

    @Override
    public boolean isVerified(String phone) {
        return true;
    }

}
