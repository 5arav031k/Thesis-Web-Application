package com.thesis.yr.service;

import com.thesis.yr.exception.JenkinsServiceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class JenkinsService {

    private final WebClient jenkinsWebClient;

    public JenkinsService(@Qualifier("jenkinsWebClient") WebClient jenkinsWebClient) {
        this.jenkinsWebClient = jenkinsWebClient;
    }

    public String buildJob(String jobName) {
        return jenkinsWebClient.post()
                .uri("/job/{jobName}/build?delay=0sec", jobName)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(e -> {
                    throw new JenkinsServiceException("Failed to build job: ", e.getCause());
                })
                .block();
    }
}
