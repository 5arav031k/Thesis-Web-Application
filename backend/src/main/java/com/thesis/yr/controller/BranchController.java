package com.thesis.yr.controller;

import com.thesis.yr.dto.BranchDTO;
import com.thesis.yr.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/branches")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @GetMapping
    public List<BranchDTO> getAllBranches(@RequestParam Optional<Integer> timeScope) {
        return branchService.getAllBranches();
    }
}
