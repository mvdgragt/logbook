package se.logbook.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.logbook.backend.model.AuthRequest;
import se.logbook.backend.model.AuthResponse;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    void register_ShouldReturnToken() {
        AuthRequest request = new AuthRequest();
        request.setUsername("testuser_" + System.currentTimeMillis());
        request.setEmail("test_" + System.currentTimeMillis() + "@test.se");
        request.setPassword("password123");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertFalse(response.getToken().isEmpty());
    }

    @Test
    void login_WithWrongPassword_ShouldThrowException() {
        AuthRequest registerRequest = new AuthRequest();
        registerRequest.setUsername("logintest_" + System.currentTimeMillis());
        registerRequest.setEmail("logintest_" + System.currentTimeMillis() + "@test.se");
        registerRequest.setPassword("correctpassword");
        authService.register(registerRequest);

        AuthRequest loginRequest = new AuthRequest();
        loginRequest.setUsername(registerRequest.getUsername());
        loginRequest.setPassword("wrongpassword");

        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
    }
}