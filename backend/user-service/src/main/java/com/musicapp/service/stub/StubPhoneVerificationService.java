package com.musicapp.service.stub;

import com.musicapp.domain.PhoneVerificationType;
import com.musicapp.service.AbstractPhoneVerificationService;
import com.musicapp.service.TokenService;
import com.musicapp.util.constants.ProfileConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * Заглушка сервиса верификации номера телефона.
 *
 * @author evgeniycheban
 */
@Service
@Profile(ProfileConstants.local)
@Slf4j
public class StubPhoneVerificationService extends AbstractPhoneVerificationService {

    private static final String STUB_PHONE_CODE = "9999";

    public StubPhoneVerificationService(TokenService tokenService) {
        super(tokenService);
    }

    @Override
    public void sendCode(String phone, PhoneVerificationType type) {
        log.debug("sendCode stub");
    }

    @Override
    protected boolean isValid(String phone, String code) {
        log.debug("isValid stub");

        return STUB_PHONE_CODE.equals(code);
    }

}
