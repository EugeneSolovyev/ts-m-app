package com.musicapp.validation.sequence;

import com.musicapp.validation.group.PhoneFormatGroup;
import com.musicapp.validation.group.PhoneNotBlankGroup;

import javax.validation.GroupSequence;

@GroupSequence({PhoneNotBlankGroup.class, PhoneFormatGroup.class})
public interface PhoneFormatSequence {
}
