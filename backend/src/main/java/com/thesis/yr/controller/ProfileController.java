package com.thesis.yr.controller;

import com.thesis.yr.dto.ProfileDTO;
import com.thesis.yr.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/names")
    public List<String> getAllProfileNames() {
        return profileService.getAllProfileNames();
    }

    @GetMapping("/branch")
    public List<ProfileDTO> getProfilesByBranchId(@RequestParam(value = "id") int branchId) {
        return profileService.getAllProfilesByBranchId(branchId);
    }
}
