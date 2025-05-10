package com.thesis.yr.service;

import com.thesis.yr.dto.ProfileDTO;
import com.thesis.yr.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ModelMapper modelMapper;

    public List<ProfileDTO> getAllProfilesByBranchId(int branchId) {
        return profileRepository.findAllByBranchId(branchId).stream()
                .map(profile -> modelMapper.map(profile, ProfileDTO.class))
                .sorted(Comparator.comparing(ProfileDTO::getStartTime).reversed())
                .toList();
    }
}
