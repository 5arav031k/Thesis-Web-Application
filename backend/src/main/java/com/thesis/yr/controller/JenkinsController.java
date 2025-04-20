package com.thesis.yr.controller;

import com.thesis.yr.service.JenkinsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jenkins")
@RequiredArgsConstructor
public class JenkinsController {

    private final JenkinsService jenkinsService;

    @PostMapping("/job/{itemName}/build")
    public String buildJob(@PathVariable String itemName) {
        return jenkinsService.buildJob(itemName);
    }
}
