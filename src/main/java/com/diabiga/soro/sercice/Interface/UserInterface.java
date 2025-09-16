package com.diabiga.soro.sercice.Interface;

import java.util.List;
import java.util.Optional;

import com.diabiga.soro.model.User;

public interface UserInterface {

	User create(User user);

	Optional<User> getById(Long id);

	List<User> getAll();

	User update(Long id, User user);

	void delete(Long id);

}
