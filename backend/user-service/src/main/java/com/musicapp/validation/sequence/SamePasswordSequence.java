package com.musicapp.validation.sequence;

import com.musicapp.validation.group.PasswordNotBlankGroup;
import com.musicapp.validation.group.PasswordSizeGroup;
import com.musicapp.validation.group.SamePasswordGroup;

import javax.validation.GroupSequence;

@GroupSequence({PasswordNotBlankGroup.class, PasswordSizeGroup.class, SamePasswordGroup.class})
public interface SamePasswordSequence {
}
