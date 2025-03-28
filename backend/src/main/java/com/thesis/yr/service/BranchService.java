package com.thesis.yr.service;

import com.thesis.yr.dto.BranchDTO;
import com.thesis.yr.repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;
    private final ModelMapper modelMapper;

    public List<BranchDTO> getAllBranches() {
        return branchRepository.findAll().stream()
                .map(branch -> modelMapper.map(branch, BranchDTO.class))
                .sorted(Comparator.comparing(BranchDTO::getStartTime).reversed())
                .toList();
    }

}
