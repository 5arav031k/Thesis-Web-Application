package com.thesis.yr.dto;

import com.thesis.yr.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchDTO {
    private int id;
    private String name;
    private String startTime;
    private int totalTests;
    private int failedTests;
    private Status status;
    private String duration;
}
