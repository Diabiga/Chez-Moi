package com.diabiga.soro.Reposotery;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diabiga.soro.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
