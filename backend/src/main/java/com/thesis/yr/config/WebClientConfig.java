package com.thesis.yr.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;

@Configuration
public class WebClientConfig {

    @Bean
    @Qualifier("jenkinsWebClient")
    public WebClient jenkinsWebClient() {
        Dotenv dotenv = Dotenv.configure()
                .directory("backend")
                .load();

        String username = dotenv.get("JENKINS_USERNAME");
        String apiToken = dotenv.get("JENKINS_TOKEN");

        String authValue = username + ":" + apiToken;
        String encodedAuth = "Basic " + Base64.getEncoder().encodeToString(authValue.getBytes());

        return WebClient.builder()
                .baseUrl("http://localhost:8888")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, encodedAuth)
                .build();
    }
}
