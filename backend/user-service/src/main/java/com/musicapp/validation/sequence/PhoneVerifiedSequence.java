package com.musicapp.validation.sequence;

import com.musicapp.validation.group.PhoneVerifiedGroup;

import javax.validation.GroupSequence;

@GroupSequence({PhoneFormatSequence.class, PhoneVerifiedGroup.class})
public interface PhoneVerifiedSequence {
}
