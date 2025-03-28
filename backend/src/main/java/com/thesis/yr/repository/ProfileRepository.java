package com.thesis.yr.repository;

import com.thesis.yr.entity.Profile;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProfileRepository extends CrudRepository<Profile, Integer> {
    List<Profile> findAllByBranchId(int branchId);
}
