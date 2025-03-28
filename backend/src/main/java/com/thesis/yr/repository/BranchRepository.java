package com.thesis.yr.repository;

import com.thesis.yr.entity.Branch;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BranchRepository extends CrudRepository<Branch, Integer> {
    List<Branch> findAll();
}
