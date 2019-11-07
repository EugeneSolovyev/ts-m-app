package com.musicapp.dto;

import com.musicapp.validation.annotation.PhoneAndCode;
import com.musicapp.validation.annotation.PhoneFormat;
import com.musicapp.validation.group.PhoneAndCodeGroup;
import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * dto-представление номера телефона и кода подтверждения.
 *
 * @author evgeniycheban
 */
@PhoneAndCode(groups = PhoneAndCodeGroup.class)
@Data
public class PhoneCodeDto {

    @NotBlank(groups = PhoneNotBlankGroup.class)
    @PhoneFormat(groups = PhoneFormatGroup.class)
    private String phone;

    private String code;

}
