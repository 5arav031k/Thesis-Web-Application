package com.thesis.yr.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.thesis.yr.dto.ProfileDTO;
import com.thesis.yr.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Slf4j
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

    public List<String> getAllProfileNames() {
        try (InputStreamReader reader = new InputStreamReader(
                Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("profiles.json")))) {

            Type listType = new TypeToken<List<String>>() {
            }.getType();

            return new Gson().fromJson(reader, listType);
        } catch (IOException e) {
            log.error("Error reading profiles.json", e);
            return List.of();
        }
    }
}
