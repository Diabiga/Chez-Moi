package com.diabiga.soro.service.implementation;

import com.diabiga.soro.sercice.Interface.UserInterface;
import com.diabiga.soro.model.User;
import com.diabiga.soro.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserImplementationService implements UserInterface {

	private final UserRepository userRepository;

	public UserImplementationService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public User create(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> getById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User update(Long id, User user) {
		User existing = userRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
		existing.setName(user.getName());
		return userRepository.save(existing);
	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

}
