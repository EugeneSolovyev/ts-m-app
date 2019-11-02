package com.musicapp.validation.sequence;

import com.musicapp.validation.group.PhoneAndCodeGroup;

import javax.validation.GroupSequence;

@GroupSequence({PhoneFormatSequence.class, PhoneAndCodeGroup.class})
public interface PhoneCodeSequence {
}
