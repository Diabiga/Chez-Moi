package com.diabiga.soro.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	private static final Logger log = LoggerFactory.getLogger(MailService.class);

	private final JavaMailSender mailSender;

	public MailService(@Nullable JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void send(String to, String subject, String text) {
		if (to == null || to.isBlank()) {
			log.warn("Attempted to send email with empty recipient: subject={} ", subject);
			return;
		}
		if (mailSender == null) {
			log.info("[MAIL-DEV] To: {} | Subject: {} | Body: {}", to, subject, text);
			return;
		}
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		try {
			mailSender.send(message);
		} catch (Exception e) {
			log.error("Failed to send email to {}: {}", to, e.getMessage());
		}
	}
}

