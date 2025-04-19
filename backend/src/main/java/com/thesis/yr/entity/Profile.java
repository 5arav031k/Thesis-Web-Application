package com.thesis.yr.entity;

import com.thesis.yr.model.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(exclude = "id")
public class Profile {
    @Id
    private Integer id;

    private String name;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "total_tests")
    private Integer totalTests;

    @Column(name = "failed_tests")
    private Integer failedTests;

    private Status status;

    private String duration;

    @Column(name = "has_retries")
    private boolean hasRetries;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;
}
