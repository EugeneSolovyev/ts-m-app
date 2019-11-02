package com.musicapp.validation.sequence;

import com.musicapp.validation.group.PhoneUniqueGroup;

import javax.validation.GroupSequence;

@GroupSequence({PhoneFormatSequence.class, PhoneUniqueGroup.class})
public interface PhoneSequence {
}
